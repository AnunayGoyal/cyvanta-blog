import { getAuthorBySlug, getPostsByAuthorSlug } from "@/lib/mdx";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return { title: "Author Not Found" };
  return {
    title: `${author.name} | Cyvanta`,
    description: author.bio || `Articles written by ${author.name}`,
  };
}

export default async function AuthorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  const posts = await getPostsByAuthorSlug(slug);

  if (!author) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full relative pt-32 px-4 pb-20 font-mono">
       <div className="max-w-4xl mx-auto">
          
          {/* Author Header */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
             <div className="relative h-64 w-64 flex-shrink-0 overflow-hidden rounded-full border-4 border-emerald-500/20 shadow-2xl bg-black">
                 {author.image ? (
                    <Image
                      src={urlFor(author.image).width(600).height(600).url()}
                      alt={author.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : author.staticImage ? (
                    <Image
                      src={`/avatars/${author.staticImage}`}
                      alt={author.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground text-6xl select-none">?</div>
                  )}
             </div>

             <div className="flex-1 text-center md:text-left space-y-4">
                 <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
                    {author.name}
                 </h1>
                 <p className="text-sm text-emerald-500 uppercase tracking-widest font-bold">
                    [ {author.profileTag || 'Core Contributor'} ]
                 </p>
                 {author.bio && (
                     <p className="text-muted-foreground max-w-xl leading-relaxed">
                         {author.bio}
                     </p>
                 )}
                 <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                     {author.website && (
                         <Link 
                           href={author.website} 
                           target="_blank" 
                           className="flex items-center justify-center h-10 w-10 border border-border rounded-full hover:bg-emerald-500/10 hover:border-emerald-500 hover:text-emerald-500 transition-all text-muted-foreground"
                           aria-label="Website"
                         >
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                         </Link>
                     )}
                     {author.github && (
                         <Link 
                           href={author.github} 
                           target="_blank" 
                           className="flex items-center justify-center h-10 w-10 border border-border rounded-full hover:bg-emerald-500/10 hover:border-emerald-500 hover:text-emerald-500 transition-all text-muted-foreground"
                           aria-label="GitHub Profile"
                         >
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                         </Link>
                     )}
                     {author.twitter && (
                         <Link 
                           href={author.twitter} 
                           target="_blank" 
                           className="flex items-center justify-center h-10 w-10 border border-border rounded-full hover:bg-emerald-500/10 hover:border-emerald-500 hover:text-emerald-500 transition-all text-muted-foreground"
                           aria-label="X (Twitter) Profile"
                         >
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                         </Link>
                     )}
                     {author.linkedin && (
                         <Link 
                           href={author.linkedin} 
                           target="_blank" 
                           className="flex items-center justify-center h-10 w-10 border border-border rounded-full hover:bg-emerald-500/10 hover:border-emerald-500 hover:text-emerald-500 transition-all text-muted-foreground"
                           aria-label="LinkedIn Profile"
                         >
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                             </svg>
                         </Link>
                     )}
                     {author.instagram && (
                         <Link 
                           href={author.instagram} 
                           target="_blank" 
                           className="flex items-center justify-center h-10 w-10 border border-border rounded-full hover:bg-emerald-500/10 hover:border-emerald-500 hover:text-emerald-500 transition-all text-muted-foreground"
                           aria-label="Instagram Profile"
                         >
                             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                             </svg>
                         </Link>
                     )}
                 </div>
             </div>
          </div>

          <div className="w-full h-px bg-border/50 mb-12"></div>

          {/* Posts Grid */}
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="text-emerald-500">&gt;</span> AUTHORED_LOGS
              <span className="text-muted-foreground text-sm font-normal ml-2">({posts.length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.length === 0 && (
                  <div className="col-span-full py-12 text-center text-muted-foreground">
                      No logs found for this operative.
                  </div>
              )}

              {posts.map((post) => {
                  if (!post || !post.slug) return null; // Safe check
                  const dateString = post.date ? new Date(post.date).toLocaleDateString() : "Unknown Date";

                  return (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="group relative block p-6 border border-border/50 rounded-lg bg-card/20 hover:bg-card/40 transition-all hover:border-emerald-500/50">
                      <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span>{dateString}</span>
                              <span className="text-emerald-500">{post.categoryTitle || 'Uncategorized'}</span>
                          </div>
                          <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors">
                              {post.title}
                          </h3>
                          {post.summary && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                  {post.summary}
                              </p>
                          )}
                          <div className="pt-2 flex flex-wrap gap-2">
                              {post.tags?.filter(t => typeof t === 'string').map(t => (
                                  <span key={t} className="text-[10px] px-2 py-0.5 bg-muted rounded-full">#{t}</span>
                              ))}
                          </div>
                      </div>
                  </Link>
              )})}
          </div>

       </div>
    </main>
  );
}
