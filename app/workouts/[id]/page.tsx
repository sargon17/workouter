import React from "react";

import Header from "@/components/Header";

import { Button } from "@/components/ui/button";

interface PageProps {
  params: {
    id: string;
  };
}

export default function page({ params }: PageProps) {
  return (
    <div className="w-full">
      <Header>
        <Button variant="outline">Add Exercise</Button>
      </Header>
      <div className="p-4">{params.id}</div>
    </div>
  );
}
