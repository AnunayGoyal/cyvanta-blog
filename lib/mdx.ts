import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Point to the 'content' folder at the root of your project
const contentDirectory = path.join(process.cwd(), 'content');

export function getPostSlugs() {
  return fs.readdirSync(contentDirectory);
}

export function getPostBySlug(slug: string) {
  // Remove ".mdx" from file name to get the slug
  const realSlug = slug.replace(/\.mdx$/, '');
  
  // Find the file
  const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Parse the metadata (frontmatter) and content
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data,
    content,
  };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => getPostBySlug(slug));
  
  // Sort posts by date in descending order (Newest first)
  return posts.sort((post1: any, post2: any) => (post1.meta.date > post2.meta.date ? -1 : 1));
}