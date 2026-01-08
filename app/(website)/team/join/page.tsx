import type { Metadata } from "next";
import AuthorSubmissionForm from "@/components/AuthorSubmissionForm";

export const metadata: Metadata = {
  title: "Join the Team | Cyvanta",
  description: "Submit your profile to become a Cyvanta author.",
};

export default function JoinTeamPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 font-mono">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 border-l-2 border-primary pl-6 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            JOIN_OPERATIONS
          </h1>
          <p className="text-muted text-lg">
            // Initialize new operative sequence.
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 md:p-12 shadow-2xl">
            <AuthorSubmissionForm />
        </div>
      </div>
    </div>
  );
}
