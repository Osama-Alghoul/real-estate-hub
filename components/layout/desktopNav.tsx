import Link from "next/link";

export default function DesktopNav({ transparent }: { transparent?: boolean }) {
  return (
    <ul
      className={`text-sm gap-8 ${
        transparent ? "text-white" : "text-primary"
      } md:flex hidden`}
    >
      <li>
        <Link
          href="/"
          className={`${
            transparent ? "hover:text-gray-300" : "hover:text-primary-light"
          }`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className={`${
            transparent ? "hover:text-gray-300" : "hover:text-primary-light"
          }`}
        >
          About us
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className={`${
            transparent ? "hover:text-gray-300" : "hover:text-primary-light"
          }`}
        >
          Our Agents
        </Link>
      </li>
      <li>
        <Link
          href="/properties"
          className={`${
            transparent ? "hover:text-gray-300" : "hover:text-primary-light"
          }`}
        >
          Properties
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className={`${
            transparent ? "hover:text-gray-300" : "hover:text-primary-light"
          }`}
        >
          Gallery
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className={`${
            transparent ? "hover:text-gray-300" : "hover:text-primary-light"
          }`}
        >
          Blog
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className={`${
            transparent ? "hover:text-gray-300" : "hover:text-primary-light"
          }`}
        >
          Contact us
        </Link>
      </li>
      <li>
        <Link
          href="/"
          className={`${
            transparent ? "hover:text-gray-300" : "hover:text-primary-light"
          }`}
        >
          Search
        </Link>
      </li>
    </ul>
  );
}
