import type { Metadata } from "next";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";
import { clientFetch } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import dayjs from "dayjs";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

const LEADS_QUERY = defineQuery(`*[_type == "lead"] | order(submittedAt desc)[0...100]{
  _id,
  fullName,
  email,
  phone,
  service,
  status,
  source,
  submittedAt
}`);

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const leads = await clientFetch({ query: LEADS_QUERY });

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-green-700">Admin Dashboard</p>
          <h1 className="text-3xl font-bold text-gray-900">Revenue Pipeline</h1>
        </div>
        <div className="flex gap-3">
          <Link
            href="/studio"
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700"
          >
            Manage CMS
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Total Leads</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{leads.length}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">New Leads</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {leads.filter((lead: { status: string }) => lead.status === "new").length}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Qualified + Closed</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {
              leads.filter((lead: { status: string }) =>
                ["qualified", "closed"].includes(lead.status),
              ).length
            }
          </p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(
              (lead: {
                _id: string;
                fullName: string;
                email: string;
                phone: string;
                service: string;
                status: string;
                source: string;
                submittedAt: string;
              }) => (
                <tr key={lead._id} className="border-t border-gray-100">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">{lead.fullName}</p>
                    <p className="text-gray-500">{lead.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{lead.service}</td>
                  <td className="px-4 py-3 text-gray-700">{lead.status}</td>
                  <td className="px-4 py-3 text-gray-700">{lead.source}</td>
                  <td className="px-4 py-3 text-gray-700">
                    {dayjs(lead.submittedAt).format("MMM D, YYYY h:mm A")}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DashboardPage;
