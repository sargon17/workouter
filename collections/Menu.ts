import type { CollectionConfig } from "payload/types";

export const Menu: CollectionConfig = {
  slug: "menu",
  labels: {
    singular: "Menu",
    plural: "Menus",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title"],
    description: "Menus are used to create navigation links for the website.",
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
      name: "links", // required
      type: "array",
      minRows: 1,
      maxRows: 20,
      fields: [
        {
          name: "label",
          label: "Label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          label: "URL",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
