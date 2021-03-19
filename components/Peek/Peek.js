import React, { lazy, Suspense, useEffect, useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import Line from "../Line";
import Text from "../Text";

const Skeleton = () => {
  const lines = [];

  for (let i = 0; i < 9; i++) {
    lines.push(
      <Line key={i}>
        <Text spaceAtEnd />
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
        <View style={container}>
          <Suspense fallback={<Skeleton />}>
            <TopOfExport />
          </Suspense>
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
    )
  );
}
