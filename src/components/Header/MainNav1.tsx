import React, { FC } from "react";
import Logo from "@/components/Logo/Logo";
import MenuBar from "@/components/MenuBar/MenuBar";
import SwitchDarkMode from "@/components/SwitchDarkMode/SwitchDarkMode";

import Button from "../Button/Button";
import MoaLogo from "../Logo/MoaLogo";
import Link from "next/link";
import MoaIcon from "../Logo/MoaIcon";
import Search from "../(search)/SearchModal"

// 헤더 3
export interface MainNav1Props { }

const MainNav1: FC<MainNav1Props> = () => {
  return (
    <div className="nc-MainNav1 relative z-10 bg-white dark:bg-slate-900 ">
      <div className="container">
        <div className="h-20 py-5 flex justify-between items-center">
          {/* 항상 보이는 사이드메뉴 버튼 */}
          <div className="flex-1 flex justify-start lg:justify-start items-center">
            <MenuBar />
          </div>

          {/* 로고가 항상 중앙에 오도록 조정 */}
          <div className="flex-1 flex justify-center items-center">
            <Link href="/">
              {/* <MoaLogo /> */}
              <MoaIcon />
            </Link>
          </div>

          {/* 항상 보이는 우측 아이콘들 */}
          <div className="flex-1 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1 rtl:space-x-reverse">
            {/* lg:hidden 클래스를 제거하여 항상 보이도록 설정 */}
            <SwitchDarkMode />
            {/* <SearchModal /> */}
            <Search />
            <Button
              sizeClass="py-3 px-4 sm:px-6"
              href="/login"
              pattern="primary"
            >
              로그인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav1;
