import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/types";
import dayjs from "dayjs";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type PostListItem = Post;

export default function PostList({
  posts,
  showAuthor = true,
  emptyMessage = "No insights available yet.",
  readMoreLabel = "Read more",
}: {
  posts: PostListItem[] | null;
  showAuthor?: boolean;
  emptyMessage?: string;
  readMoreLabel?: string;
}) {
  if (!posts || posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-600">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div>
      {posts.map((post: PostListItem) => (
        <article
          key={post?.slug}
          className="relative grid grid-cols-1 gap-4 border-b border-b-gray-100 py-10 first:border-t first:border-t-gray-200 sm:grid-cols-[12rem_1fr]"
        >
          <div>
            <p className="text-sm text-gray-500">
              {dayjs(post?.publishedAt).format("MMMM D, YYYY")}
            </p>
            {showAuthor && post?.author && (
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
                {readMoreLabel} <ChevronRightIcon className="size-4" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
