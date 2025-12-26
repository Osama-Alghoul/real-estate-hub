import Link from "next/link";
import SectionTitle from "../common/SectionTitle";
import { Button } from "../ui/Button";

export default function CTA() {
  return (
    <section
      style={{ backgroundImage: "url('/home/cta.png')" }}
      className="bg-cover flex flex-col items-center text-white"
    >
      <SectionTitle
        title="Find Best Place For Living"
        description="Spend vacations in best hotels and resorts find the great place of your
        choice using different searching options."
      />
      <Link href="/contact">
        <Button variant={"secondary"} className="mb-14">
          Contact us
        </Button>
      </Link>
    </section>
  );
}
