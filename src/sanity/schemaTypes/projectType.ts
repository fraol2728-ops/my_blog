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
      fields: [{ name: "alt", type: "string", title: "Alternative text" }],
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
      name: "projectType",
      title: "Project Type",
      type: "string",
      options: {
        list: [
          { title: "Residential", value: "residential" },
          { title: "Commercial", value: "commercial" },
          { title: "Government", value: "government" },
          { title: "Industrial", value: "industrial" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "capacity",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Installed capacity (e.g., 10kW)",
    }),
    defineField({
      name: "year",
      type: "string",
      description: "Completion year (e.g., 2026)",
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
      name: "results",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required().min(20),
    }),

    defineField({
      name: "body",
      title: "Optional Rich Body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
          ],
          lists: [{ title: "Bullet", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),

    defineField({
      name: "stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "value", type: "string", validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
      validation: (Rule) => Rule.max(6),
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),

    // Legacy support fields for existing project listing + map features.
    defineField({
      name: "latitude",
      type: "number",
      validation: (Rule) => Rule.min(-90).max(90),
    }),
    defineField({
      name: "longitude",
      type: "number",
      validation: (Rule) => Rule.min(-180).max(180),
    }),
    defineField({
      name: "date",
      type: "date",
      description: "Legacy date field used by existing listing schema markup.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      location: "location",
      capacity: "capacity",
      media: "mainImage",
      featured: "featured",
      projectType: "projectType",
      year: "year",
    },
    prepare({ title, location, capacity, media, featured, projectType, year }) {
      return {
        title,
        media,
        subtitle: `${featured ? "Featured · " : ""}${projectType ?? "project"} · ${location} · ${capacity}${year ? ` · ${year}` : ""}`,
      };
    },
  },
});
