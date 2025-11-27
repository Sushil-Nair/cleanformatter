import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Tag, ArrowLeft, Share2 } from "lucide-react";
import { getBlogPost, blogPosts } from "@/data/blog-posts";
import { Metadata } from "next";
import Image from "next/image";
import BlogShareButton from "@/components/blogShareButton";
import BlogRenderer from "@/components/sections/BlogRenderer";
import { BlogSection } from "@/types/blog";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import AdUnit from "@/components/ad-unit";

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
      {/* Header / Back Link */}
      <div>
        <div className="px-4 py-4 relative pt-24 pb-8 md:pt-32 md:pb-12 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary text-lg hover:font-bold font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="container mx-auto px-4 pb-16 max-w-5xl">
        {/* JSON-LD for Article schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.description,
              image: post.image,
              author: {
                "@type": "Person",
                name: post.author?.name,
              },
              datePublished: post.publishedAt,
              dateModified: post.updatedAt || post.publishedAt,
              mainEntityOfPage: post.seo?.canonical,
            }),
          }}
        />

        {/* Layout: TOC + Content (stack on mobile, side-by-side on desktop) */}
        <div className="grid grid-cols-1 gap-10">
          {/* Main Column */}
          <div>
            {/* Hero Image */}
            {post.image && (
              <div className="relative h-72 md:h-96 rounded-xl overflow-hidden mb-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <span className="text-primary/80 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10">
                {post.category}
              </span>

              {post.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime} min read</span>
                </div>
              )}

              {post.publishedAt && (
                <span>
                  Published on{" "}
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              )}

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-6">
                {post.description}
              </p>

              {/* Author Box + Share */}
              <div className="flex flex-col gap-4 mb-10 w-full">
                {/* Author */}
                {post.author && (
                  <Card className="p-4 flex-1 bg-card border-border">
                    <h3 className="text-sm font-semibold mb-1">Written by</h3>
                    <p className="font-medium">{post.author.name}</p>
                    {post.author.role && (
                      <p className="text-xs text-muted-foreground mb-1">
                        {post.author.role}
                      </p>
                    )}
                    {post.author.bio && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {post.author.bio}
                      </p>
                    )}
                    {post.author.expertise &&
                      post.author.expertise.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {post.author.expertise.map((area) => (
                            <span
                              key={area}
                              className="px-2 py-1 rounded-full bg-muted text-[10px] uppercase tracking-wide text-muted-foreground"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      )}
                    {/* Share Button */}
                    <div className="md:self-end mt-5">
                      <BlogShareButton slug={post.slug} />
                    </div>
                  </Card>
                )}
              </div>

              {/* Main Content */}
              <div className="prose prose-neutral dark:prose-invert md:prose-lg max-w-none mb-12">
                <BlogRenderer content={post.content} />
              </div>

              <div className="flex flex-col w-full">
                {/* FAQ Section */}
                {post.faq && post.faq.length > 0 && (
                  <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-4">
                      Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {post.faq.map((item, index) => (
                        <AccordionItem
                          key={index}
                          value={`item-${index}`}
                          className="shadow-sm hover:shadow-md transition-all duration-200 px-4"
                        >
                          <AccordionTrigger>
                            <span className="font-semibold text-lg group-hover:text-primary/60 transition-colors">
                              {item.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground px-4 pb-6 pt-2 leading-relaxed text-base">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </section>
                )}

                {/* Sources Section */}
                {post.sources && post.sources.length > 0 && (
                  <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-4">Sources</h2>
                    <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                      {post.sources.map((src, index) => (
                        <li key={index}>
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            {src.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex items-center gap-2 flex-wrap pt-10 mt-10 border-t border-border">
                    <Tag className="w-5 h-5 text-muted-foreground" />
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${tag}`}
                        className="text-muted-foreground px-3 py-1 rounded-full text-sm transition-colors hover:bg-muted"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
