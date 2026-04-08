import type { TypedObject } from "sanity";

export interface PostSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export interface PostImage {
  alt?: string;
  [key: string]: unknown;
}

export interface PostAuthor {
  name: string;
  image: PostImage | null;
}

export interface PostCategory {
  title: string;
  slug: string;
}

export interface Post {
  slug: string;
  title: string;
  mainImage: PostImage | null;
  author: PostAuthor;
  categories: string[] | PostCategory[];
  publishedAt: string;
  description: string;
  excerpt?: string;
  body?: TypedObject[] | null;
  seo?: PostSeo;
}

