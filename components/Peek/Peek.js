import React, { useEffect, useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import Line from "../Line";
import Text from "../Text";
import Box from "../Box";
import TopOfExport from "../Source/TopOfExport";

export default function Peek() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { wrapper, container, type } = styles();

  return (
    hasMounted && (
      <View style={wrapper}>
        <Box style={container}>
          <TopOfExport />
        </Box>
        <Box style={[container, type]}>
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
            <Text color="lightGreen">ASGB</Text>
          </Line>
        </Box>
      </View>
    )
  );
}
