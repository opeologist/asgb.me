import React from "react";
import { Pressable, View } from "react-native";
import { useRouter } from "next/router";
import styles from "./styles";
import Peek from "../Peek";
import Text from "../Text";
import Content from "../Content";

export default function Gateway() {
  const { push } = useRouter();

  const onPress = () => {
    push("/Aaron.js");
  };

  const { header, heading, underline } = styles();

  return (
    <Content>
      <View style={header}>
        <Text color="orange" style={heading}>{`<`}</Text>
        <View>
          <Peek />
          <Pressable {...{ onPress }}>
            <Text color="blue" style={[heading, underline]}>
              Aaron
            </Text>
          </Pressable>
        </View>
        <Text color="orange" style={heading}>
          {"\u00A0/>"}
        </Text>
      </View>
    </Content>
  );
}
