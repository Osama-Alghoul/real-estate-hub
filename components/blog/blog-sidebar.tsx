"use client";
import Link from "next/link";
import { useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";

interface PopularPost {
  id: number;
  title: string;
  date: string;
}

interface BlogSidebarProps {
  categories: string[];
  popularPosts: PopularPost[];
}

export default function BlogSidebar({
  categories,
  popularPosts,
}: BlogSidebarProps) {
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState("");

  const handleSidebarSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSidebarSearchQuery(e.target.value);
  };

  return (
    <aside className="lg:col-span-1 space-y-6">
      {/* Search */}
      <section className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Search Posts
        </h3>
        <input
          type="text"
          placeholder="Search by keyword..."
          value={sidebarSearchQuery}
          onChange={handleSidebarSearchChange}
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground
                     focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </section>

      {/* Categories */}
      <section className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Categories
        </h3>
        <ul className="space-y-2 text-sm">
          {categories.map((category) => (
            <li key={category}>
              <button
                type="button"
                className="text-primary hover:underline font-medium"
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Popular posts */}
      <section className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Popular Posts
        </h3>
        <ul className="space-y-3 text-sm">
          {popularPosts.map((post) => (
            <li
              key={post.id}
              className="pb-3 border-b border-border last:border-0 last:pb-0"
            >
              <button
                type="button"
                className="text-foreground font-medium text-left hover:text-primary transition-colors"
              >
                {post.title}
              </button>
              <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Quick links */}
      <section className="bg-muted/60 border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Quick Links
        </h3>
        <div className="space-y-2">
          <Button className="w-full justify-center h-10">
            <Link href="/properties">Search Properties</Link>
          </Button>
          <Button
            variant="outline"
            className="w-full justify-center h-10 border-border"
          >
            Contact an Agent
          </Button>
          <Button
            variant="outline"
            className="w-full justify-center h-10 border-border"
          >
            <Link href="/booking">Book a Visit</Link>
          </Button>
        </div>
      </section>
    </aside>
  );
}
