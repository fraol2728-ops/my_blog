import { EarthGlobeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required().min(5).max(120),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", type: "string", title: "Alternative text" }],
        }),
      ],
    }),
    defineField({
      name: "location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "latitude",
      type: "number",
      validation: (Rule) => Rule.required().min(-90).max(90),
    }),
    defineField({
      name: "longitude",
      type: "number",
      validation: (Rule) => Rule.required().min(-180).max(180),
    }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Government", value: "government" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "capacity",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Installed capacity (e.g., 50kW)",
    }),
    defineField({
      name: "completionStatus",
      type: "string",
      initialValue: "Completed",
      options: {
        list: [
          { title: "Completed", value: "Completed" },
          { title: "In Progress", value: "In Progress" },
          { title: "Planned", value: "Planned" },
        ],
      },
    }),
    defineField({
      name: "isVerified",
      title: "Verified project",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "overview",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(40),
    }),
    defineField({
      name: "challenge",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(40),
    }),
    defineField({
      name: "solution",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(40),
    }),
    defineField({
      name: "beforeImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative text" }],
    }),
    defineField({
      name: "afterImage",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alternative text" }],
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "string",
      description: "YouTube/Vimeo embed URL or public MP4 URL",
    }),
    defineField({
      name: "testimonial",
      type: "object",
      fields: [
        defineField({ name: "quote", type: "text", rows: 3 }),
        defineField({ name: "name", type: "string" }),
        defineField({ name: "role", type: "string" }),
      ],
    }),
    defineField({
      name: "results",
      type: "object",
      fields: [
        defineField({ name: "energyOutput", title: "Energy Output", type: "string" }),
        defineField({ name: "peopleServed", title: "People Served", type: "string" }),
        defineField({ name: "costSavings", title: "Cost Savings", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      location: "location",
      capacity: "capacity",
      media: "mainImage",
      featured: "featured",
      completionStatus: "completionStatus",
      isVerified: "isVerified",
    },
    prepare({ title, location, capacity, media, featured, completionStatus, isVerified }) {
      return {
        title,
        media,
        subtitle: `${featured ? "Featured · " : ""}${isVerified ? "Verified · " : ""}${location} · ${capacity}${completionStatus ? ` · ${completionStatus}` : ""}`,
      };
    },
  },
});
