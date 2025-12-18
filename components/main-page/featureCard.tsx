import { FeatureCardProps } from "@/types/featureCard";
import Image from "next/image";
import Link from "next/link";

export default function FeatureCard({
  icon,
  title,
  subTitle,
  path,
}: FeatureCardProps) {
  return (
    <Link
      href={path}
      className="flex flex-col gap-6 hover:bg-white bg-white md:bg-transparent hover:shadow-lg p-6 rounded-2xl max-w-[300px] transition-all group"
    >
      <Image src={icon} alt={title} width={50} height={50} />
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-gray-400">{subTitle}</p>
      <div className="text-primary font-medium group-hover:underline">
        Read more
      </div>
    </Link>
  );
}
