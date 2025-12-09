"use client";

import Link from "next/link";
import SectionTitle from "../common/sectionTitle";
import { Button } from "../ui/button";
import CardsGrid from "./cardsGrid";

export default function Cards() {
  return (
    <section className="flex flex-col items-center px-4">
      <SectionTitle
        title="Letest Properties of Rent"
        description="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat."
      />
      <CardsGrid />
      <Link href="/properties">
        <Button>Load more listing</Button>
      </Link>
    </section>
  );
}
