const { useEffect, useState } = await import("react");
const { Engine, Scene } = await import("react-babylonjs");
const { Vector2, Vector3 } = await import("@babylonjs/core");
const { Color3, Color4 } = await import("@babylonjs/core/Maths/math.color");
const { Path2, Curve3 } = await import("@babylonjs/core/Maths/math.path");
const { Mesh } = await import("@babylonjs/core/Meshes/mesh");
const { CSG } = await import("@babylonjs/core/Meshes/csg");
const { PolygonMeshBuilder } = await import(
  "@babylonjs/core/Meshes/polygonMesh"
);
const { SolidParticleSystem } = await import(
  "@babylonjs/core/Particles/solidParticleSystem"
);
const { StandardMaterial } = await import(
  "@babylonjs/core/Materials/standardMaterial"
);
const { MeshWriter } = await import("meshwriter");
const { Animation } = await import("@babylonjs/core/Animations/animation");
const { CubicEase, EasingFunction } = await import(
  "@babylonjs/core/Animations/easing"
);

const methods = {
  Vector2,
  Vector3,
  Path2,
  Curve3,
  Color3,
  SolidParticleSystem,
  PolygonMeshBuilder,
  CSG,
  StandardMaterial,
  Mesh,
};
const ease = new CubicEase();
ease.setEasingMode(EasingFunction.EASINGMODE_EASEINOUT);
const betaAnimation = Animation.CreateAnimation(
  "beta",
  Animation.ANIMATIONTYPE_FLOAT,
  60,
  ease
);
const initialBeta = 0.5 + Math.PI / 4;
const startFrame = 0;
const endFrame = 500;
betaAnimation.setKeys([
  {
    frame: startFrame,
    value: initialBeta,
  },
  {
    frame: endFrame,
    value: 0,
  },
]);

export const App = () => {
  const [scene, setScene] = useState(null);

  useEffect(() => {
    if (scene !== null) {
      const { r, g, b } = Color3.FromHexString("#20213b");
      scene.clearColor = new Color4(r, g, b, 1);
      const Writer = MeshWriter(scene, {
        scale: 0.1,
        defaultFont: "DankMono-Regular",
        methods,
      });
      const camera = scene.activeCamera;
      camera.animations = [betaAnimation];

      new Writer("<       ", {
        anchor: "center",
        "letter-height": 14,
        color: "#66cceede",
        position: {
          z: 10,
        },
      });
      new Writer(" ASGB   ", {
        anchor: "center",
        "letter-height": 14,
        color: "#aaddeecc",
        position: {
          z: 10,
        },
      });
      new Writer("      />", {
        anchor: "center",
        "letter-height": 14,
        color: "#66cceede",
        position: {
          z: 10,
        },
      });

      scene.beginAnimation(camera, startFrame, endFrame, false, 4);
    }
  }, [scene]);

  return (
    <Engine antialias adaptToDeviceRatio canvasId="canvas">
      <Scene
        onSceneMount={({ scene }) => {
          setScene(scene);
        }}
      >
        <arcRotateCamera
          name="arc"
          target={new Vector3(0, 1, 0)}
          alpha={-Math.PI / 2}
          beta={initialBeta}
          radius={4}
          minZ={0.0001}
          wheelPrecision={50}
          lowerRadiusLimit={8}
          upperRadiusLimit={20}
          upperBetaLimit={Math.PI / 2}
        />
        <hemisphericLight
          name="hemi"
          direction={new Vector3(0, -1, 0)}
          intensity={0.25}
        />
      </Scene>
    </Engine>
  );
};
