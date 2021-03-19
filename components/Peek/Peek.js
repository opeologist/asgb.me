import React from "react";
import { View } from "react-native";
import styles from "./styles";
import Line from "../Line";
import Text from "../Text";
import TopOfExport from "../Source/TopOfExport";

export default function Peek() {
  const { wrapper, container, type } = styles();

  return (
    <View style={wrapper}>
      <View style={container}>
        <TopOfExport />
      </View>
      <View style={[container, type]}>
        <Line>
          <Text color="orange">(</Text>
          <Text color="lightGreen">alias</Text>
          <Text color="orange" spaceAtEnd>
            )
          </Text>
          <Text color="brown" spaceAtEnd>
            function
          </Text>
          <Text color="green">Aaron</Text>
          <Text color="orange" spaceAtEnd>
            ():
          </Text>
          <Text color="green">Human.Being</Text>
        </Line>
        <Line>
          <Text color="brown" italic spaceAtEnd>
            import
          </Text>
          <Text color="lightGreen">Aaron</Text>
        </Line>
      </View>
    </View>
  );
}
