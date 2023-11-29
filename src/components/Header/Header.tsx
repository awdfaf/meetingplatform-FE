import React, { FC, Suspense } from "react";
import MainNav from "./MainNav";

export interface HeaderProps { }

const Header: FC<HeaderProps> = async () => {

  return (
    <div className="nc-Header sticky top-0 w-full z-40">
      <MainNav />
    </div>
  );
};

export default Header;
