import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown-menu";
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
          <Link href="/about">
            <DropdownMenuItem>About us</DropdownMenuItem>
          </Link>
          <Link href="/properties">
            <DropdownMenuItem>Properties</DropdownMenuItem>
          </Link>
          <Link href="/contact">
            <DropdownMenuItem>Contact us</DropdownMenuItem>
          </Link>
          <Link href="/login">
            <DropdownMenuItem>Login</DropdownMenuItem>
          </Link>
          <Link href="/register">
            <DropdownMenuItem>Register</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
