import type { Scene } from "@babylonjs/core";
import type { FC } from "react";

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
const { ArcRotateCamera, HemisphericLight } = await import("@babylonjs/core");
const { SceneComponent } = await import("./SceneComponent");
const { getQueryParameter } = await import("../../helpers/getQueryParameter");

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

const onSceneReady = (scene: Scene) => {
  if (getQueryParameter("debug")) {
    scene.debugLayer.show();
  }

  const camera = new ArcRotateCamera(
    "arc",
    -Math.PI / 2,
    initialBeta,
    4,
    new Vector3(0, 1, 0),
    scene
  );
  camera.minZ = 0.0001;
  camera.wheelPrecision = 50;
  camera.lowerRadiusLimit = 8;
  camera.upperRadiusLimit = 20;
  camera.upperBetaLimit = Math.PI / 2;
  const canvas = scene.getEngine().getRenderingCanvas();

  camera.attachControl(canvas);

  const light = new HemisphericLight("hemi", new Vector3(0, -1, 0), scene);
  light.intensity = 0.25;
  const { r, g, b } = Color3.FromHexString("#20213b");
  scene.clearColor = new Color4(r, g, b, 1);
  const Writer = MeshWriter(scene, {
    scale: 0.1,
    defaultFont: "DankMono-Regular",
    methods,
  });
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
  camera.animations = [betaAnimation];

  scene.beginAnimation(camera, startFrame, endFrame, false, 4);
};

export const App: FC = () => (
  <SceneComponent
    antialias
    onSceneReady={onSceneReady}
    id="canvas"
    adaptToDeviceRatio
  />
);
