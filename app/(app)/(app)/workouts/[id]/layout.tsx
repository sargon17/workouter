import Header from "@/components/Header";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function layout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  return (
    <>
      <Header
        title="Details"
        backHref={`/workouts`}
        backText="Workouts"
        actionBtn={
          <Link href={`/session/${params.id}`}>
            <Button
              size="sm"
              variant="default"
            >
              Start
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        }
      />
      {children}
    </>
  );
}
