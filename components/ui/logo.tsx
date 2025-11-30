import { Home } from "lucide-react";

export default function Logo({ transparent }: { transparent?: boolean }) {
  return (
    <div
      className={`${
        transparent ? "text-white" : "text-primary-light"
      } flex gap-2 items-center`}
    >
      <Home className="size-11" />
      <div>
        <div className="text-2xl font-semibold">REIS</div>
        <div className="font-medium text-sm">Real State</div>
      </div>
    </div>
  );
}
