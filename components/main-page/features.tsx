import FeatureCard from "./FeatureCard";

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-24">
      <FeatureCard
        icon="/home/home.svg"
        title="Sell your home"
        subTitle="We do a free evaluation to be sure you want to start selling."
        path="/properties?type=sale"
      />
      <FeatureCard
        icon="/home/homekey.svg"
        title="Rent your home"
        subTitle="We do a free evaluation to be sure you want to start selling."
        path="/properties?type=rent"
      />
      <FeatureCard
        icon="/home/homecase.svg"
        title="Buy a home"
        subTitle="We do a free evaluation to be sure you want to start selling."
        path="/properties"
      />
      <FeatureCard
        icon="/home/homesearch.svg"
        title="Free marketing"
        subTitle="We do a free evaluation to be sure you want to start selling."
        path="/contact"
      />
    </div>
  );
}
