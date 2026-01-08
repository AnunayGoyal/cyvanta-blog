import { client } from "@/sanity/lib/client";
import {
  CATEGORIES_QUERY,
  POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  POSTS_BY_CATEGORY_QUERY
} from "@/sanity/lib/queries";

/* -------------------------------------------------------------------------- */
/*                                Categories                                  */
/* -------------------------------------------------------------------------- */

export interface CategoryMeta {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  color: string;
  count?: number;
}

export async function getCategories(): Promise<CategoryMeta[]> {
  return await client.fetch(CATEGORIES_QUERY);
}

/* -------------------------------------------------------------------------- */
/*                                Single Post                                 */
/* -------------------------------------------------------------------------- */

import { draftMode } from "next/headers";
import { token } from "@/sanity/lib/token";

async function getClient() {
  const { isEnabled } = await draftMode();
  if (isEnabled && token) {
    return client.withConfig({ token, useCdn: false, stega: true });
  }
  return client;
}

export async function getPostBySlug(slug: string) {
  return await (await getClient()).fetch(POST_BY_SLUG_QUERY, { slug });
}

/* -------------------------------------------------------------------------- */
/*                             Posts by Category                              */
/* -------------------------------------------------------------------------- */


export type PostTag = string;

export type PostMeta = {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  categorySlug: string;
  tags?: string[];
  skillLevel?: string;
  categoryTitle?: string;
  categoryColor?: string;
  categoryTag?: string;
};

export type FullPostMeta = PostMeta;

export async function getPostsByCategorySlug(categorySlug: string): Promise<PostMeta[]> {
  return await (await getClient()).fetch(POSTS_BY_CATEGORY_QUERY, { slug: categorySlug });
}

/**
 * Returns all posts across all categories with full metadata,
 * ideal for search, filters, and recommendations.
 */
export async function getAllPostsDetailed(): Promise<FullPostMeta[]> {
  return await client.fetch(POSTS_QUERY);
}

/**
 * Get a unique, sorted list of all tags across all posts.
 * Note: Fetching all posts to extract tags is okay for small/medium blogs.
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPostsDetailed();
  const tagSet = new Set<string>();

  for (const post of posts) {
    (post.tags ?? []).forEach((t) => {
      // Ensure t is a string (legacy data might be objects if query fails migration logic)
      if (t && typeof t === 'string') {
        tagSet.add(t);
      }
    });
  }

  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}

/**
 * Get related posts for a given slug based on shared tags + same category.
 * By default, returns up to `limit` posts.
 */
export async function getRelatedPosts(
  slug: string,
  limit: number = 4
): Promise<FullPostMeta[]> {
  const posts = await getAllPostsDetailed();
  const current = posts.find((p) => p.slug === slug);

  if (!current) return [];

  // Create set of current tags for reliable comparison
  const currentTags = new Set((current.tags ?? []));

  // Score other posts
  const scored = posts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;

      // Same category gets a base boost
      if (p.categorySlug === current.categorySlug) score += 2;

      // Shared tags → +1 per tag
      const sharedTags = (p.tags ?? []).filter((t) => currentTags.has(t));
      score += sharedTags.length;

      return { post: p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((x) => x.post);
}

/* -------------------------------------------------------------------------- */
/*                                Authors                                     */
/* -------------------------------------------------------------------------- */

import { AUTHORS_QUERY } from "@/sanity/lib/queries";
import type { Image } from "sanity";

export interface Author {
  name: string;
  slug: string;
  image?: Image;
  staticImage?: string;
  bio?: string;
  profileTag?: string;
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

export async function getAllAuthors(): Promise<Author[]> {
  return await client.fetch(AUTHORS_QUERY);
}

import { AUTHOR_BY_SLUG_QUERY, POSTS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return await client.fetch(AUTHOR_BY_SLUG_QUERY, { slug });
}

export async function getPostsByAuthorSlug(slug: string): Promise<FullPostMeta[]> {
  return await client.fetch(POSTS_BY_AUTHOR_QUERY, { slug });
}
