import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white/70 mb-4">
          Article Not Found
        </h2>
        <p className="text-foreground/70 mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/50 bg-white/5 hover:bg-white/10 transition-colors duration-300 text-foreground/70 hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Articles</span>
        </Link>
      </div>
    </main>
  );
}
