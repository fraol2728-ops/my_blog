import Link from "next/link";

export default async function HtmlSitemap({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const pages = ["", "/about", "/services", "/projects", "/news", "/contact", "/kilimanjaro", "/blog"];
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold">HTML Sitemap</h1>
      <ul className="mt-8 space-y-3">
        {pages.map((path) => (
          <li key={path || "home"}>
            <Link className="text-emerald-700 underline" href={`/${locale}${path}`}>
              https://www.masterpremier.energy/{locale}{path}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
