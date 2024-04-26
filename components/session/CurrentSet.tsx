import React from "react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

type HeaderProps = {
  children: React.ReactNode;
};

type BodyProps = {
  children: React.ReactNode | React.ReactNode[];
};

type SetData = { label: string; value: number; onChange: (value: number) => void };

type Footer = {
  children: React.ReactNode | React.ReactNode[];
  onClick: () => void;
};

function CurrentSet(props: Props) {
  return <div className="border border-stone-900 rounded-xl p-2 mt-2">{props.children}</div>;
}

function CurrentSetHeader(props: HeaderProps) {
  return <h3 className="text-center font-bold text-lg p-2">{props.children}</h3>;
}

function CurrentSetBody(props: BodyProps) {
  return <div className="flex justify-center items-center gap-2 font-black">{props.children}</div>;
}

function CurrentSetData(props: SetData) {
  return (
    <div className="flex flex-col w-full gap-1 ">
      <p className=" text-4xl font-black flex flex-col justify-center items-center p-4 bg-stone-900 rounded-md">
        {props.value}
        <span className="text-xs font-normal text-stone-500">{props.label}</span>
      </p>
      <div className="flex gap-1">
        <Button
          onClick={() => {
            if (props.value - 1 > 0) props.onChange(props.value - 1);
          }}
          variant={"secondary"}
          className="w-full"
        >
          -
        </Button>
        <Button
          onClick={() => props.onChange(props.value + 1)}
          variant={"secondary"}
          className="w-full"
        >
          +
        </Button>
      </div>
    </div>
  );
}

function CurrentSetFooter(props: Footer) {
  return (
    <div className=" flex w-full justify-start items-center gap-2 mt-4">
      <Button
        onClick={() => props.onClick()}
        variant={"default"}
        className="w-full bg-lime-500 hover:bg-lime-700 text-lime-50"
      >
        {props.children}
      </Button>
    </div>
  );
}

export { CurrentSet, CurrentSetHeader, CurrentSetBody, CurrentSetData, CurrentSetFooter };
