"use client";

import type {
  EngineOptions,
  Scene as SceneType,
  SceneOptions,
} from "@babylonjs/core";
import { Engine, Scene } from "@babylonjs/core";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import styles from "../../styles/global.module.css";

interface SceneComponentProps {
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  sceneOptions?: SceneOptions;
  onRender?: (scene: SceneType) => void;
  onSceneReady?: (scene: SceneType) => void;
  id: string;
}

export const SceneComponent: FC<SceneComponentProps> = ({
  antialias,
  engineOptions,
  adaptToDeviceRatio,
  sceneOptions,
  onRender,
  onSceneReady,
  ...rest
}) => {
  const reactCanvas = useRef(null);
  const { canvas } = styles;

  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(
        reactCanvas.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio
      );
      const scene = new Scene(engine, sceneOptions);
      const resize = () => {
        scene.getEngine().resize();
      };

      if (scene.isReady()) {
        onSceneReady!(scene);
      } else {
        scene.onReadyObservable.addOnce((scene) => onSceneReady!(scene));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === "function") {
          onRender(scene);
        }

        scene.render();
      });

      if (window) {
        window.addEventListener("resize", resize);
      }

      return () => {
        scene.getEngine().dispose();

        if (window) {
          window.removeEventListener("resize", resize);
        }
      };
    }
  }, [
    adaptToDeviceRatio,
    antialias,
    engineOptions,
    onRender,
    onSceneReady,
    reactCanvas,
    sceneOptions,
  ]);

  return <canvas ref={reactCanvas} {...rest} className={canvas} />;
};
