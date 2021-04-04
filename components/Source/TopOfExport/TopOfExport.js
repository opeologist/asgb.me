import React from "react";
import Line from "../../Line";
import Text from "../../Text";

export default function TopOfExport() {
  return (
    <>
      <Line num={5}>
        <Text color="brown" italic>
          export default
        </Text>
        <Text color="brown" preSpace left={15}>
          function
        </Text>
        <Text color="green" left={23} preSpace>
          Aaron
        </Text>
        <Text color="orange" left={29}>
          {"() {"}
        </Text>
      </Line>
      <Line indent={2} num={6}>
        <Text color="brown">const</Text>
        <Text color="orange" left={6} preSpace>
          [
        </Text>
        <Text color="lightGreen" left={7}>
          education
        </Text>
        <Text color="orange" left={16}>
          ] =
        </Text>
        <Text color="green" preSpace left={20}>
          useDegree
        </Text>
        <Text color="orange" left={29}>
          {"({"}
        </Text>
      </Line>
      <Line indent={4} num={7}>
        <Text color="lightGreen">name:</Text>
        <Text color="teal" left={6} preSpace>
          {'"Digital Interactive Systems"'}
        </Text>
        <Text color="orange" left={35}>
          ,
        </Text>
      </Line>
      <Line indent={4} num={8}>
        <Text color="lightGreen">type:</Text>
        <Text color="teal" left={6} preSpace>
          {'"Bachelor of Arts"'}
        </Text>
        <Text color="orange" left={24}>
          ,
        </Text>
      </Line>
      <Line indent={4} num={9}>
        <Text color="lightGreen">date:</Text>
        <Text color="yellow" preSpace left={6}>
          new
        </Text>
        <Text color="darkGreen" left={10} preSpace>
          Date
        </Text>
        <Text color="orange" left={14}>
          (
        </Text>
        <Text color="pink" left={15}>
          2013
        </Text>
        <Text color="orange" left={19}>
          ,
        </Text>
        <Text color="pink" preSpace left={21}>
          12
        </Text>
        <Text color="orange" left={23}>
          {"),"}
        </Text>
      </Line>
      <Line indent={2} num={10}>
        <Text color="orange">{"});"}</Text>
      </Line>
      <Line num={11}>
        <Text preSpace />
      </Line>
      <Line indent={2} num={12}>
        <Text color="brown" italic>
          return
        </Text>
        <Text color="orange" left={7} preSpace>
          (
        </Text>
      </Line>
      <Line indent={4} num={13}>
        <Text color="orange">{"<"}</Text>
        <Text color="darkGreen" left={1}>
          FrontEndEngineerII
        </Text>
      </Line>
    </>
  );
}
