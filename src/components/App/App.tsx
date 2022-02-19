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
const { GridMaterial } = await import("@babylonjs/materials/grid/gridMaterial");
const { Texture } = await import("@babylonjs/core/Materials/Textures/texture");
const { CreateGround } = await import(
  "@babylonjs/core/Meshes/Builders/groundBuilder"
);
const { SceneComponent } = await import("../SceneComponent");
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
const endFrame = 750;

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

const radiusAnimation = Animation.CreateAnimation(
  "radius",
  Animation.ANIMATIONTYPE_FLOAT,
  60,
  ease
);
const initialRadius = 8;
const upperRadius = 20;

radiusAnimation.setKeys([
  {
    frame: startFrame,
    value: initialRadius,
  },
  {
    frame: endFrame,
    value: upperRadius,
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
  camera.lowerRadiusLimit = initialRadius;
  camera.upperRadiusLimit = upperRadius;
  camera.upperBetaLimit = Math.PI / 2;
  const canvas = scene.getEngine().getRenderingCanvas();

  camera.attachControl(canvas);

  const light = new HemisphericLight("hemi", new Vector3(0, -1, 0), scene);
  light.intensity = 0.25;
  const { r, g, b } = Color3.FromHexString("#20213b");
  scene.clearColor = new Color4(r, g, b, 1);
  const tagCharactersColor = "#66cceede";
  const position = {
    z: 10,
  };
  const anchor = "center";
  const letterHeight = { "letter-height": 14 };
  const Writer = MeshWriter(scene, {
    scale: 0.1,
    defaultFont: "DankMono-Regular",
    methods,
  });
  new Writer("<       ", {
    ...letterHeight,
    anchor,
    color: tagCharactersColor,
    position,
  });
  new Writer(" ASGB   ", {
    ...letterHeight,
    anchor,
    color: "#aaddeecc",
    position,
  });
  new Writer("      />", {
    ...letterHeight,
    anchor,
    color: tagCharactersColor,
    position,
  });
  const gridMesh = CreateGround(
    "grid",
    { width: 1, height: 1, subdivisions: 1 },
    scene
  );

  if (gridMesh.reservedDataStore) {
    gridMesh.reservedDataStore = {};
  }

  const extend = scene.getWorldExtends();
  const width = (extend.max.x - extend.min.x) * 5.0;
  const depth = (extend.max.z - extend.min.z) * 5.0;
  gridMesh.scaling.x = Math.max(width, depth);
  gridMesh.scaling.z = gridMesh.scaling.x;
  gridMesh.isPickable = false;
  const groundMaterial = new GridMaterial("GridMaterial", scene);
  groundMaterial.majorUnitFrequency = 10;
  groundMaterial.minorUnitVisibility = 0.3;
  groundMaterial.gridRatio = 0.01;
  groundMaterial.backFaceCulling = false;
  groundMaterial.mainColor = new Color3(1, 1, 1);
  groundMaterial.lineColor = new Color3(1.0, 1.0, 1.0);
  groundMaterial.opacity = 0.8;
  groundMaterial.zOffset = 1.0;
  groundMaterial.opacityTexture = new Texture(
    "https://assets.babylonjs.com/environments/backgroundGround.png",
    scene
  );
  gridMesh.material = groundMaterial;

  scene.beginDirectAnimation(
    camera,
    [betaAnimation],
    startFrame,
    endFrame,
    false,
    4,
    () => {
      scene.beginDirectAnimation(
        camera,
        [radiusAnimation],
        startFrame,
        endFrame,
        false,
        4
      );
    }
  );
};

export const App: FC = () => (
  <SceneComponent
    antialias
    onSceneReady={onSceneReady}
    id="canvas"
    adaptToDeviceRatio
  />
);
