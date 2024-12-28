"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { Canvas as ThreeCanvas, useFrame } from "@react-three/fiber";
import {
  DepthOfField,
  EffectComposer,
  Noise,
} from "@react-three/postprocessing";
import { useRef, useState } from "react";
import { BufferGeometry, Float32BufferAttribute, type Mesh } from "three";
import styles from "./canvas.module.css";

type TerrainProps = {
  rows: number;
  cols: number;
  cellSize: number;
  updateInterval: number;
};

// Generate initial vertices for the grid
function generateInitialVertices(rows: number, cols: number, cellSize: number) {
  const vertices: number[] = [];

  for (let z = 0; z <= rows; z++) {
    for (let x = 0; x <= cols; x++) {
      vertices.push(x * cellSize, Math.random() * 2 - 1, z * cellSize);
    }
  }

  return vertices;
}

const ProceduralTerrain: React.FC<TerrainProps> = ({
  rows,
  cols,
  cellSize,
  updateInterval,
}) => {
  const meshRef = useRef<Mesh>(null);
  const [vertices, setVertices] = useState(() =>
    generateInitialVertices(rows, cols, cellSize),
  );
  let elapsedTime = 0; // Accumulate time between frames
  // Update vertices dynamically
  const updateVertices = () => {
    const newVertices = [...vertices];
    const numCols = cols + 1;

    // Shift rows towards the left
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < numCols; j++) {
        const index = (i * numCols + j) * 3;
        newVertices[index + 2] -= cellSize; // Move z-coordinates
      }
    }

    // Remove out-of-bounds rows and add new ones
    newVertices.splice(0, numCols * 3);

    for (let x = 0; x <= cols; x++) {
      newVertices.push(x * cellSize, Math.random() * 2 - 1, rows * cellSize);
    }

    setVertices(newVertices);
  };

  useFrame((_, delta) => {
    elapsedTime += delta * 1000; // Convert delta to milliseconds

    if (elapsedTime === 0 || elapsedTime >= updateInterval) {
      elapsedTime = 0; // Reset elapsed time

      if (meshRef.current) {
        updateVertices();

        const geometry = meshRef.current.geometry as BufferGeometry;

        geometry.setAttribute(
          "position",
          new Float32BufferAttribute(vertices, 3),
        );
        geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[cols * cellSize, rows * cellSize, cols, rows]} />
      <meshStandardMaterial wireframe color="white" />
    </mesh>
  );
};

export default function Canvas() {
  return (
    <div className={styles.canvas}>
      <ThreeCanvas>
        <ambientLight intensity={0.5} />
        <PerspectiveCamera makeDefault position={[25, 5, 50]} />
        <ProceduralTerrain
          rows={50}
          cols={50}
          cellSize={1}
          updateInterval={60}
        />
        <EffectComposer>
          <DepthOfField
            focusDistance={0}
            focalLength={0.025}
            bokehScale={2}
            height={480}
          />
          <Noise opacity={0.1} />
        </EffectComposer>
      </ThreeCanvas>
    </div>
  );
}
