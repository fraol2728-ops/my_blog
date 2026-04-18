import { defineQuery } from "next-sanity";
import { clientFetch } from "./lib/client";

const FEATURED_POSTS_QUERY =
  defineQuery(`*[_type=='post' && isFeatured==true] | order(publishedAt desc)[0...$quantity]{
    title,
    'slug':slug.current,
    publishedAt,
    "updatedAt": _updatedAt,
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
  "updatedAt": _updatedAt,
  mainImage,
  excerpt,
  seo,
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
  "updatedAt": _updatedAt,
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
  "updatedAt": _updatedAt,
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
      || seo.metaTitle match $searchPattern
      || seo.metaDescription match $searchPattern
      || count(seo.keywords[@ match $searchPattern]) > 0
      || author->name match $searchPattern
      || count(categories[]->title[@ match $searchPattern]) > 0
    ),
    true
  )
]|order(publishedAt desc)[0...$quantity]{
  title,
  "slug": slug.current,
  publishedAt,
  "updatedAt": _updatedAt,
  mainImage,
  excerpt,
  seo,
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
  "updatedAt": _updatedAt,
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

const FEASIBILITY_POSTS_QUERY = defineQuery(`*[_type == "feasibilityPost"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  mainImage,
  gallery,
  shortDescription,
  content,
  category,
  publishedAt,
  isFeatured
}`);

export const getFeasibilityPosts = async () => {
  return await clientFetch({
    query: FEASIBILITY_POSTS_QUERY,
    tags: ["feasibility-post"],
  });
};

const FEATURED_FEASIBILITY_POSTS_QUERY = defineQuery(`*[_type == "feasibilityPost" && isFeatured == true] | order(publishedAt desc)[0...$quantity]{
  _id,
  title,
  "slug": slug.current,
  mainImage,
  gallery,
  shortDescription,
  content,
  category,
  publishedAt,
  isFeatured
}`);

export const getFeaturedFeasibilityPosts = async (quantity = 3) => {
  return await clientFetch({
    query: FEATURED_FEASIBILITY_POSTS_QUERY,
    params: { quantity },
    tags: ["feasibility-post"],
  });
};

const FEASIBILITY_POST_BY_SLUG_QUERY = defineQuery(`*[_type == "feasibilityPost" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  mainImage,
  gallery,
  shortDescription,
  content,
  category,
  publishedAt,
  isFeatured
}`);

export const getFeasibilityPostBySlug = async (slug: string) => {
  return await clientFetch({
    query: FEASIBILITY_POST_BY_SLUG_QUERY,
    params: { slug },
    tags: ["feasibility-post"],
  });
};

const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(date desc){
  _id,
  title,
  "slug": slug.current,
  mainImage,
  gallery,
  location,
  category,
  featured,
  capacity,
  date,
  overview,
  challenge,
  solution,
  body,
  results,
  latitude,
  longitude,
  beforeImage,
  afterImage,
  videoUrl,
  testimonial,
  isVerified,
  completionStatus
}`);

export const getProjects = async () => {
  return await clientFetch({
    query: PROJECTS_QUERY,
    tags: ["project"],
  });
};

const FEATURED_PROJECTS_QUERY = defineQuery(`*[_type == "project" && featured == true] | order(date desc)[0...$quantity]{
  _id,
  title,
  "slug": slug.current,
  mainImage,
  gallery,
  location,
  category,
  featured,
  capacity,
  date,
  overview,
  challenge,
  solution,
  body,
  results,
  latitude,
  longitude,
  beforeImage,
  afterImage,
  videoUrl,
  testimonial,
  isVerified,
  completionStatus
}`);

export const getFeaturedProjects = async (quantity = 3) => {
  return await clientFetch({
    query: FEATURED_PROJECTS_QUERY,
    params: { quantity },
    tags: ["project"],
  });
};

const PROJECT_BY_SLUG_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  mainImage,
  gallery,
  location,
  category,
  featured,
  capacity,
  date,
  overview,
  challenge,
  solution,
  body,
  results,
  latitude,
  longitude,
  beforeImage,
  afterImage,
  videoUrl,
  testimonial,
  isVerified,
  completionStatus
}`);

export const getProjectBySlug = async (slug: string) => {
  return await clientFetch({
    query: PROJECT_BY_SLUG_QUERY,
    params: { slug },
    tags: ["project"],
  });
};

const PROJECT_SLUGS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`);

export const getProjectSlugs = async () => {
  return await clientFetch({
    query: PROJECT_SLUGS_QUERY,
    tags: ["project"],
  });
};
