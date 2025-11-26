import Image from "next/image";

export default function Avatar({ src, name }: { src: string; name: string }) {
  return (
    <div className="flex gap-2 items-center">
      <Image src={src} alt={name} width={50} height={50} className="rounded-full"/>
      <div>{name}</div>
    </div>
  );
}
