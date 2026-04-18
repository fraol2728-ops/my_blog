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

export type ProjectCategory = "residential" | "commercial" | "government" | "industrial";

export interface ProjectImage {
  alt?: string;
  [key: string]: unknown;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  mainImage: ProjectImage | null;
  gallery?: ProjectImage[];
  location: string;
  projectType: ProjectCategory | string;
  category?: ProjectCategory | string;
  featured?: boolean;
  capacity: string;
  year?: string;
  date?: string;
  overview: string;
  challenge: string;
  solution: string;
  results: string;
  body?: TypedObject[] | null;
  stats?: ProjectStat[];
  latitude?: number;
  longitude?: number;
  isVerified?: boolean;
  completionStatus?: string;
}

export interface FeasibilityPost {
  _id: string;
  title: string;
  slug: string;
  mainImage: PostImage | null;
  gallery?: PostImage[];
  shortDescription: string;
  content?: TypedObject[] | null;
  category: string;
  publishedAt: string;
  isFeatured?: boolean;
}
