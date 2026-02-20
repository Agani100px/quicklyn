import { getPosts } from "@/lib/wordpress";
import { BlogCard } from "@/components/blogs/BlogCard";

const BLOG_TITLE = "Blog";
const BLOG_SUBTITLE =
  "Articles, Guides, And Home Care Insights For An Easier Home.";

export default async function BlogsPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-[#2a7a7c] text-white">
      <header className="px-6 pb-12 pt-24 text-center md:pt-32 md:pb-16">
        <h1
          className="mt-12 font-bold tracking-tight md:mt-16"
          style={{ fontSize: "93px" }}
        >
          {BLOG_TITLE}
        </h1>
        <p
          className="mx-auto mt-3 max-w-xl text-white/90"
          style={{ fontSize: "12px" }}
        >
          {BLOG_SUBTITLE}
        </p>
      </header>

      <section className="px-6 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-4xl gap-8 md:gap-10">
          {posts.length === 0 ? (
            <p className="text-center text-white/80">
              No posts yet. Check back later.
            </p>
          ) : (
            posts.map((post) => <BlogCard key={post.id} post={post} />)
          )}
        </div>
      </section>
    </main>
  );
}
