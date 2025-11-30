import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import Logo from "../ui/logo";

export default function Footer() {
  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-12 bg-gray-50 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4">
          <Logo />
          <h4 className="font-bold text-lg text-gray-800 mt-2">Contact Us</h4>
          <div className="space-y-2 text-gray-600 text-sm">
            <div className="flex items-center">
              <Phone className="mr-2 size-4" />
              <span>Call: +123 400 123</span>
            </div>
            <div className="leading-relaxed">
              Praesent nulla massa, hendrerit vestibulum gravida in, feugiat
              auctor felis.
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 size-4" />
              <span>Email: example@mail.com</span>
            </div>
          </div>
          {/* Social Media Icons */}
          <div className="flex gap-3 mt-4">
            {/* Note: I'm adding standard icon styling for better responsiveness and look */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-primary p-2 rounded-full hover:bg-primary-dark transition-colors duration-200"
              aria-label="Facebook"
            >
              {/* Replace Facebook with your actual SVG component or an icon library one */}
              <Facebook className="h-5 w-5" fill="currentColor" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-primary p-2 rounded-full hover:bg-primary-dark transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" fill="currentColor" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-primary p-2 rounded-full hover:bg-primary-dark transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Features Column */}
        <div>
          <h4 className="font-bold text-lg mb-4 text-gray-800">Features</h4>
          <ul className="space-y-2 text-gray-600 text-sm [&_li:hover]:text-primary [&_li:hover]:cursor-pointer">
            <li>Home</li>
            <li>Become a host</li>
            <li>Pricing</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="font-bold text-lg mb-4 text-gray-800">Company</h4>
          <ul className="space-y-2 text-gray-600 text-sm [&_li:hover]:text-primary [&_li:hover]:cursor-pointer">
            <li>About us</li>
            <li>Press</li>
            <li>Contact</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* Team and policies Column */}
        <div>
          <h4 className="font-bold text-lg mb-4 text-gray-800">
            Team and policies
          </h4>
          <ul className="space-y-2 text-gray-600 text-sm [&_li:hover]:text-primary [&_li:hover]:cursor-pointer">
            <li>Terms of services</li>
            <li>Privacy Policy</li>
            <li>Security</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200 text-center text-xs text-gray-500 max-w-7xl mx-auto">
        &copy; {new Date().getFullYear()} REIS. All rights
        reserved.
      </div>
    </footer>
  );
}
