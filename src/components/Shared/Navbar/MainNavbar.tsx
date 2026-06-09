"use client";
import { usePathname } from "next/navigation";
import ComputerNavbar from "./ComputerNavbar";
import MobileNavbar from "./MobileNavbar";

const MainNavbar = () => {
  const pathname = usePathname();
  const restrictedPaths = ["/dashboard", "/dashboard", "/auth", "/auth"];

  const isRestricted = restrictedPaths.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <div>
      {isRestricted ? (
        <></>
      ) : (
        <>
          <div className="block md:hidden">
            <MobileNavbar />
          </div>
          <div className="hidden md:block">
            <ComputerNavbar />
          </div>
        </>
      )}
    </div>
  );
};

export default MainNavbar;
