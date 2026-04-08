import { defineField, defineType } from "sanity";

export const leadType = defineType({
  name: "lead",
  title: "Leads",
  type: "document",
  fields: [
    defineField({ name: "fullName", title: "Full Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "email", title: "Email", type: "string", validation: (Rule) => Rule.required().email() }),
    defineField({ name: "phone", title: "Phone", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "service", title: "Service", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "budget", title: "Budget", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text", validation: (Rule) => Rule.required() }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["new", "contacted", "qualified", "closed"],
      },
      initialValue: "new",
    }),
    defineField({ name: "source", title: "Source", type: "string", initialValue: "website-contact-form" }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime" }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "email",
      status: "status",
    },
    prepare({ title, subtitle, status }) {
      return {
        title,
        subtitle: `${subtitle} • ${status ?? "new"}`,
      };
    },
  },
});
