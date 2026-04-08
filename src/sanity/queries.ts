import { defineQuery } from "next-sanity";
import { clientFetch } from "./lib/client";

const FEATURED_POSTS_QUERY =
  defineQuery(`*[_type=='post' && isFeatured==true] | order(publishedAt desc)[0...$quantity]{
    title,
    'slug':slug.current,
    publishedAt,
    mainImage,
    excerpt,
    author->{
        name, image
    }
}`);

export const getFeaturedPosts = async (quantity: number) => {
  return await clientFetch({
    query: FEATURED_POSTS_QUERY,
    params: { quantity },
  });
};

const ALL_POSTS_QUERY = defineQuery(`*[
  _type == "post"
]|order(publishedAt desc)[0...$quantity]{
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt,
  categories[]->{
    title,
    "slug": slug.current,
  },
  author->{
    name,
    image,
  },
}`);

export const getAllPosts = async (quantity: number) => {
  return await clientFetch({
    query: ALL_POSTS_QUERY,
    params: { quantity },
  });
};

const CATEGORIES_QUERY = defineQuery(`*[_type=='category']|order(title asc){
  title,
  "slug":slug.current
}`);

export const getCategories = async () => {
  return await clientFetch({
    query: CATEGORIES_QUERY,
  });
};

const POST_QUERY = defineQuery(`*[_type=='post' && slug.current == $slug][0]{
   publishedAt,
  title,
  mainImage,
  excerpt,
  body,
  seo,
  _id,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  },
  "comments": *[_type == "comment" && post._ref == ^._id && approved == true]{
    name,
    email,
    comment,
    image,
    _id
  }
}`);

export const getPost = async (slug: string) => {
  return await clientFetch({
    query: POST_QUERY,
    params: { slug },
  });
};

const CATEGORY_POST = defineQuery(`*[
  _type == "post"
  && select(defined($category) => $category in categories[]->slug.current, true)
]|order(publishedAt desc){
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt,
  author->{
    name,
    image,
  },
}`);
export const getCategoryPost = async (category?: string) => {
  return await clientFetch({
    query: CATEGORY_POST,
    params: category ? { category } : {},
  });
};

const FILTERED_POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && select(defined($category) => $category in categories[]->slug.current, true)
  && select(
    defined($keyword) => (
      title match $searchPattern
      || excerpt match $searchPattern
      || pt::text(body) match $searchPattern
    ),
    true
  )
]|order(publishedAt desc)[0...$quantity]{
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt,
  categories[]->{
    title,
    "slug": slug.current,
  },
  author->{
    name,
    image,
  },
}`);

export const getFilteredPosts = async ({
  category,
  keyword,
  quantity = 24,
}: {
  category?: string;
  keyword?: string;
  quantity?: number;
}) => {
  const normalizedKeyword = keyword?.trim();

  return await clientFetch({
    query: FILTERED_POSTS_QUERY,
    params: {
      ...(category ? { category } : {}),
      ...(normalizedKeyword
        ? {
            keyword: normalizedKeyword,
            searchPattern: `*${normalizedKeyword}*`,
          }
        : {}),
      quantity,
    },
  });
};

const GET_OTHERS_POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && defined(slug.current)
  && slug.current != $currentSlug
]|order(publishedAt desc)[0...$quantity]{
  publishedAt,
  title,
  mainImage,
  excerpt,
  body,
  slug,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}`);

export const getOtherPosts = async (currentSlug: string, quantity: number) => {
  return await clientFetch({
    query: GET_OTHERS_POSTS_QUERY,
    params: { currentSlug, quantity },
  });
};
