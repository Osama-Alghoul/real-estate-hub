import FeatureCard from "./featureCard";

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-24">
      <FeatureCard
        icon="/home/home.svg"
        title="Sell your home"
        subTitle="We do a free evaluation to be sure you want to start selling."
        path="/"
      />
      <FeatureCard
        icon="/home/homekey.svg"
        title="Rent your home"
        subTitle="We do a free evaluation to be sure you want to start selling."
        path="/"
      />
      <FeatureCard
        icon="/home/homecase.svg"
        title="Buy a home"
        subTitle="We do a free evaluation to be sure you want to start selling."
        path="/"
      />
      <FeatureCard
        icon="/home/homesearch.svg"
        title="Free marketing"
        subTitle="We do a free evaluation to be sure you want to start selling."
        path="/"
      />
    </div>
  );
}
