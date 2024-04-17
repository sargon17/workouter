import React from "react";
import Header from "../../../components/Header";
import Body from "../../../components/Body";
import Settings from "@/pages/Settings";

export default async function page() {
  return (
    <>
      <Header title="settings" />
      <Body>
        <Settings />
      </Body>
    </>
  );
}
