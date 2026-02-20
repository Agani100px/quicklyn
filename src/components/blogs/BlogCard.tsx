import Image from "next/image";
import Link from "next/link";
import type { BlogPostItem } from "@/lib/wordpress";

export function BlogCard({ post }: { post: BlogPostItem }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-[#76aaab] bg-[#1f6b6d] shadow-lg">
      {post.featuredImageUrl ? (
        <Link href={`/blogs/${post.slug}`} className="block">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-3xl">
            <Image
              src={post.featuredImageUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
              unoptimized={post.featuredImageUrl.includes("quick.rootholdings")}
            />
          </div>
        </Link>
      ) : (
        <div className="aspect-[16/10] w-full rounded-t-3xl bg-[#2a7a7c]" />
      )}
      <div className="px-6 py-5 md:px-8 md:py-6">
        <p className="text-white/70" style={{ fontSize: "13px" }}>
          {post.dateFormatted}
        </p>
        <h2 className="mt-2 font-normal leading-snug text-white" style={{ fontSize: "21px" }}>
          <Link href={`/blogs/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        {post.shortDescription && (
          <p className="mt-2 leading-relaxed text-white/75" style={{ fontSize: "12px" }}>
            {post.shortDescription}
          </p>
        )}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/blogs/${post.slug}`}
            className="inline-flex items-center gap-1.5 font-normal text-[#ffda00] underline decoration-[#ffda00] underline-offset-2 transition hover:opacity-90"
            style={{ fontSize: "14px" }}
          >
            Read More
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
          <span className="inline-flex items-center gap-1.5 text-sm text-white/70">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}
