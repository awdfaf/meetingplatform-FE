"use client";

import React, { FC } from "react";
import MenuBar from "@/components/MenuBar/MenuBar";
import LangDropdown from "./LangDropdown";
import AvatarDropdown from "./AvatarDropdown";
import TemplatesDropdown from "./TemplatesDropdown";
import NotifyDropdown from "./NotifyDropdown";
import SwitchDarkMode from "../SwitchDarkMode/SwitchDarkMode";
import Input from "../Input/Input";
import SearchModal from "./SearchModal";
import Button from "../Button/Button";
import Search from "../(search)/SearchModal"
import Link from "next/link";
import MoaIcon from "../Logo/MoaIcon";
import { useSession } from "next-auth/react";
import Loading from "../Button/Loading";

export interface MainNavProps {
  className?: string;
}

const MainNav: FC<MainNavProps> = ({ className = "" }) => {

  const session = useSession();
  console.log("session.status" , session.status);
  
  const renderSearchForm = () => {
    return (
      <div className="relative group">
        <div className="absolute inset-0"></div>
        <Input
          type="search"
          placeholder="Search items"
          className="pr-5 md:pr-10 !w-40 md:!w-full group-hover:border-slate-300 dark:group-hover:border-slate-400 dark:placeholder:text-neutral-400"
          sizeClass="h-[42px] pl-4 py-3"
          autoFocus={false}
        />
        <span className="absolute top-1/2 -translate-y-1/2 right-3 text-neutral-500 dark:text-neutral-400">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 22L20 20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="absolute inset-0"></div>
      </div>
    );
  };

  return (
    <div className="nc-MainNav2 relative z-10 bg-white dark:bg-slate-900">
      <div className="container">
        <div className="h-20 flex justify-between">
          <div className="flex items-center md:hidden flex-1">
            <MenuBar />
          </div>

          <div className="flex lg:flex-1 items-center rtl:space-x-reverse space-x-3 sm:space-x-8">
            <Link href="/">
              {/* <MoaLogo /> */}
              <MoaIcon />
            </Link>

            <div className="hidden md:block h-10 border-s border-slate-200 dark:border-slate-700"></div>

            <div className="hidden sm:block flex-grow max-w-xs">
              <SearchModal renderTrigger={renderSearchForm} />
            </div>
          </div>

          {
            session.status === "authenticated" ? (
              <div className="flex-1 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1 rtl:space-x-reverse">
                <SwitchDarkMode />
                {/* <TemplatesDropdown />
                <LangDropdown /> */}
                <NotifyDropdown className="hidden md:block" />
                <AvatarDropdown />
              </div>
            ) : session.status === "loading" ? (
              <div className="flex-1 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1 rtl:space-x-reverse">
                <Loading />
              </div>
            ) :
            
            (
              <div className="flex-1 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1 rtl:space-x-reverse">
                <SwitchDarkMode />
                <Search />
                <Button
                  sizeClass="py-3 px-4 sm:px-6"
                  href="/login"
                  pattern="primary"
                >
                  로그인
                </Button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default MainNav;
