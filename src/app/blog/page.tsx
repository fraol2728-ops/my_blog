import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solar Energy Blog South Sudan",
  description:
    "Insights, project updates, and practical guidance on solar energy, off-grid systems, and clean power adoption in South Sudan.",
};

const posts = [
  {
    slug: "how-off-grid-solar-supports-homes-in-juba",
    title: "How Off-Grid Solar Supports Homes in Juba",
    excerpt: "Learn how off-grid solar systems improve daily life and lower energy costs for families in Juba.",
  },
  {
    slug: "solar-installation-checklist-south-sudan",
    title: "Solar Installation Checklist for South Sudan",
    excerpt: "A practical checklist for planning a safe, efficient, and scalable solar installation project.",
  },
  {
    slug: "solar-maintenance-best-practices",
    title: "Solar Maintenance Best Practices",
    excerpt: "Key maintenance steps to protect system performance in hot and dusty operating environments.",
  },
];

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold">Solar Energy Blog South Sudan</h1>
      <p className="mt-4 text-gray-700">
        Explore expert articles from Master Premier Green Energy on solar installation, off-grid systems, and renewable energy in South Sudan.
      </p>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <p className="mt-3 text-gray-700">{post.excerpt}</p>
            <p className="mt-4 text-sm font-medium text-green-700">/{post.slug}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
