import Header from "../layout/header";

export default function Hero() {
  return (
    <section
      style={{ backgroundImage: "url('/banner/hero.png')" }}
      className="bg-cover"
    >
      <Header />
      <div className="flex flex-col items-center text-white md:py-[150px] py-20 px-4 text-center gap-4">
        <h1 className="font-semibold lg:text-[52px] md:text-5xl text-4xl">
          Find Your Dream Home
        </h1>
        <p className="lg:text-xl md:text-lg text-base">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia curae; Proin sodales ultrices nulla blandit volutpat.
        </p>
      </div>
    </section>
  );
}
