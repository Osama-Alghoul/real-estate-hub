import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileNav({ transparent }: { transparent?: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="block md:hidden">
        <Menu
          className={`${transparent ? "text-white" : "text-primary-light"}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Pages</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Home</DropdownMenuItem>
          <DropdownMenuItem>About us</DropdownMenuItem>
          <DropdownMenuItem>Our Agents</DropdownMenuItem>
          <Link href="/properties">
            <DropdownMenuItem>Properties</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Gallery</DropdownMenuItem>
          <DropdownMenuItem>Blog</DropdownMenuItem>
          <DropdownMenuItem>Contact us</DropdownMenuItem>
          <DropdownMenuItem>Search</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
