import React, { useState } from "react";
import { ViroARSceneNavigator } from "@viro-community/react-viro";
import {
  ViroARScene,
  ViroARPlaneSelector,
  ViroConstants,
} from "@viro-community/react-viro";
import { View } from "react-native";
import { ARContext } from "../../contexts";
import styles from "./styles";
import Source from "../Source";
import Footer from "../Footer";

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
          <Source ar />
        </ViroARPlaneSelector>
      </ViroARScene>
    </ARContext.Provider>
  );
};

const { ar, arContainer, arWrapper } = styles();

export default function AR() {
  return (
    <View style={arWrapper}>
      <View style={arContainer}>
        <ViroARSceneNavigator
          autofocus
          initialScene={{ scene: Scene }}
          style={ar}
        />
      </View>
      <Footer reverse />
    </View>
  );
}
