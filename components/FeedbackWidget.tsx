"use client";

export default function FeedbackWidget() {
    return (
        <div className="mt-20 pt-10 border-t border-white/10 text-center">
            <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-4">
                Intel Verification
            </h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                Spot an error in our analysis? Have conflicting intelligence?
                Secure comms are open.
            </p>

            <a
                href="mailto:intel@cyvanta.com?subject=Intel%20Feedback"
                className="inline-flex items-center gap-2 px-5 py-2 border border-primary/50 text-primary hover:bg-primary/10 transition-colors uppercase tracking-widest text-xs font-bold rounded-sm group"
            >
                <span>Submit Report</span>
                <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
            </a>
        </div>
    );
}
