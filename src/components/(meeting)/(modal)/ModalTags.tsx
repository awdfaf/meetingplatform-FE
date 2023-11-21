'use client'

import React, { FC } from "react";
import NcModal from "@/components/NcModal/NcModal";
import Tag from "@/components/Tag/Tag";
import Button from "@/components/Button/Button";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";
import { MEETING_CATEGORIES } from "@/data/category";

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";


// interface TagType {
//   id: number;
//   name: string;
// }

// interface TaxonomyType {
//   id: string | number;
//   name: string;
//   href: Route;
//   count?: number;
//   thumbnail?: string | StaticImageData;
//   desc?: string;
//   color?: TwMainColor | string;
//   taxonomy: "category" | "tag";
//   tag: TagType[];
// }

export interface ModalTagsProps {
  id: number
}



const ModalTags: FC<ModalTagsProps> = ({ id }) => {
  // Find the category based on the provided ID
  const category = MEETING_CATEGORIES.find((cat) => cat.id === id);

  // Extract the tags of the category
  const tags = category?.tag || [];

  const renderModalContent = () => {
    return (
      <div className="flex flex-wrap dark:text-neutral-200">
        {tags.map((tagItem) => (
          <Tag key={tagItem.id} tag={tagItem} className="me-2 mb-2" />
        ))}
      </div>
    );
  };

  return (
    <div className="nc-ModalTags">
      <NcModal
        contentExtraClass="max-w-screen-md"
        renderTrigger={(openModal) => (
          <Button
            pattern="third"
            fontSize="text-sm font-medium"
            onClick={openModal}
          >
            <div>
              <span className="hidden sm:inline">Other</span> Tags
            </div>
            <ChevronDownIcon
              className="w-4 h-4 ms-2 -me-1"
              aria-hidden="true"
            />
          </Button>
        )}
        modalTitle="Discover other tags"
        renderContent={renderModalContent}
      />
    </div>
  );
};

export default ModalTags;
