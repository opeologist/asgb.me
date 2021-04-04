import React, { useState } from "react";
import { ViroARSceneNavigator } from "@viro-community/react-viro";
import {
  ViroARScene,
  ViroARPlaneSelector,
  ViroConstants,
} from "@viro-community/react-viro";
import { ARContext } from "../../contexts";
import styles from "./styles";
import Source from "../Source";

const Scene = () => {
  const [ready, setReady] = useState(false);
  const onTrackingUpdated = (state, reason) => {
    if (state === ViroConstants.TRACKING_NORMAL) {
      setReady(true);
    } else if (state === ViroConstants.TRACKING_NONE) {
      console.log("lost tracking");
    }
  };

  return (
    <ARContext.Provider value={{ ready }}>
      <ViroARScene
        {...{ onTrackingUpdated }}
        anchorDetectionTypes={["PlanesHorizontal"]}
      >
        <ViroARPlaneSelector
          alignment={"Horizontal"}
          minWidth={0.1}
          minHeight={0}
        >
          <Source />
        </ViroARPlaneSelector>
      </ViroARScene>
    </ARContext.Provider>
  );
};

const { resume } = styles();

export default function Resume() {
  return (
    <ViroARSceneNavigator
      autofocus
      initialScene={{ scene: Scene }}
      style={resume}
    />
  );
}
