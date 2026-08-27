import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
      <h1 className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text font-mono text-8xl font-black text-transparent">
        404
      </h1>
      <p className="text-lg text-muted">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-4 rounded-xl bg-gradient-to-r from-accent to-accent-secondary px-8 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        Go Home
      </Link>
    </div>
  );
}
