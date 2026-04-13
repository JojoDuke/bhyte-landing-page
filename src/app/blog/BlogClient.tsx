"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { BlogPostListItem } from "../../lib/blog";

const PAGE_SIZE = 6;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function PostCover({
  title,
  coverImage,
  className,
  sizes,
  priority = false,
}: {
  title: string;
  coverImage?: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  if (coverImage) {
    return (
      <Image
        src={coverImage}
        alt=""
        fill
        className={`object-cover ${className ?? ""}`}
        sizes={sizes}
        priority={priority}
      />
    );
  }
  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black ${className ?? ""}`}
      aria-hidden
    >
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
      <span className="absolute bottom-6 left-6 right-6 text-2xl sm:text-3xl font-bold text-white/90 leading-tight line-clamp-3">
        {title}
      </span>
    </div>
  );
}

export default function BlogClient({ posts }: { posts: BlogPostListItem[] }) {
  const categories = useMemo((): string[] => {
    const set = new Set(posts.map((p) => p.category ?? "Insights"));
    return [
      "All",
      ...Array.from(set).sort((a, b) => a.localeCompare(b)),
    ];
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleGridCount, setVisibleGridCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter(
      (p) => (p.category ?? "Insights") === activeCategory
    );
  }, [posts, activeCategory]);

  const featured = filtered[0];
  const gridPosts = filtered.slice(1);

  const visibleGrid = gridPosts.slice(0, visibleGridCount);
  const hasMore = visibleGridCount < gridPosts.length;

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
    setVisibleGridCount(PAGE_SIZE);
  };

  if (posts.length === 0) {
    return (
      <>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Blog
          </h1>
        </div>
        <div className="h-px w-full bg-gray-800 mb-10" />
        <p className="text-center text-gray-500 py-20">No posts yet. Check back soon.</p>
      </>
    );
  }

  return (
    <>
      {/* Page title row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
          Blog
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-sm sm:text-right shrink-0">
          Read about our latest announcements, product updates, and how we
          build.
        </p>
      </div>
      <div className="h-px w-full bg-gray-800 mb-10 md:mb-12" />

      {featured && (
        <section className="mb-14 md:mb-16">
          <Link
            href={`/blog/${featured.slug}`}
            className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center group"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-sm transition-colors group-hover:border-gray-700">
              <PostCover
                title={featured.title}
                coverImage={featured.coverImage}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="min-w-0 text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4 group-hover:text-blue-400 transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 line-clamp-4">
                {featured.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center rounded-full border border-gray-700 bg-gray-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-300">
                  {featured.category}
                </span>
                <span className="text-gray-500">
                  {formatDate(featured.date)}
                  <span className="mx-2 text-gray-700">·</span>
                  {featured.readTime}
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Category filter */}
      <nav
        className="flex flex-wrap gap-x-8 gap-y-3 border-b border-gray-800 pb-3 mb-10 md:mb-12"
        aria-label="Blog categories"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategory(cat)}
              className={`text-sm font-medium transition-colors border-b-2 -mb-px pb-3 ${
                isActive
                  ? "text-white border-blue-500"
                  : "text-gray-500 border-transparent hover:text-gray-300"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </nav>

      {/* Grid */}
      {gridPosts.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-12">
            {visibleGrid.map((post) => (
              <article key={post.slug} className="flex flex-col text-left">
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative mb-4 block aspect-[16/10] w-full overflow-hidden rounded-lg border border-gray-800 bg-gray-900 transition-colors hover:border-gray-700"
                >
                  <PostCover
                    title={post.title}
                    coverImage={post.coverImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>
                <span className="inline-flex w-fit items-center rounded-full border border-gray-700 bg-gray-900/80 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  {post.category}
                </span>
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="mt-3 text-lg font-bold text-white leading-snug line-clamp-2 hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-3">
                  {post.description}
                </p>
                <p className="mt-auto pt-4 text-xs text-gray-500">
                  {formatDate(post.date)}
                  <span className="mx-2 text-gray-700">·</span>
                  {post.readTime}
                </p>
              </article>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mb-20">
              <button
                type="button"
                onClick={() =>
                  setVisibleGridCount((c) => c + PAGE_SIZE)
                }
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
              >
                Load more
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 py-16">
          No posts in this category yet.
        </p>
      )}

      {/* CTA band */}
      <section className="mt-8 border-t border-gray-800 bg-gray-950/50 py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to build something people love?
          </h2>
          <p className="text-gray-400 mb-8 text-sm md:text-base">
            Book a call, or explore our studio work and process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <a
              href="https://cal.com/bhyte-lwy0r0/30min?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-8 py-3 text-sm font-semibold bg-white text-black hover:bg-gray-200 transition-colors"
            >
              Book a call
            </a>
            <Link
              href="/studio#work"
              className="rounded-full px-8 py-3 text-sm font-semibold border border-gray-600 text-white hover:border-gray-400 hover:bg-gray-900/50 transition-colors"
            >
              View our work
            </Link>
          </div>
          <Link
            href="/studio"
            className="inline-block mt-8 text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            Learn more about Bhyte Studio
          </Link>
        </div>
      </section>
    </>
  );
}
