import { TagType, TaxonomyType } from "@/data/types";
import Link from "next/link";
import React, { FC } from "react";

export interface TagProps {
  className?: string;
  tag: TagType;
  hideCount?: boolean;
}

const Tag: FC<TagProps> = ({ className = "", tag, hideCount = false }) => {
  // console.log('tag', tag.href)
  return (
    <Link
      className={`nc-Tag inline-block bg-white hover:bg-neutral-50 text-sm text-neutral-600 dark:text-neutral-300 py-2 px-3 rounded-lg md:py-2.5 md:px-4 dark:bg-neutral-900 ${className}`}
      href={tag.href}
    // href={'/'}
    >
      {`${tag.name}`}
      {!hideCount && (
        // 
        <></>
      )}
    </Link>
  );
};

export default Tag;