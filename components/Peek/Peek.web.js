import React, { lazy, Suspense, useEffect, useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import Line from "../Line";
import Text from "../Text";
import Box from "../Box";

const Skeleton = () => {
  const lines = [];

  for (let i = 0; i < 9; i++) {
    lines.push(
      <Line key={i}>
        <Text preSpace />
      </Line>
    );
  }

  return lines;
};

export default function Peek() {
  const [TopOfExport, setTopOfExport] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setTopOfExport(lazy(() => import("../Source/TopOfExport")));
    setHasMounted(true);
  }, []);

  const { wrapper, container, type } = styles();

  return (
    hasMounted && (
      <View style={wrapper}>
        <Box style={container}>
          <Suspense fallback={<Skeleton />}>
            <TopOfExport />
          </Suspense>
        </Box>
        <Box style={[container, type]}>
          <Line>
            <Text color="orange">(</Text>
            <Text color="lightGreen">alias</Text>
            <Text color="orange">)</Text>
            <Text color="brown" preSpace>
              function
            </Text>
            <Text color="green" preSpace>
              Aaron
            </Text>
            <Text color="orange">():</Text>
            <Text color="green" preSpace>
              Human.Being
            </Text>
          </Line>
          <Line>
            <Text color="brown" italic>
              import
            </Text>
            <Text color="lightGreen" preSpace>
              ASGB
            </Text>
          </Line>
        </Box>
      </View>
    )
  );
}
