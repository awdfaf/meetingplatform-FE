import React from "react";
import SectionLargeSlider from "@/app/(home)/SectionLargeSlider";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "@/data/posts";
import { MEETING_CATEGORIES } from "@/data/category";
import { DEMO_AUTHORS } from "@/data/authors";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";
import SectionMagazine1 from "@/components/Sections/SectionMagazine1";
import SectionAds from "@/components/Sections/SectionAds";
import SectionMagazine7 from "@/components/Sections/SectionMagazine7";
import SectionGridPosts from "@/components/Sections/SectionGridPosts";
import SectionMagazine8 from "@/components/Sections/SectionMagazine8";
import SectionMagazine9 from "@/components/Sections/SectionMagazine9";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import SectionVideos from "@/components/Sections/SectionVideos";
import SectionLatestPosts from "@/components/Sections/SectionLatestPosts";
import SectionMagazine2 from "@/components/Sections/SectionMagazine2";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import BottomNav from "@/components/(navigation)/(bottom)/BottomNav";
import Header from "@/components/(navigation)/(top)/Header";
import SiteHeader from "../SiteHeader";
import SectionMagazine from "@/components/Sections/SectionMagazine";
import CreateBtn from "@/components/Button/CreateBtn";
import Link from "next/link";
import ButtonPrimary from "@/components/Button/ButtonPrimary";


//
const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);
//

const PageHome = ({ }) => {
  return (
    <div className="nc-PageHome relative">
      <SiteHeader />

      <div className="container relative">
        <SectionLargeSlider

          heading="호스트 추천"
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          posts={DEMO_POSTS?.filter((_, i) => i < 3)}
        />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            headingCenter={true}
            categoryCardType="card2"
            className="pb-16 lg:pb-28"
            categories={MEETING_CATEGORIES.filter((_, i) => i < 10)}
          />
          <Link href={'/meeting/category/0/0'}>
            <ButtonPrimary>Show me more</ButtonPrimary>
          </Link>
        </div>
        {/* <SectionGridAuthorBox
          className="py-16 lg:py-28"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        /> */}
        <div className="relative py-16">
          {/* <BackgroundSection /> */}
          <SectionSliderNewAuthors
            heading="인기 호스트"
            subHeading="Say hello to future creator potentials"
            authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
          />
        </div>

        {/* <SectionSliderNewCategories
          className="py-16 lg:py-28"
          heading="Top trending topics"
          subHeading="Discover 233 topics"
          categories={MEETING_CATEGORIES.filter((_, i) => i < 10)}
          categoryCardType="card4"
        /> */}

        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card9"
            heading="Explore latest audio articles"
            subHeading="Click on the icon to enjoy the music or podcast 🎧"
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i > 3 && i < 10)}
          />
        </div> */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionMagazine className="py-16 lg:py-28" posts={MAGAZINE1_POSTS} />
        </div>
        {/* <SectionAds /> */}

        {/* <SectionMagazine7
          className="py-16 lg:py-28"
          posts={DEMO_POSTS_GALLERY.filter((_, i) => i < 6)}
        /> */}
      </div>

      {/* <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
        <div className="relative container">
          <SectionGridPosts
            className="py-16 lg:py-28"
            headingIsCenter
            postCardName="card10V2"
            heading="Explore latest video articles"
            subHeading="Hover on the post card and preview video 🥡"
            posts={DEMO_POSTS_VIDEO.filter((_, i) => i > 5 && i < 12)}
            gridClass="md:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </div> */}
      {/* 
      <div className="container ">
        <SectionMagazine8
          className="py-16 lg:py-28"
          posts={DEMO_POSTS_AUDIO.filter((_, i) => i < 6)}
        />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionMagazine9
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i >= 6 && i < 15)}
          />
        </div>



        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        <SectionMagazine2
          className="py-16 lg:py-24"
          heading="Life styles 🎨 "
          posts={MAGAZINE2_POSTS}
        />

        <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card11"
            heading="More design articles"
            subHeading="Over 1118 articles "
            posts={DEMO_POSTS.filter(
              (p, i) => i > 3 && i < 25 && p.postType === "standard"
            )}
          />
        </div>

        <SectionSubscribe2 className="pt-16 lg:pt-28" />

        <SectionVideos className="py-16 lg:py-28" />

        <SectionLatestPosts className="pb-16 lg:pb-28" />
      </div> */}
      <Link href={'/meeting/create'}>
        <CreateBtn />
      </Link>
    </div>
  );
};

export default PageHome;
