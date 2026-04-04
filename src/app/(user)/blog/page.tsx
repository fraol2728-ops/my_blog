import Container from "@/components/container";
import { urlFor } from "@/sanity/lib/image";
import { getAllPosts } from "@/sanity/queries";
import dayjs from "dayjs";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await getAllPosts(12);

  return (
    <div className="overflow-hidden pb-24">
      <Container className="mt-16">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          SolarPeak Blog
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight text-gray-950 sm:text-6xl">
          Latest News & Insights
        </h1>
        <p className="mt-6 max-w-3xl text-base text-gray-600 sm:text-lg">
          Explore industry trends, practical solar guidance, and project
          highlights from our team.
        </p>

        {posts?.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-600">
            No insights available yet.
          </div>
        ) : (
          <div className="mt-10">
            {posts?.map((post) => (
              <article
                key={post?.slug}
                className="relative grid grid-cols-1 gap-4 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 sm:grid-cols-[12rem_1fr]"
              >
                <div>
                  <p className="text-sm text-gray-500">
                    {dayjs(post?.publishedAt).format("MMMM D, YYYY")}
                  </p>
                  {post?.author && (
                    <div className="mt-2.5 flex items-center gap-2">
                      {post?.author?.image && (
                        <Image
                          src={urlFor(post?.author?.image).url()}
                          alt="authorImage"
                          width={50}
                          height={50}
                          className="size-6 rounded-full object-cover"
                        />
                      )}
                      <p className="text-sm text-gray-700">{post?.author?.name}</p>
                    </div>
                  )}
                </div>
                <div>
                  {post?.mainImage && (
                    <Image
                      src={urlFor(post?.mainImage).url()}
                      alt={post?.title || "post image"}
                      width={900}
                      height={500}
                      className="mb-4 h-44 w-full rounded-2xl object-cover"
                    />
                  )}
                  <h2 className="text-xl font-medium text-gray-950">{post?.title}</h2>
                  <p className="mt-3 text-sm text-gray-600">{post?.excerpt}</p>
                  <div className="mt-4">
                    <Link
                      href={`/post/${post?.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700"
                    >
                      Read more <ChevronRightIcon className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
