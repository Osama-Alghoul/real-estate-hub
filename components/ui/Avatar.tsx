import Image from "next/image";

export default function Avatar({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex gap-2 items-center">
      <Image src={src || "/people/A1.png"} alt={name} width={50} height={50} className="bg-primary-light rounded-full w-12 h-12 object-contain"/>
      <div>{name}</div>
    </div>
  );
}
