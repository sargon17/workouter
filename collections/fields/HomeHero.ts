import { Block } from "payload/types";

export const Hero: Block = {
  slug: "Hero", // required
  //   imageURL: "https://google.com/path/to/image.jpg",
  imageAltText: "Hero Image for the homepage",
  interfaceName: "Hero Block",
  fields: [
    {
      name: "version",
      label: "Version",
      type: "text",
      required: true,
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "subtitle",
      label: "Subtitle",
      type: "text",
    },
    {
      name: "ctaLabel",
      label: "CTA Label",
      type: "text",
    },
  ],
};
