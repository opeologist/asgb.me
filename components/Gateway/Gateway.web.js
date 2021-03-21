import React, { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";
import styles from "./styles";
import Peek from "../Peek";
import Text from "../Text";
import Content from "../Content";
import Line from "../Line";
import Link from "../Link";

export default function Gateway() {
  const [isPeekVisible, setIsPeekVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isPeekVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [isPeekVisible, fadeAnim]);

  const { heading } = styles();

  return (
    <Content>
      <Line>
        <Text color="orange" style={heading}>
          {"<"}
        </Text>
        <View>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Peek />
          </Animated.View>
          <Link
            style={heading}
            href="/code"
            onHoverIn={() => {
              setIsPeekVisible(true);
            }}
            onHoverOut={() => {
              setIsPeekVisible(false);
            }}
          >
            AGB
          </Link>
        </View>
        <Text color="orange" style={heading}>
          {"\u00A0/>"}
        </Text>
      </Line>
      <Line>
        <Text comment style={heading} />
      </Line>
      <Line>
        <Link type="comment" style={heading} href="mailto:me@agb.engineer">
          email
        </Link>
      </Line>
      <Line>
        <Text comment style={heading} />
      </Line>
      <Line>
        <Link
          type="comment"
          style={heading}
          href="https://www.linkedin.com/in/aarongb"
        >
          linkedin
        </Link>
      </Line>
      <Line>
        <Text comment style={heading} />
      </Line>
      <Line>
        <Link
          type="comment"
          style={heading}
          href="https://github.com/opeologist/opeologist.github.io"
        >
          source
        </Link>
      </Line>
    </Content>
  );
}
