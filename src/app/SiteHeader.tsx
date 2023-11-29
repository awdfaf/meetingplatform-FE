'use client'
import React, { Fragment, useEffect } from "react";

import {
  ShoppingBagIcon as ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import SwitchDarkMode2 from "@/components/SwitchDarkMode/SwitchDarkMode2";
import MainNav from "@/components/Header/MainNav";
import InterModal from "@/components/(widget)/modal/InterModal";

const SiteHeader = ({interData}:{interData?:number[]}) => {

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  console.log(interData)
  useEffect(() => {
    if(interData&&interData.length === 0){
      setIsModalOpen(true);
    }
  }, [interData]);

  return (
    <>
      <InterModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <SideMenu />
      <div className="nc-Header sticky top-0 w-full z-40">
        <MainNav />
      </div>
    </>
  );
};

export default SiteHeader;


export const SideMenu = () => {
  return (
    <div className="ControlSelections relative z-40 hidden md:block">
      <div className="fixed right-3 top-1/4 z-40 flex items-center">
        <Popover className="relative">
          {({ open }) => (
            <>
              {/* <Popover.Button
                className={`p-2.5 bg-white hover:bg-neutral-100 dark:bg-primary-6000 dark:hover:bg-primary-700 rounded-xl shadow-xl border border-neutral-200 dark:border-primary-6000 z-10 focus:outline-none ${open ? " focus:ring-2 ring-primary-500" : ""
                  }`}
              >
                <CogIcon className="w-8 h-8" />
              </Popover.Button> */}
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-sm">
                  <div className="rounded-2xl bg-white dark:bg-neutral-950 overflow-hidden nc-custom-shadow-1">
                    <div className="relative p-6 space-y-3.5 xl:space-y-5">
                      <span className="text-xl font-semibold">Customize</span>
                      <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                      <div className="flex space-x-2 xl:space-x-4 rtl:space-x-reverse">
                        <span className="text-sm font-medium">Dark mode</span>
                        <SwitchDarkMode2 />
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 p-5">
                      <a
                        className="flex items-center justify-center w-full px-4 py-2 !rounded-xl text-sm font-medium bg-primary-6000 text-white hover:bg-primary-700"
                        href={
                          "https://themeforest.net/item/ncmaz-blog-news-magazine-nextjs-template/44412092"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShoppingCartIcon className="w-4 h-4" />
                        <span className="ms-2">Buy this template</span>
                      </a>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};