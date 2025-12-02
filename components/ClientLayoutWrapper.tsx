"use client";

import { usePathname } from "next/navigation";
import Header from "./layout/header";
import Footer from "./layout/footer";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hide = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!hide && <Header />}
      {children}
      {!hide && <Footer />}
    </>
  );
}
