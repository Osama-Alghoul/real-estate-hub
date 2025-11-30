export default function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center text-center pt-24 pb-12">
      <h2 className="font-semibold lg:text-4xl md:text-3xl text-2xl">{title}</h2>
      <p className="lg:text-xl md:text-lg text-base text-gray-400 max-w-[700px]">{description}</p>
    </div>
  );
}
