"use client";

import React, { FC } from "react";
import Logo from "@/components/Logo/Logo";
import MenuBar from "@/components/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import SearchModal from "./SearchModal";
import NotifyDropdown from "./NotifyDropdown";
import MoaLogo from "../Logo/MoaLogo";
import Link from "next/link";
import Search from "../(search)/SearchModal"
import MoaIcon from "../Logo/MoaIcon";

// 헤더 1
export interface MainNav2LoggedProps { }

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between items-center">
        {/* 사이드 메뉴 버튼을 항상 표시 */}
        <div className="flex items-center flex-1">
          <MenuBar />
        </div>
        {/* 중앙 로고 */}
        <div className="flex-1 flex justify-center">
          <Link href="/">

            {/* <MoaLogo /> */}
            <MoaIcon />

          </Link>
        </div>
        {/* 오른쪽 아이콘들 */}
        <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
          <Search></Search>
          <NotifyDropdown />
          <AvatarDropdown />
        </div>
      </div>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container">{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
