import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { useRouter } from "next/router";
import styles from "./styles";
import Peek from "../Peek";
import Text from "../Text";
import Content from "../Content";

export default function Gateway() {
  const [isHoveringHeader, setIsHoveringHeader] = useState(false);
  const router = useRouter();

  const { header, heading, underline } = styles();

  return (
    <Content>
      <View style={header}>
        <Text color="orange" style={heading}>{`<`}</Text>
        <View>
          <Peek />
          <Pressable
            onPress={() => {
              router.push("/Aaron.js");
            }}
            onHoverIn={() => {
              setIsHoveringHeader(true);
            }}
            onHoverOut={() => {
              setIsHoveringHeader(false);
            }}
          >
            <Text color="blue" style={[heading, underline]}>
              Aaron
            </Text>
          </Pressable>
        </View>
        <Text color="orange" style={heading}>
          {"\u00A0"}/>
        </Text>
      </View>
    </Content>
  );
}
