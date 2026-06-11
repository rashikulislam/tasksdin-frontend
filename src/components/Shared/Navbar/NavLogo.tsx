"use client";
import { useLocale } from "next-intl";
import Link from "next/link";

const NavLogo = () => {
  const locale = useLocale();
  return (
    <div>
      <Link href={`/${locale}`}>
        <h1 className="text-2xl font-bold text-primary">TasksDin</h1>
      </Link>
    </div>
  );
};

export default NavLogo;
