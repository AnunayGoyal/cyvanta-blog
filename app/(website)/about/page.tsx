import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Cyvanta",
  description: "Learn more about the origins and mission of Cyvanta.",
};


export default async function AboutPage() {

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 font-mono">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-l-2 border-primary pl-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            SYSTEM_ORIGIN
          </h1>
          <p className="text-muted text-lg">
            // The story behind the code.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-muted/80 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-primary">&gt;</span> INITIALIZATION
            </h2>
            <p>
              Cyvanta was initialized with a singular mission: to decode the complexities of modern software engineering and present them in a raw, unfiltered format. We believe in the power of open source, the elegance of clean code, and the relentless pursuit of knowledge.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-primary">&gt;</span> CORE_DIRECTIVES
            </h2>
            <ul className="space-y-2 list-disc list-inside ml-2">
              <li>Democratize advanced technical knowledge.</li>
              <li>Build resilient, scalable systems.</li>
              <li>Foster a community of hackers and builders.</li>
              <li>Push the boundaries of web performance.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-primary">&gt;</span> TEAM_STATUS
            </h2>
            <p>
              We are a distributed node of developers, designers, and visionaries working asynchronously to build the future of the web. Our operations are transparent, our code is efficient, and our uptime is maximized.
            </p>
          </section>
        </div>

        {/* Signature */}
        <div className="pt-12 border-t border-white/10">
          <p className="opacity-50 text-sm">
            END_OF_TRANSMISSION
          </p>
        </div>
      </div>
    </div>
  );
}
