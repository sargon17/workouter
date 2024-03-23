import React from "react";

import Header from "@/components/Header";

import { Button } from "@/components/ui/button";

export default function page({ params } = { params: { id: "" } }) {
  return (
    <div className="w-full">
      <Header>
        <Button variant="outline">Add Exercise</Button>
      </Header>
      {params.id}
    </div>
  );
}
