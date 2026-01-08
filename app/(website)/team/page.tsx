import type { Metadata } from "next";
import ActivityHeatmap from "@/components/ActivityHeatmap";
import AuthorCard from "@/components/AuthorCard";
import { getAllAuthors } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Team | Cyvanta",
  description: "Meet the Core Operatives behind Cyvanta.",
};

export default async function TeamPage() {
  const authors = await getAllAuthors();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 font-mono">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-l-2 border-primary pl-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            CORE_OPERATIVES
          </h1>
          <p className="text-muted text-lg">
            // The minds behind the code.
          </p>
        </div>

        {/* Heatmap Section */}
        <div className="w-full bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
            <div className="text-xs font-mono text-emerald-500 mb-6 tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                [ Global Contribution Graph ]
            </div>
            <ActivityHeatmap />
        </div>

        {/* Our Contributors Section */}
         <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-border/50"></div>
                <h2 className="text-2xl font-mono font-bold text-foreground uppercase tracking-wider">
                    ACTIVE AGENTS
                </h2>
                <div className="h-px flex-1 bg-border/50"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Fallback if no authors */}
                {authors.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground font-mono">
                        No operatives found in the database.
                    </div>
                )}
                
                {authors.map((author) => (
                    <AuthorCard key={author.slug} author={author} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
