import React from "react";

export default function HomeFeatures() {
  return (
    <div className="w-full h-[200lvh] mt-32">
      <div>
        <h2 className="text-2xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-stone-400 via-stone-50 to-stone-800 mb-2">
          Single place for all your gym needs
        </h2>
        <p className="text-stone-300 font-medium">
          Track your progress, set goals, and more... now it's easy{" "}
        </p>
      </div>
      <div className=" grid gap-2 grid-cols-12">
        <div className=" col-start-1 col-end-6">
          <Card>Feature 1</Card>
        </div>
        <Card>Feature 2</Card>
        <Card>Feature 3</Card>
      </div>
    </div>
  );
}

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full p-4 border border-stone-900 rounded min-h-10">{children}</div>;
};
