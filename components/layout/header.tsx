'use client'

import { Facebook, MailOpen, Phone, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import Logo from "../ui/logo";
import { MobileNav } from "./mobileNav";
import DesktopNav from "./desktopNav";
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();
    const isRootPath = pathname === '/';
  return (
    <header>
      <nav
        className={`flex justify-between flex-wrap ${
          isRootPath ? "" : "bg-primary"
        } text-white py-6 lg:px-24 md:px-10 px-4`}
      >
        <div className="flex gap-3 items-center pb-4 md:pb-0">
          <MailOpen />
          <div className="text-sm">
            <span className="font-bold">Email us at :</span> example@mail.com
          </div>
        </div>
        <div className="flex gap-7">
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank">
              <Facebook fill="white" />
            </a>
            <a href="https://linkedin.com" target="_blank">
              <Linkedin />
            </a>
            <a href="https://instagram.com" target="_blank">
              <Instagram />
            </a>
          </div>{" "}
          |{" "}
          <div className="flex gap-3">
            <Phone />
            <div>123-4567 890</div>
          </div>
        </div>
      </nav>
      <hr className="text-white" />
      <nav className="flex justify-between items-center py-6 lg:px-24 md:px-10 px-4">
        <Link href="/">
          <Logo transparent={isRootPath} />
        </Link>
        <DesktopNav transparent={isRootPath} />
        <MobileNav transparent={isRootPath} />
      </nav>
    </header>
  );
}
