import React from "react";

import configPromise from "@payload-config";
import { getPayload } from "payload";

import HeaderSite from "@/components/HeaderSite";

interface Menu {
  id: number;
  title: string;
  slug: string;
  links: {
    label: string;
    url: string;
  }[];
}

export default async function layout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({
    config: configPromise,
  });

  let menu: Menu | any = await payload.find({
    collection: "menu",
  });

  return (
    <>
      <HeaderSite nav={menu.docs[0].links} />
      {children}
    </>
  );
}
