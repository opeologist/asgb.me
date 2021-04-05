import React, { useEffect, useState } from "react";
import Text from "../Text";
import Line from "../Line";
import Box from "../Box";
import TopOfExport from "./TopOfExport";

export default function Source() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    hasMounted && (
      <Box>
        <Line num={1}>
          <Text color="transparent">.</Text>
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
          <Text color="teal" left={26} preSpace>
            {'"@ucf/digital-media"'}
          </Text>
          <Text color="orange">;</Text>
        </Line>
        <Line num={2}>
          <Text color="transparent">.</Text>
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
        <Line num={3}>
          <Text color="transparent">.</Text>
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
        <Line num={4}>
          <Text color="transparent">.</Text>
          <Text preSpace />
        </Line>
        <TopOfExport />
        <Line indent={6} num={14}>
          <Text color="transparent">.</Text>
          <Text color="lightGreen">team</Text>
          <Text color="orange">=</Text>
          <Text color="teal">{'"Mobile Growth/Engagement"'}</Text>
        </Line>
        <Line indent={6} num={15}>
          <Text color="transparent">.</Text>
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
        <Line indent={6} num={16}>
          <Text color="transparent">.</Text>
          <Text color="lightGreen">previousWorkExperience</Text>
          <Text color="orange">{"={["}</Text>
        </Line>
        <Line indent={8} num={17}>
          <Text color="transparent">.</Text>
          <Text color="orange">{"<"}</Text>
          <Text color="darkGreen">FrontEndEngineerII</Text>
        </Line>
        <Line indent={10} num={18}>
          <Text color="transparent">.</Text>
          <Text color="lightGreen">team</Text>
          <Text color="orange">=</Text>
          <Text color="teal">{'"Woot! Experience"'}</Text>
        </Line>
        <Line indent={10} num={19}>
          <Text color="transparent">.</Text>
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
        <Line indent={8} num={20}>
          <Text color="transparent">.</Text>
          <Text color="orange">{"/>,"}</Text>
        </Line>
        <Line indent={8} num={21}>
          <Text color="transparent">.</Text>
          <Text color="orange">{"<"}</Text>
          <Text color="darkGreen">SeniorWebDeveloper</Text>
        </Line>
        <Line indent={10} num={22}>
          <Text color="transparent">.</Text>
          <Text color="lightGreen">team</Text>
          <Text color="orange">=</Text>
          <Text color="teal">{'"Product"'}</Text>
        </Line>
        <Line indent={10} num={23}>
          <Text color="transparent">.</Text>
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
        <Line indent={8} num={24}>
          <Text color="transparent">.</Text>
          <Text color="orange">{"/>,"}</Text>
        </Line>
        <Line indent={6} num={25}>
          <Text color="transparent">.</Text>
          <Text color="orange">{"]}"}</Text>
        </Line>
        <Line indent={6} num={26}>
          <Text color="transparent">.</Text>
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
        <Line indent={4} num={27}>
          <Text color="transparent">.</Text>
          <Text color="orange">{"/>"}</Text>
        </Line>
        <Line indent={2} num={28}>
          <Text color="transparent">.</Text>
          <Text color="orange">{");"}</Text>
        </Line>
        <Line num={29}>
          <Text color="transparent">.</Text>
          <Text color="orange">{"}"}</Text>
        </Line>
      </Box>
    )
  );
}
