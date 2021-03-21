import React from "react";
import Page from "../components/Page";
import Gateway from "../components/Gateway";

export default function AGB({ navigation }) {
  return (
    <Page>
      <Gateway {...{ navigation }} />
    </Page>
  );
}
