import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, PostTag } from "@/lib/mdx";
import { PortableText } from "next-sanity";
import CodeWindow from "@/components/CodeWindow";
import Table from "@/components/Table";
import YouTube from "@/components/YouTube";
import { urlFor } from "@/sanity/lib/image";
import { getTagProps } from "@/lib/tags";

// FORCE DYNAMIC RENDERING
export const dynamic = "force-dynamic";

const ptComponents = {
  types: {
    code: ({ value }: any) => {
      // FIX: Ensure we map Sanity code block fields to CodeWindow props correctly
      return (
        <CodeWindow
          title={value.filename || 'Terminal'}
          lang={value.language || 'text'}
        >
          {value.code}
        </CodeWindow>
      );
    },
    callout: ({ value }: any) => {
      const style = value.style || 'info';
      const colors = {
        info: 'border-blue-500/50 bg-blue-500/10 text-blue-200',
        warning: 'border-orange-500/50 bg-orange-500/10 text-orange-200',
        danger: 'border-red-500/50 bg-red-500/10 text-red-200'
      };
      return (
        <div className={`p-4 my-4 rounded-sm border ${colors[style as keyof typeof colors]}`}>
          <PortableText value={value.content || []} />
        </div>
      )
    },
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="my-8 relative w-full h-[400px]">
          <img
            src={urlFor(value).width(800).fit('max').auto('format').url()}
            alt={value.alt || 'Post image'}
            className="object-contain w-full h-full"
          />
        </div>
      )
    },
    table: ({ value }: any) => <Table value={value} />,
    youtube: ({ value }: any) => <YouTube value={value} />,
  },
  block: {
    alert: ({ children }: any) => <blockquote className="border-l-4 border-yellow-500 pl-4 italic my-4">{children}</blockquote>
  }
};



type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  // With Sanity, 'post' properties are direct, not inside 'frontmatter'
  const { title, date, tags, content, author } = post;

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono selection:bg-primary selection:text-black pb-24">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 md:pt-40">
        <Link href="/" className="group inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-8">
          <span className="mr-2 transition-transform group-hover:-translate-x-1">&lt;-</span>
          BACK TO INTEL
        </Link>

        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="flex gap-3 mb-6">
            {tags && tags.map((tag: string) => {
              const props = getTagProps(tag, null);

              return (
                <span
                  key={tag}
                  className={props.className}
                  style={props.style}
                >
                  {tag}
                </span>
              );
            })}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            {title}
          </h1>

          <div className="flex items-center text-sm text-gray-500 font-mono">
            <span className="text-primary mr-2">::</span>
            <time>{date}</time>
            <span className="mx-4">|</span>
            <span>By {author?.name || 'Anunay Goyal'}</span>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-headings:text-white prose-a:text-primary prose-code:text-primary prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 max-w-none">

          <PortableText value={content} components={ptComponents} />
        </article>
      </div>
    </div>
  );
}