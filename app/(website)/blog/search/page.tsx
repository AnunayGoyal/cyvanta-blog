import { getAllPostsDetailed } from "@/lib/mdx";
import BlogExplorer from "@/components/BlogExplorer";

export const metadata = {
  title: "Cyvanta | Search",
};

export default async function BlogSearchPage() {
  const posts = await getAllPostsDetailed();

  return (
    <main className="min-h-screen w-full px-4 py-10 md:py-16 flex justify-center">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <header className="mb-8 border-b border-white/10 pb-5">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-gray-500 mb-2">
            INTELLIGENCE INDEX
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Search &amp; Filter All Cyvanta Research
          </h1>
          <p className="text-sm text-gray-400 max-w-2xl">
            Query across all categories, tags, and protocols to find the exact
            research you need.
          </p>
        </header>

        <BlogExplorer posts={posts} />
      </div>
    </main>
  );
}
