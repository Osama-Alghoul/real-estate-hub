import SectionTitle from "../common/sectionTitle";
import { Button } from "../ui/button";

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
      <Button variant={"secondary"} className="mb-14">Contact us</Button>
    </section>
  );
}
