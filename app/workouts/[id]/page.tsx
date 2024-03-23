import React from "react";

import { Plus } from "lucide-react";

import Header from "@/components/Header";

import { Button } from "@/components/ui/button";

import WorkoutDetails from "@/components/workout/WorkoutDetails";

interface PageProps {
  params: {
    id: string;
  };
}

export default function page({ params }: PageProps) {
  return (
    <div className="w-full">
      <Header>
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </Header>
      <div className="p-4">
        <WorkoutDetails id={params.id} />
      </div>
    </div>
  );
}
