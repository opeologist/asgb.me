import React from "react";
import Line from "../../Line";
import Text from "../../Text";

export default function TopOfExport() {
  return (
    <>
      <Line num={5}>
        <Text color="transparent">.</Text>
        <Text color="brown" italic>
          export default
        </Text>
        <Text color="brown" preSpace>
          function
        </Text>
        <Text color="green" preSpace>
          Aaron
        </Text>
        <Text color="orange">{"() {"}</Text>
      </Line>
      <Line indent={2} num={6}>
        <Text color="transparent">.</Text>
        <Text color="brown">const</Text>
        <Text color="orange" preSpace>
          [
        </Text>
        <Text color="lightGreen">education</Text>
        <Text color="orange">] =</Text>
        <Text color="green" preSpace>
          useDegree
        </Text>
        <Text color="orange">{"({"}</Text>
      </Line>
      <Line indent={4} num={7}>
        <Text color="transparent">.</Text>
        <Text color="lightGreen">name:</Text>
        <Text color="teal" preSpace>
          {'"Digital Interactive Systems"'}
        </Text>
        <Text color="orange">,</Text>
      </Line>
      <Line indent={4} num={8}>
        <Text color="transparent">.</Text>
        <Text color="lightGreen">type:</Text>
        <Text color="teal" preSpace>
          {'"Bachelor of Arts"'}
        </Text>
        <Text color="orange">,</Text>
      </Line>
      <Line indent={4} num={9}>
        <Text color="transparent">.</Text>
        <Text color="lightGreen">date:</Text>
        <Text color="yellow" preSpace>
          new
        </Text>
        <Text color="darkGreen" preSpace>
          Date
        </Text>
        <Text color="orange">(</Text>
        <Text color="pink">2013</Text>
        <Text color="orange">,</Text>
        <Text color="pink" preSpace>
          12
        </Text>
        <Text color="orange">{"),"}</Text>
      </Line>
      <Line indent={2} num={10}>
        <Text color="transparent">.</Text>
        <Text color="orange">{"});"}</Text>
      </Line>
      <Line num={11}>
        <Text color="transparent">.</Text>
        <Text preSpace />
      </Line>
      <Line indent={2} num={12}>
        <Text color="transparent">.</Text>
        <Text color="brown" italic>
          return
        </Text>
        <Text color="orange" preSpace>
          (
        </Text>
      </Line>
      <Line indent={4} num={13}>
        <Text color="transparent">.</Text>
        <Text color="orange">{"<"}</Text>
        <Text color="darkGreen">FrontEndEngineerII</Text>
      </Line>
    </>
  );
}
