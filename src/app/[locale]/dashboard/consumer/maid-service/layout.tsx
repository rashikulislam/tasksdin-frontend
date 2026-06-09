import HomeMaidNavbar from "@/components/Dashboard/Consumer/HomeMaid/HomeMaidNavbar";
import React, { ReactNode } from "react";

const HomeMaidLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HomeMaidNavbar />
      <div className="pb-0 lg:pb-10">{children}</div>
    </>
  );
};

export default HomeMaidLayout;
