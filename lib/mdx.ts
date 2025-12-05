import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

// Helper to find all MDX files recursively
function getAllMdxFiles(dir: string, fileList: string[] = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllMdxFiles(filePath, fileList);
    } else {
      if (file.endsWith(".mdx")) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  
  // 1. Scan the file system
  const allFiles = getAllMdxFiles(contentDirectory);
  
  // 2. Debug Log: Look at your terminal to see this list!
  console.log(`\n🔍 Scanning for slug: [${realSlug}]`);
  console.log("📂 Files found in content folder:");
  allFiles.forEach(f => console.log(`   - ${path.basename(f)}`));

  // 3. Find the matching file
  const matchedPath = allFiles.find((filePath) => {
    const fileName = path.basename(filePath, ".mdx");
    return fileName === realSlug;
  });

  if (!matchedPath) {
    console.log("❌ File NOT found.");
    return null;
  }

  console.log(`✅ File FOUND at: ${matchedPath}`);

  const fileContents = fs.readFileSync(matchedPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: data,
    content,
  };
}

export function getAllPosts() {
  const allFiles = getAllMdxFiles(contentDirectory);
  
  return allFiles.map((filePath) => {
    const slug = path.basename(filePath, ".mdx");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      frontmatter: data,
    };
  });
}