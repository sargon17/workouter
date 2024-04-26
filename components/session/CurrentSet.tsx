import React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

import { useState } from "react";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

type HeaderProps = {
  children: React.ReactNode;
};

type BodyProps = {
  children: React.ReactNode | React.ReactNode[];
};

type SetDataProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

type SetDataAdvancedEditorProps = {
  children: React.ReactNode;
  label: string;
  value: number;
  onChange: (value: number) => void;
};

type FooterProps = {
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

function CurrentSetData(props: SetDataProps) {
  return (
    <div className="flex flex-col w-full gap-1 ">
      <SetDataAdvancedEditor
        value={props.value}
        onChange={props.onChange}
        label={props.label}
      >
        <CurrentSetDataItem
          label={props.label}
          value={props.value}
        />
      </SetDataAdvancedEditor>
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

function CurrentSetDataItem(props: Pick<SetDataProps, "label" | "value">) {
  return (
    <p className=" text-4xl font-black flex flex-col justify-center items-center p-4 bg-stone-900 rounded-md">
      {props.value}
      <span className="text-xs font-normal text-stone-500">{props.label}</span>
    </p>
  );
}

function SetDataAdvancedEditor(props: SetDataAdvancedEditorProps) {
  return (
    <Drawer activeSnapPoint={"50%"}>
      <DrawerTrigger>{props.children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Advanced {props.label} Edit</DrawerTitle>
        </DrawerHeader>
        <div className="p-2 flex flex-col gap-1">
          <CurrentSetDataItem
            label={props.label}
            value={props.value}
          />
          <div className="flex gap-1">
            <EditButton
              onClick={() => {
                if (props.value - 10 > 0) {
                  props.onChange(props.value - 10);
                } else {
                  props.onChange(1);
                }
              }}
            >
              -10
            </EditButton>
            <EditButton
              onClick={() => {
                if (props.value - 5 > 0) {
                  props.onChange(props.value - 5);
                } else {
                  props.onChange(1);
                }
              }}
            >
              -5
            </EditButton>
            <EditButton
              onClick={() => {
                if (props.value - 1 > 0) props.onChange(props.value - 1);
              }}
            >
              -1
            </EditButton>
            <EditButton onClick={() => props.onChange(props.value + 1)}>+1</EditButton>
            <EditButton onClick={() => props.onChange(props.value + 5)}>+5</EditButton>
            <EditButton onClick={() => props.onChange(props.value + 10)}>+10</EditButton>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button
              variant={"default"}
              className="w-full"
            >
              Done
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function EditButton(props: { onClick: () => void; children: React.ReactNode }) {
  return (
    <Button
      onClick={props.onClick}
      variant={"secondary"}
      className="w-full"
    >
      {props.children}
    </Button>
  );
}

function CurrentSetFooter(props: FooterProps) {
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
