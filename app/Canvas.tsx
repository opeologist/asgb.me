"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas as ThreeCanvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef } from "react";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  LineBasicMaterial,
  MathUtils,
  MeshBasicMaterial,
  SRGBColorSpace,
  type Material,
} from "three";
import styles from "./canvas.module.css";

const CAMERA_FOV = 50;
const CAMERA_HEIGHT = 18;
const CAMERA_PITCH = MathUtils.degToRad(30);
const CAMERA_YAW = MathUtils.degToRad(8);
const CAMERA_Z = 3; // just behind the front trace, so new traces enter from below the frame
const SAMPLES_PER_UNIT = 6;
const DRIFT = 0.6; // sideways step per trace, relative to its step back, so the stack marches diagonally
const FADE_ROWS = 24; // oldest traces fade fully into the background before they're dropped

type WaterfallProps = {
  rows: number; // number of traces kept in the history
  rowSpacing: number;
  amplitude: number;
  updateInterval: number; // ms between scope captures
};

type WaterfallOptions = WaterfallProps & {
  start: number; // x range of each trace, before its drift
  end: number;
  background: Color;
};

type WaterfallUniforms = {
  uHead: { value: number };
  uFrac: { value: number };
  uRows: { value: number };
  uSpacing: { value: number };
  uDrift: { value: number };
  uBend: { value: number };
  uFadeRows: { value: number };
  uBackground: { value: Color };
};

function readColor(property: string) {
  const rootStyles = globalThis.getComputedStyle(
    globalThis.document.documentElement,
  );

  return new Color(rootStyles.getPropertyValue(property).trim());
}

// A slowly evolving FM + soft-saturation "patch", sampled like a triggered
// scope. Sampled in world units so the wavelength stays the same at any
// window width.
function sampleWaveform(
  out: Float32Array,
  offset: number,
  xs: Float32Array,
  t: number,
) {
  const fmIndex = 1 + 0.5 * Math.sin(t * 0.31);
  // Kept under π/2 so peaks round off instead of folding back into spikes
  const drive = 1.2 + 0.3 * Math.sin(t * 0.17);
  const k = ((Math.PI * 2) / 18) * (1 + 0.33 * Math.sin(t * 0.05));

  for (let c = 0; c < xs.length; c++) {
    const phase = xs[c] * k - t * 0.3; // slides slowly to the right
    const carrier = Math.sin(phase + fmIndex * Math.sin(phase * 2 + t));

    out[offset + c] = Math.sin(carrier * drive) / Math.sin(drive);
  }
}

// Places each vertex from its trace's age, so traces only need writing once
// when captured. Age is the trace's slot behind the newest one plus the
// fraction of the way to the next capture, which keeps the scroll continuous.
// Traces step back and sideways, the far end bends up so it fills the top of
// the frame, and the oldest traces fade into the background.
function withWaterfall<T extends Material>(
  material: T,
  uniforms: WaterfallUniforms,
) {
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = /* glsl */ `
      attribute float aRow;
      uniform float uHead;
      uniform float uFrac;
      uniform float uRows;
      uniform float uSpacing;
      uniform float uDrift;
      uniform float uBend;
      uniform float uFadeRows;
      uniform vec3 uBackground;

      float waterfallAge() {
        return mod(aRow - uHead, uRows) + uFrac;
      }
      ${shader.vertexShader}
    `
      .replace(
        "#include <color_vertex>",
        /* glsl */ `#include <color_vertex>
        float wfLife = clamp((uRows - 1.0 - waterfallAge()) / uFadeRows, 0.0, 1.0);
        vColor.rgb = mix(uBackground, vColor.rgb, smoothstep(0.0, 1.0, wfLife));`,
      )
      .replace(
        "#include <begin_vertex>",
        /* glsl */ `#include <begin_vertex>
        float wfDepth = waterfallAge() * uSpacing;
        transformed.x += wfDepth * uDrift;
        transformed.y += uBend * wfDepth * wfDepth;
        transformed.z -= wfDepth;`,
      );
  };

  return material;
}

// Ring buffer of scope traces, drawn as polylines plus a "curtain" strip
// hanging below each one that hides the traces behind it (hidden-line
// removal). Each trace gets the next hue in the rainbow, cycling once over
// the whole history, and its curtain a dark tint of that hue so the
// background shifts color along with the traces.
function createWaterfall({
  rows,
  start,
  end,
  rowSpacing,
  amplitude,
  updateInterval,
  background,
}: WaterfallOptions) {
  const cols = Math.ceil((end - start) * SAMPLES_PER_UNIT);
  const xs = new Float32Array(cols);
  const heights = new Float32Array(cols);
  const linePositions = new Float32Array(rows * cols * 3);
  const lineColors = new Float32Array(rows * cols * 3);
  const lineRows = new Float32Array(rows * cols);
  const curtainPositions = new Float32Array(rows * cols * 2 * 3);
  const curtainColors = new Float32Array(rows * cols * 2 * 3);
  const curtainRows = new Float32Array(rows * cols * 2);
  const lineIndex: number[] = [];
  const curtainIndex: number[] = [];
  const color = new Color();
  const tint = new Color();
  let head = 0; // ring buffer row of the newest trace
  let captures = 0;

  for (let c = 0; c < cols; c++) {
    xs[c] = start + (c / (cols - 1)) * (end - start);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;

      linePositions.set([xs[c], 0, 0], i * 3);
      curtainPositions.set([xs[c], 0, 0, xs[c], -amplitude * 3, 0], i * 6);
      lineRows[i] = r;
      curtainRows.set([r, r], i * 2);

      if (c < cols - 1) {
        const top = i * 2;

        lineIndex.push(i, i + 1);
        curtainIndex.push(top, top + 1, top + 2, top + 2, top + 1, top + 3);
      }
    }
  }

  const lines = new BufferGeometry();

  lines.setAttribute("position", new BufferAttribute(linePositions, 3));
  lines.setAttribute("color", new BufferAttribute(lineColors, 3));
  lines.setAttribute("aRow", new BufferAttribute(lineRows, 1));
  lines.setIndex(lineIndex);

  const curtains = new BufferGeometry();

  curtains.setAttribute("position", new BufferAttribute(curtainPositions, 3));
  curtains.setAttribute("color", new BufferAttribute(curtainColors, 3));
  curtains.setAttribute("aRow", new BufferAttribute(curtainRows, 1));
  curtains.setIndex(curtainIndex);

  const uniforms: WaterfallUniforms = {
    uHead: { value: 0 },
    uFrac: { value: 0 },
    uRows: { value: rows },
    uSpacing: { value: rowSpacing },
    uDrift: { value: DRIFT },
    uBend: { value: bendAmount(rows, rowSpacing, amplitude) },
    uFadeRows: { value: FADE_ROWS },
    uBackground: { value: background },
  };

  const lineMaterial = withWaterfall(
    new LineBasicMaterial({ vertexColors: true }),
    uniforms,
  );
  const curtainMaterial = withWaterfall(
    new MeshBasicMaterial({
      vertexColors: true,
      side: DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    }),
    uniforms,
  );

  const updatedAttributes = [
    lines.attributes.position,
    lines.attributes.color,
    curtains.attributes.position,
    curtains.attributes.color,
  ] as BufferAttribute[];

  // Write a new trace over the oldest one and upload just that row
  const capture = (index: number) => {
    const hue = (((index / rows) % 1) + 1) % 1;

    head = (((head - 1) % rows) + rows) % rows;
    sampleWaveform(heights, 0, xs, (index * updateInterval) / 1000);
    color.setHSL(hue, 1, 0.55);
    tint.setHSL(hue, 0.6, 0.06, SRGBColorSpace);

    for (let c = 0; c < cols; c++) {
      const i = head * cols + c;
      const y = heights[c] * amplitude;

      linePositions[i * 3 + 1] = y;
      curtainPositions[i * 6 + 1] = y;
      lineColors.set([color.r, color.g, color.b], i * 3);
      curtainColors.set(
        [tint.r, tint.g, tint.b, tint.r, tint.g, tint.b],
        i * 6,
      );
    }

    for (const attribute of updatedAttributes) {
      const rowSize = attribute.array.length / rows;

      attribute.addUpdateRange(head * rowSize, rowSize);
      attribute.needsUpdate = true;
    }

    uniforms.uHead.value = head;
  };

  // Pre-fill the history, oldest first, so the waterfall starts populated
  for (let r = rows - 1; r >= 0; r--) {
    capture(-r);
  }

  for (const attribute of updatedAttributes) {
    attribute.clearUpdateRanges();
  }

  return {
    lines,
    curtains,
    lineMaterial,
    curtainMaterial,
    capture() {
      capture(++captures);
    },
    glide(frac: number) {
      uniforms.uFrac.value = frac;
    },
    dispose() {
      lines.dispose();
      curtains.dispose();
      lineMaterial.dispose();
      curtainMaterial.dispose();
    },
  };
}

// How much the far end needs to curve up so the top edge of the frame lands
// on traces (even in their troughs) before they start fading out. Zero when
// the camera looks down steeply enough not to need it.
function bendAmount(rows: number, rowSpacing: number, amplitude: number) {
  const depth = (rows - FADE_ROWS) * rowSpacing - 6;
  const topRayDrop = Math.tan(
    CAMERA_PITCH - MathUtils.degToRad(CAMERA_FOV / 2),
  );
  // The yawed frame's top corners reach a little deeper than its center
  const forward = (CAMERA_Z + depth) / 1.1;
  const rayHeight = CAMERA_HEIGHT - forward * topRayDrop;

  return Math.max(0, (rayHeight + amplitude) / (depth * depth));
}

// X range each trace needs to reach both edges of the window at every depth.
// Farther traces drift right while the camera's yaw shifts the view left, so
// the range extends left by both. Rounded out so small resizes (e.g. mobile
// URL bars) don't rebuild it.
function bleedRange(aspect: number, depth: number) {
  const distance = CAMERA_Z + depth;
  const viewDepth =
    distance * Math.cos(CAMERA_PITCH) + CAMERA_HEIGHT * Math.sin(CAMERA_PITCH);
  const halfWidth =
    viewDepth * Math.tan(MathUtils.degToRad(CAMERA_FOV / 2)) * aspect;
  const shift = distance * (Math.tan(CAMERA_YAW) + DRIFT);
  const roundOut = (n: number) => Math.ceil(n / 5) * 5;

  return { start: -roundOut(halfWidth + shift), end: roundOut(halfWidth) };
}

const Waterfall: React.FC<WaterfallProps> = ({
  rows,
  rowSpacing,
  amplitude,
  updateInterval,
}) => {
  const elapsed = useRef(0);
  const aspect = useThree((state) => state.size.width / state.size.height);
  const { start, end } = bleedRange(aspect, rows * rowSpacing);
  const background = useMemo(() => readColor("--background"), []);
  const waterfall = useMemo(
    () =>
      createWaterfall({
        rows,
        start,
        end,
        rowSpacing,
        amplitude,
        updateInterval,
        background,
      }),
    [rows, start, end, rowSpacing, amplitude, updateInterval, background],
  );

  useEffect(() => () => waterfall.dispose(), [waterfall]);

  useFrame((_, delta) => {
    elapsed.current += delta * 1000;

    if (elapsed.current >= updateInterval) {
      elapsed.current %= updateInterval;
      waterfall.capture();
    }

    waterfall.glide(elapsed.current / updateInterval);
  });

  // Positions are computed in the shader, so the geometry's bounds are meaningless
  return (
    <>
      <mesh
        geometry={waterfall.curtains}
        material={waterfall.curtainMaterial}
        frustumCulled={false}
      />
      <lineSegments
        geometry={waterfall.lines}
        material={waterfall.lineMaterial}
        frustumCulled={false}
      />
    </>
  );
};

export default function Canvas() {
  return (
    <div className={styles.canvas}>
      <ThreeCanvas>
        <PerspectiveCamera
          makeDefault
          fov={CAMERA_FOV}
          position={[0, CAMERA_HEIGHT, CAMERA_Z]}
          rotation={[-CAMERA_PITCH, CAMERA_YAW, 0, "YXZ"]}
        />
        <Waterfall
          rows={150}
          rowSpacing={0.6}
          amplitude={3.5}
          updateInterval={240}
        />
        <EffectComposer>
          <Noise opacity={0.1} />
        </EffectComposer>
      </ThreeCanvas>
    </div>
  );
}
