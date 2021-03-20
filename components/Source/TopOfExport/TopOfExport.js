import React from "react";
import Line from "../../Line";
import Text from "../../Text";

export default function TopOfExport() {
  return (
    <>
      <Line>
        <Text color="brown" italic spaceAtEnd>
          export default
        </Text>
        <Text color="brown" spaceAtEnd>
          function
        </Text>
        <Text color="green">Aaron</Text>
        <Text color="orange">{"() {"}</Text>
      </Line>
      <Line indent={2}>
        <Text color="brown" spaceAtEnd>
          const
        </Text>
        <Text color="orange">[</Text>
        <Text color="lightGreen">education</Text>
        <Text color="orange" spaceAtEnd>
          ] =
        </Text>
        <Text color="green">useDegree</Text>
        <Text color="orange">{"({"}</Text>
      </Line>
      <Line indent={4}>
        <Text color="lightGreen" spaceAtEnd>
          name:
        </Text>
        <Text color="teal">{`"Digital Interactive Systems"`}</Text>
        <Text color="orange">,</Text>
      </Line>
      <Line indent={4}>
        <Text color="lightGreen" spaceAtEnd>
          type:
        </Text>
        <Text color="teal">{`"Bachelor of Arts"`}</Text>
        <Text color="orange">,</Text>
      </Line>
      <Line indent={4}>
        <Text color="lightGreen" spaceAtEnd>
          year:
        </Text>
        <Text color="pink">2013</Text>
        <Text color="orange">,</Text>
      </Line>
      <Line indent={2}>
        <Text color="orange">{"});"}</Text>
      </Line>
      <Line>
        <Text spaceAtEnd />
      </Line>
      <Line indent={2}>
        <Text color="brown" italic spaceAtEnd>
          return
        </Text>
        <Text color="orange">(</Text>
      </Line>
      <Line indent={4}>
        <Text color="orange">{"<"}</Text>
        <Text color="darkGreen">FrontEndEngineerII</Text>
      </Line>
    </>
  );
}
