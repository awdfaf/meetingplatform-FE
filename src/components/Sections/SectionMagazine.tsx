import React, { FC } from "react";
import Card2 from "@/components/Card2/Card2";
import { PostDataType } from "@/data/types";
import Card6 from "@/components/Card6/Card6";
import HeaderFilter from "./HeaderFilter";

export interface SectionMagazine1Props {
  posts: PostDataType[];
  heading?: string;
  className?: string;
}

const SectionMagazine: FC<SectionMagazine1Props> = ({
  posts,
  heading = "모임 🎈 ",
  className = "",
}) => {

  console.log(posts);

  return (
    <div className={`nc-SectionMagazine1 ${className}`}>
      <HeaderFilter heading={heading} />
      {!posts.length && <span>Nothing we found!</span>}
        {/* {posts[0] && <Card2 size="large" post={posts[0]} />} */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {posts
            .map((item, index) => (
              <Card6 key={index} post={item} />
            ))}
        </div>
      </div>
  );
};

export default SectionMagazine;
