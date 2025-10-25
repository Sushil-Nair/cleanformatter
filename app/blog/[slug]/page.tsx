import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Tag, ArrowLeft, Share2 } from "lucide-react";
import { getBlogPost, blogPosts } from "@/data/blog-posts";
import { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections/footer";
import AdUnit from "@/components/ad-unit";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: slugParam } = await params;
  const post = getBlogPost(slugParam);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      {/* Header */}
      <div>
        <div className="mx-auto px-4 py-4 relative pt-24 pb-16 md:pt-32 md:pb-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary/60 hover:text-primary/70 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Image */}
        {post.image && (
          <div className="relative h-96 rounded-xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Meta Info */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary/70 px-3 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
            {post.readTime && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{post.readTime} min read</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-6">
            {post.description}
          </p>

          {/* Author */}
          <div className="flex items-center justify-between py-6">
            <button className="p-2 hover:bg-accent rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, "<br />"),
            }}
          />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-8 border-t">
            <Tag className="w-5 h-5 text-muted-foreground" />
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="text-muted-foreground px-3 py-1 rounded-full text-sm transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </article>
      <AdUnit
        slot="footer-ad"
        format="horizontal"
        closeable
        className="sticky bottom-0"
      />
      <Footer />
    </div>
  );
}
