import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogCTA() {
  return (
    <section className="bg-primary py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Ready to find your next property?
          </h2>
          <p className="text-primary-foreground/90 mb-6">
            Browse our curated collection of homes, apartments, and investment opportunities.
          </p>
          <Button
            asChild
            className="h-11 px-8 font-semibold bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            <Link href="/properties">Browse Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
