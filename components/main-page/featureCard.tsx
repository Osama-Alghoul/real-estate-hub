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
    <div className="flex flex-col gap-6 hover:bg-white hover:shadow-lg p-6 rounded-2xl max-w-[300px]">
      <Image src={icon} alt={title} width={50} height={50} />
      <h3 className="text-2xl font-semibold">{title}</h3>
      <p className="text-gray-400">{subTitle}</p>
      <Link href={path} className="text-primary">
        Read more
      </Link>
    </div>
  );
}
