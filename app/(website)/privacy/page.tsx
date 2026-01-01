import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Cyvanta",
  description: "Privacy protocols and data handling procedures for Cyvanta.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 font-mono">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-l-2 border-red-500 pl-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            PRIVACY_PROTOCOL
          </h1>
          <p className="text-muted text-lg">
            // Data handling and security measures.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-muted/80 leading-relaxed text-sm">
          <div className="p-4 border border-white/10 bg-white/5 rounded mb-8">
             <p className="text-xs uppercase tracking-widest text-red-400 mb-2">Notice</p>
             <p>This document outlines the protocols utilized by Cyvanta to secure user data and maintain anonymity where possible.</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">1.0 DATA_COLLECTION</h2>
            <p>
              We collect minimal data necessary for system operation. This includes:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Connection logs (IP address, User Agent).</li>
              <li>Navigation telemetry (Pages visited, Time on site).</li>
              <li>Newsletter subscriptions (Email address - strictly opt-in).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">2.0 ENCRYPTION_STANDARDS</h2>
            <p>
              All transmission of data between your terminal and our servers is encrypted via TLS 1.3. We utilize industry-standard hashing algorithms for any stored credentials or sensitive identifiers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">3.0 THIRD_PARTY_NODES</h2>
            <p>
              We do not sell, trade, or transfer your data to external nodes. However, we may interface with trusted third-party subsystems for specific functions (e.g., analytics, email delivery). These nodes are vetted for security compliance.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">4.0 COOKIE_USAGE</h2>
            <p>
              Cookies are utilized for session management and preference storage. You may disable cookies in your browser settings, though this may degrade system functionality.
            </p>
          </section>
        </div>

         {/* Signature */}
         <div className="pt-12 border-t border-white/10">
          <p className="opacity-50 text-sm">
            LAST_UPDATED: 2025-01-01
          </p>
        </div>
      </div>
    </div>
  );
}
