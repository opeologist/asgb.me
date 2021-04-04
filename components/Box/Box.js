import React, { useContext } from "react";
import { View } from "react-native";
import { ViroFlexView } from "@viro-community/react-viro";
import styles from "./styles";
import { ARContext } from "../../contexts";
import { backgroundColor } from "../../constants";

export default function Box({ style, ...rest }) {
  const { ready } = useContext(ARContext);

  const { container } = styles();

  if (ready) {
    return (
      <ViroFlexView
        position={[0, 0, -0.1]}
        rotation={[0, 0, 0]}
        scale={[0.035, 0.035, 0.035]}
        transformBehaviors={["billboardX"]}
        width={6.8}
        height={7.2}
        {...{ backgroundColor, style }}
        {...rest}
      />
    );
  }

  return <View style={[container, style]} {...rest} />;
}
