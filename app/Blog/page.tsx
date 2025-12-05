"use client";

import { useState, useMemo, type ChangeEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BlogPostCard from "@/components/blog/blog-post-card";
import BlogSidebar from "@/components/blog/blog-sidebar";
import BlogCTA from "@/components/blog/blog-cta";

type Category =
  | "Buyers Guide"
  | "Renters Guide"
  | "For Owners"
  | "Neighborhoods"
  | "Platform Updates";

type SortOption = "newest" | "popular";

const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Essential Tips for First-Time Home Buyers",
    excerpt:
      "Learn the key strategies to make your first home purchase smooth and confident. From mortgage pre-approval to inspection tips.",
    image: "/banner/banner.jpg",
    category: "Buyers Guide" as Category,
    author: "Sarah Johnson",
    date: "Nov 2024",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Understanding Your Rights as a Tenant",
    excerpt:
      "A comprehensive guide to tenant rights, lease agreements, and what to expect during your rental journey.",
    image: "/banner/banner.jpg",
    category: "Renters Guide" as Category,
    author: "Michael Chen",
    date: "Nov 2024",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "How to Maximize Your Property Value",
    excerpt:
      "Strategic improvements and maintenance tips that can significantly increase your home's market value and appeal.",
    image: "/banner/banner.jpg",
    category: "For Owners" as Category,
    author: "Emma Davis",
    date: "Oct 2024",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Top Neighborhoods to Watch in 2025",
    excerpt:
      "Discover emerging neighborhoods with strong growth potential, great amenities, and vibrant communities.",
    image: "/banner/banner.jpg",
    category: "Neighborhoods" as Category,
    author: "James Wilson",
    date: "Oct 2024",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "New Platform Features: Smart Search Tools",
    excerpt:
      "Introducing our latest platform updates designed to make finding your ideal property easier than ever.",
    image: "/banner/banner.jpg",
    category: "Platform Updates" as Category,
    author: "Alex Thompson",
    date: "Oct 2024",
    readTime: "4 min read",
  },
  {
    id: 6,
    title: "The Ultimate Guide to Home Staging",
    excerpt:
      "Professional staging techniques to showcase your property's best features and attract quality buyers.",
    image: "/banner/banner.jpg",
    category: "For Owners" as Category,
    author: "Jessica Lee",
    date: "Sep 2024",
    readTime: "6 min read",
  },
];

const CATEGORIES: Category[] = [
  "Buyers Guide",
  "Renters Guide",
  "For Owners",
  "Neighborhoods",
  "Platform Updates",
];

const POPULAR_POSTS = [
  {
    id: 1,
    title: "10 Essential Tips for First-Time Home Buyers",
    date: "Nov 2024",
  },
  { id: 2, title: "Understanding Your Rights as a Tenant", date: "Nov 2024" },
  { id: 4, title: "Top Neighborhoods to Watch in 2025", date: "Oct 2024" },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
  };

  const filteredPosts = useMemo(() => {
    let filtered = [...BLOG_POSTS];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    if (sortBy === "popular") {
      filtered.sort((a, b) => a.id - b.id);
    } else {
      filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-background">
      <section
        className="relative w-full py-24 md:py-32 bg-cover bg-center"
        style={{ backgroundImage: "url(/banner/hero.png)" }}
      >
        <div className="absolute inset-0 bg-primary/40" />

        <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4 text-balance">
            Blog
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-6 max-w-2xl text-pretty">
            Insights, guides, and updates to help you navigate the real estate
            market with confidence.
          </p>
          <nav className="text-primary-foreground/80 text-sm">
            <Link
              href="/"
              className="hover:text-primary-foreground transition-colors"
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Blog</span>
          </nav>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: posts */}
          <div className="lg:col-span-2">
            {/* Search + sort + filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="w-full sm:w-auto">
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground
                               focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground
                             focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={selectedCategory === null ? "default" : "outline"}
                  onClick={() => setSelectedCategory(null)}
                  className={`rounded-full text-sm ${
                    selectedCategory === null
                      ? ""
                      : "bg-muted text-muted-foreground hover:bg-muted/80 border-border"
                  }`}
                >
                  All Posts
                </Button>

                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full text-sm ${
                      selectedCategory === category
                        ? ""
                        : "bg-muted text-muted-foreground hover:bg-muted/80 border-border"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Posts grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {filteredPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No posts found. Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>

          {/* Right: sidebar */}
          <BlogSidebar categories={CATEGORIES} popularPosts={POPULAR_POSTS} />
        </div>
      </section>

      <BlogCTA />
    </main>
  );
}
