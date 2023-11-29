'use client'

import React, { useEffect, useState } from 'react'
// import fetch from 'node-fetch';
// import https from 'https';
import ModalCategories from "@/components/(meeting)/(modal)/ModalCategories";
import ModalTags from "@/components/(meeting)/(modal)/ModalTags";
// import { PostDataType } from "@/data/types";
import { MEETING_CATEGORIES } from "@/data/category";
import Pagination from "@/components/Pagination/Pagination";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import ArchiveFilterListBox from "@/components/ArchiveFilterListBox/ArchiveFilterListBox";
import Card11 from "@/components/Card11/Card11";
import SiteHeader from "@/app/SiteHeader";
import { useSession } from 'next-auth/react';



interface CategoryProps {
  id: any;
}


interface MeetingIdList {
  meetingIdList: number[];
  count: number;
}

interface Meeting {
  id: number;
  title: string;
  hostUserUuid?: string;
  hostNickname: string; // 호스트 닉네임 필드 추가
  meetingDatetime: string; // 미팅 날짜 필드 추가
  href: any;
  meetingHeaderImageUrl: string; // 피처드 이미지 필드 추가 (URL 형식)
  categories: any; // 카테고리 필드 추가
}

interface MeetingListResponse {
  result: Meeting[];
  isSuccess: boolean;
  message: string;
}


interface PostDataType {
  id: string | number;
  author: any;
  date: string;
  href: any;
  categories: any;
  title: string;
  featuredImage: string;
  desc?: string;
  like?: {
    count?: number;
    isLiked?: boolean;
  };
  bookmark?: {
    count?: number;
    isBookmarked?: boolean;
  };
  commentCount?: number;
  viewdCount?: number;
  readingTime?: number;
  postType?: "standard" | "video" | "gallery" | "audio";
  videoUrl?: string;
  audioUrl?: string | string[];
  galleryImgs?: string[];
}




const Category: React.FC<CategoryProps> = ({ id }) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [posts, setPosts] = useState<PostDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const FILTERS = [
    { name: "Most Recent" },
    { name: "Curated by Admin" },
    { name: "Most Appreciated" },
    { name: "Most Discussed" },
    { name: "Most Viewed" },
  ];

  const session = useSession();

  // console.log(id);


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const responseOne = await fetch(`https://moamoa-backend.duckdns.org/api/v1/category/meeting?userUuid=${session.data?.user.userUuid}&age=${session.data?.user.age}&gender=${session.data?.user.gender}&categoryId=${id}&companies=${session.data?.user.companyCategory}`);
        const dataOne = await responseOne.json() as MeetingIdList;

        const responseTwo = await fetch('https://moamoa-backend.duckdns.org/api/v1/meeting/list', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: dataOne.meetingIdList })
        });
        const dataTwo = await responseTwo.json() as MeetingListResponse;

        const mappedMeetings = dataTwo.result.map(meeting => ({
          id: meeting.id,
          title: meeting.title,
          author: meeting.hostNickname,
          date: new Date(meeting.meetingDatetime).toLocaleDateString("ko-KR"),
          href: `/meeting/detail/${meeting.id}`,
          featuredImage: "https://moa-meetingplatform-images.s3.ap-northeast-2.amazonaws.com/moa.png",
          categories: [id], // 예시에서는 카테고리 ID를 그대로 사용
        }));

        setPosts(mappedMeetings.slice(0, 10));
        // setPosts(mappedMeetings.slice(0, 10)); // 첫 10개의 미팅을 posts로 설정

      } catch (error) {
        console.error('An error occurred:', error);
        // setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();




  }, [id, session.data]);

  console.log(posts);
  return (
    <>
      <SiteHeader interData={[]} />
      <div className={`nc-PageArchive`}>
        <div className="container pt-10 pb-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
          <div>
            <div className="flex flex-col sm:justify-between sm:flex-row">
              <div className="flex space-x-2.5 rtl:space-x-reverse">
                <ModalCategories categories={MEETING_CATEGORIES} />
                <ModalTags id={parseInt(id, 10)} />

              </div>
              <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
              <div className="flex justify-end">
                {/* <ArchiveFilterListBox lists={FILTERS} /> */}
              </div>
            </div>

            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
              {posts.map((post) => (
                <Card11 key={post.id} post={post} />
              ))}
            </div>

            {/* PAGINATIONS */}
            <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
              {/* <Pagination />
              <ButtonPrimary>Show me more</ButtonPrimary> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Category;