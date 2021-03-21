import React from "react";
import Page from "../components/Page";
import Source from "../components/Source";

export default function Code({ navigation }) {
  return (
    <Page>
      <Source {...{ navigation }} />
    </Page>
  );
}
