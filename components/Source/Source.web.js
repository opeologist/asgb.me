import React, { lazy, Suspense, useEffect, useState } from "react";
import Text from "../Text";
import Line from "../Line";
import Box from "../Box";

export default function Source() {
  const [TopOfExport, setTopOfExport] = useState(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setTopOfExport(lazy(() => import("./TopOfExport")));
    setHasMounted(true);
  }, []);

  return (
    hasMounted && (
      <Box>
        <Line>
          <Text color="brown" italic>
            import
          </Text>
          <Text color="orange" preSpace>
            {"{"}
          </Text>
          <Text color="lightGreen" preSpace>
            useDegree
          </Text>
          <Text color="orange" preSpace>
            {"}"}
          </Text>
          <Text color="brown" italic preSpace>
            from
          </Text>
          <Text color="teal" preSpace>
            {'"@ucf/digital-media"'}
          </Text>
          <Text color="orange">;</Text>
        </Line>
        <Line>
          <Text color="brown" italic>
            import
          </Text>
          <Text color="orange" preSpace>
            {"{"}
          </Text>
          <Text color="lightGreen" preSpace>
            SeniorWebDeveloper
          </Text>
          <Text color="orange" preSpace>
            {"}"}
          </Text>
          <Text color="brown" italic preSpace>
            from
          </Text>
          <Text color="teal" preSpace>
            {'"@curse/engineering"'}
          </Text>
          <Text color="orange">;</Text>
        </Line>
        <Line>
          <Text color="brown" italic>
            import
          </Text>
          <Text color="orange" preSpace>
            {"{"}
          </Text>
          <Text color="lightGreen" preSpace>
            FrontEndEngineerII
          </Text>
          <Text color="orange" preSpace>
            {"}"}
          </Text>
          <Text color="brown" italic preSpace>
            from
          </Text>
          <Text color="teal" preSpace>
            {'"@amazon/engineering"'}
          </Text>
          <Text color="orange">;</Text>
        </Line>
        <Line>
          <Text preSpace />
        </Line>
        <Suspense fallback={null}>
          <TopOfExport />
        </Suspense>
        <Line indent={6}>
          <Text color="lightGreen">team</Text>
          <Text color="orange">=</Text>
          <Text color="teal">{'"Mobile Growth/Engagement"'}</Text>
        </Line>
        <Line indent={6}>
          <Text color="lightGreen">startDate</Text>
          <Text color="orange">{"={"}</Text>
          <Text color="yellow">new</Text>
          <Text color="darkGreen" preSpace>
            Date
          </Text>
          <Text color="orange">(</Text>
          <Text color="pink">2020</Text>
          <Text color="orange">,</Text>
          <Text color="pink" preSpace>
            1
          </Text>
          <Text color="orange">{")}"}</Text>
        </Line>
        <Line indent={6}>
          <Text color="lightGreen">previousWorkExperience</Text>
          <Text color="orange">{"={["}</Text>
        </Line>
        <Line indent={8}>
          <Text color="orange">{"<"}</Text>
          <Text color="darkGreen">FrontEndEngineerII</Text>
        </Line>
        <Line indent={10}>
          <Text color="lightGreen">team</Text>
          <Text color="orange">=</Text>
          <Text color="teal">{'"Woot! Experience"'}</Text>
        </Line>
        <Line indent={10}>
          <Text color="lightGreen">startDate</Text>
          <Text color="orange">{"={"}</Text>
          <Text color="yellow">new</Text>
          <Text color="darkGreen" preSpace>
            Date
          </Text>
          <Text color="orange">(</Text>
          <Text color="pink">2016</Text>
          <Text color="orange">,</Text>
          <Text color="pink" preSpace>
            9
          </Text>
          <Text color="orange">{")}"}</Text>
        </Line>
        <Line indent={8}>
          <Text color="orange">{"/>,"}</Text>
        </Line>
        <Line indent={8}>
          <Text color="orange">{"<"}</Text>
          <Text color="darkGreen">SeniorWebDeveloper</Text>
        </Line>
        <Line indent={10}>
          <Text color="lightGreen">team</Text>
          <Text color="orange">=</Text>
          <Text color="teal">{'"Product"'}</Text>
        </Line>
        <Line indent={10}>
          <Text color="lightGreen">startDate</Text>
          <Text color="orange">{"={"}</Text>
          <Text color="yellow">new</Text>
          <Text color="darkGreen" preSpace>
            Date
          </Text>
          <Text color="orange">(</Text>
          <Text color="pink">2014</Text>
          <Text color="orange">,</Text>
          <Text color="pink" preSpace>
            3
          </Text>
          <Text color="orange">{")}"}</Text>
        </Line>
        <Line indent={8}>
          <Text color="orange">{"/>,"}</Text>
        </Line>
        <Line indent={6}>
          <Text color="orange">{"]}"}</Text>
        </Line>
        <Line indent={6}>
          <Text color="orange">{"{"}</Text>
          <Text color="yellow">...</Text>
          <Text color="orange">{"{"}</Text>
          <Text color="lightGreen" preSpace>
            education
          </Text>
          <Text color="orange" preSpace>
            {"}}"}
          </Text>
        </Line>
        <Line indent={4}>
          <Text color="orange">{"/>"}</Text>
        </Line>
        <Line indent={2}>
          <Text color="orange">{");"}</Text>
        </Line>
        <Line>
          <Text color="orange">{"}"}</Text>
        </Line>
      </Box>
    )
  );
}
