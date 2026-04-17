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
  updatedAt?: string;
  description: string;
  excerpt?: string;
  body?: TypedObject[] | null;
  seo?: PostSeo;
}


export type ProjectCategory = "residential" | "commercial" | "government";

export interface ProjectImage {
  alt?: string;
  [key: string]: unknown;
}

export interface ProjectResultMetrics {
  energyOutput?: string;
  peopleServed?: string;
  costSavings?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  mainImage: ProjectImage | null;
  gallery?: ProjectImage[];
  location: string;
  category: ProjectCategory;
  featured?: boolean;
  capacity: string;
  date: string;
  overview: string;
  challenge: string;
  solution: string;
  results?: ProjectResultMetrics;
}
