import {
  Facebook,
  MailOpen,
  Phone,
  Linkedin,
  Instagram,
  Home,
} from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between bg-primary text-white py-6 px-24">
        <div className="flex gap-3 items-center">
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
      <nav className="flex justify-between items-center py-6 px-24">
        <Link href="/">
        <div className="text-primary-light flex gap-2 items-center">
          
            <Home className="size-11" />
            <div>
              <div className="text-2xl font-semibold">REIS</div>
              <div className="font-medium text-sm">Real State</div>
            </div>
          
        </div></Link>
        <ul className="text-sm flex gap-8">
          <li>
            <Link href="/" className="hover:text-primary-light">
              Home
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-primary-light ">
              About us
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-primary-light ">
              Our Agents
            </Link>
          </li>
          <li>
            <Link href="/properties" className="hover:text-primary-light ">
              Properties
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-primary-light ">
              Gallery
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-primary-light ">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-primary-light ">
              Contact us
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-primary-light ">
              Search
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
