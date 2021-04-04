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
          <Text color="brown" italic>
            import
          </Text>
          <Text color="orange" preSpace left={6}>
            {"{"}
          </Text>
          <Text color="lightGreen" preSpace left={9}>
            useDegree
          </Text>
          <Text color="orange" preSpace left={19}>
            {"}"}
          </Text>
          <Text color="brown" italic preSpace left={21}>
            from
          </Text>
          <Text color="teal" left={26} preSpace>
            {'"@ucf/digital-media"'}
          </Text>
          <Text color="orange" left={45}>
            ;
          </Text>
        </Line>
        <Line num={2}>
          <Text color="brown" italic>
            import
          </Text>
          <Text color="orange" preSpace left={7}>
            {"{"}
          </Text>
          <Text color="lightGreen" preSpace left={9}>
            SeniorWebDeveloper
          </Text>
          <Text color="orange" preSpace left={28}>
            {"}"}
          </Text>
          <Text color="brown" italic preSpace left={30}>
            from
          </Text>
          <Text color="teal" left={35} preSpace>
            {'"@curse/engineering"'}
          </Text>
          <Text color="orange" left={55}>
            ;
          </Text>
        </Line>
        <Line num={3}>
          <Text color="brown" italic>
            import
          </Text>
          <Text color="orange" preSpace left={7}>
            {"{"}
          </Text>
          <Text color="lightGreen" preSpace left={9}>
            FrontEndEngineerII
          </Text>
          <Text color="orange" preSpace left={28}>
            {"}"}
          </Text>
          <Text color="brown" italic preSpace left={30}>
            from
          </Text>
          <Text color="teal" left={35} preSpace>
            {'"@amazon/engineering"'}
          </Text>
          <Text color="orange" left={56}>
            ;
          </Text>
        </Line>
        <Line num={4}>
          <Text preSpace />
        </Line>
        <TopOfExport />
        <Line indent={6} num={14}>
          <Text color="lightGreen">team</Text>
          <Text color="orange" left={4}>
            =
          </Text>
          <Text color="teal" left={5}>
            {'"Mobile Growth/Engagement"'}
          </Text>
        </Line>
        <Line indent={6} num={15}>
          <Text color="lightGreen">startDate</Text>
          <Text color="orange" left={9}>
            {"={"}
          </Text>
          <Text color="yellow" left={11}>
            new
          </Text>
          <Text color="darkGreen" left={15} preSpace>
            Date
          </Text>
          <Text color="orange" left={19}>
            (
          </Text>
          <Text color="pink" left={20}>
            2020
          </Text>
          <Text color="orange" left={24}>
            ,
          </Text>
          <Text color="pink" left={26} preSpace>
            1
          </Text>
          <Text color="orange" left={27}>
            {")}"}
          </Text>
        </Line>
        <Line indent={6} num={16}>
          <Text color="lightGreen">previousWorkExperience</Text>
          <Text color="orange" left={22}>
            {"={["}
          </Text>
        </Line>
        <Line indent={8} num={17}>
          <Text color="orange">{"<"}</Text>
          <Text color="darkGreen" left={1}>
            FrontEndEngineerII
          </Text>
        </Line>
        <Line indent={10} num={18}>
          <Text color="lightGreen">team</Text>
          <Text color="orange" left={4}>
            =
          </Text>
          <Text color="teal" left={5}>
            {'"Woot! Experience"'}
          </Text>
        </Line>
        <Line indent={10} num={19}>
          <Text color="lightGreen">startDate</Text>
          <Text color="orange" left={9}>
            {"={"}
          </Text>
          <Text color="yellow" left={11}>
            new
          </Text>
          <Text color="darkGreen" left={15} preSpace>
            Date
          </Text>
          <Text color="orange" left={19}>
            (
          </Text>
          <Text color="pink" left={20}>
            2016
          </Text>
          <Text color="orange" left={24}>
            ,
          </Text>
          <Text color="pink" left={26} preSpace>
            9
          </Text>
          <Text color="orange" left={27}>
            {")}"}
          </Text>
        </Line>
        <Line indent={8} num={20}>
          <Text color="orange">{"/>,"}</Text>
        </Line>
        <Line indent={8} num={21}>
          <Text color="orange">{"<"}</Text>
          <Text color="darkGreen" left={1}>
            SeniorWebDeveloper
          </Text>
        </Line>
        <Line indent={10} num={22}>
          <Text color="lightGreen">team</Text>
          <Text color="orange" left={4}>
            =
          </Text>
          <Text color="teal" left={5}>
            {'"Product"'}
          </Text>
        </Line>
        <Line indent={10} num={23}>
          <Text color="lightGreen">startDate</Text>
          <Text color="orange" left={9}>
            {"={"}
          </Text>
          <Text color="yellow" left={11}>
            new
          </Text>
          <Text color="darkGreen" left={15} preSpace>
            Date
          </Text>
          <Text color="orange" left={19}>
            (
          </Text>
          <Text color="pink" left={20}>
            2014
          </Text>
          <Text color="orange" left={24}>
            ,
          </Text>
          <Text color="pink" left={26} preSpace>
            3
          </Text>
          <Text color="orange" left={27}>
            {")}"}
          </Text>
        </Line>
        <Line indent={8} num={24}>
          <Text color="orange">{"/>,"}</Text>
        </Line>
        <Line indent={6} num={25}>
          <Text color="orange">{"]}"}</Text>
        </Line>
        <Line indent={6} num={26}>
          <Text color="orange">{"{"}</Text>
          <Text color="yellow" left={1}>
            ...
          </Text>
          <Text color="orange" left={4}>
            {"{"}
          </Text>
          <Text color="lightGreen" preSpace left={5}>
            education
          </Text>
          <Text color="orange" left={14} preSpace>
            {"}}"}
          </Text>
        </Line>
        <Line indent={4} num={27}>
          <Text color="orange">{"/>"}</Text>
        </Line>
        <Line indent={2} num={28}>
          <Text color="orange">{");"}</Text>
        </Line>
        <Line num={29}>
          <Text color="orange">{"}"}</Text>
        </Line>
      </Box>
    )
  );
}
