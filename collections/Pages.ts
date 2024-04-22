import type { CollectionConfig } from "payload/types";

// import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical";

import { Hero } from "./fields/HomeHero";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title"],
    description: "Pages are used to create content for the website.",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "layout", // required
      type: "blocks", // required
      minRows: 1,
      maxRows: 20,
      blocks: [Hero],
    },
  ],
};
