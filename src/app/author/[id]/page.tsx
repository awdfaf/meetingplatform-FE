"use client";

import React, { useEffect, useState } from "react";
import { DEMO_POSTS } from "@/data/posts";
import { PostDataType, TaxonomyType } from "@/data/types";
import Pagination from "@/components/Pagination/Pagination";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { DEMO_AUTHORS } from "@/data/authors";
import { MEETING_CATEGORIES } from "@/data/category";
import Nav from "@/components/Nav/Nav";
import NavItem from "@/components/NavItem/NavItem";
import SocialsList from "@/components/SocialsList/SocialsList";
import ArchiveFilterListBox from "@/components/ArchiveFilterListBox/ArchiveFilterListBox";
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2";
import Card11 from "@/components/Card11/Card11";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox/SectionGridCategoryBox";
import ButtonSecondary from "@/components/Button/ButtonSecondary";
import SectionSliderNewAuthors from "@/components/SectionSliderNewAthors/SectionSliderNewAuthors";
import NcImage from "@/components/NcImage/NcImage";
import { GlobeAltIcon, ShareIcon } from "@heroicons/react/24/outline";
import { avatarImgs } from "@/contains/fakeData";
import VerifyIcon from "@/components/VerifyIcon";
import FollowButton from "@/components/FollowButton";
import NcDropDown from "@/components/NcDropDown/NcDropDown";
import { SOCIALS_DATA } from "@/components/SocialsShare/SocialsShare";
import AccountActionDropdown from "@/components/AccountActionDropdown/AccountActionDropdown";
import Image from "next/image";
import { CogIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import MannerTemparature from "@/components/(ui)/setting/mannerTem";
import { InterestData } from "@/data/interestData";
import { InterestTpye } from "@/types/InterestType";
import { useSession } from 'next-auth/react';
import BackbuttonHeader from "@/components/(navigation)/(top)/BackbuttonHeader";
import ModeIcon from '@mui/icons-material/Mode';
import SettingsIcon from '@mui/icons-material/Settings';
import __categoryData from "../../../data/jsons/__categoryData.json";

// interface ProfileProps{
//   userUuid: string;
// }

interface ProfileData {
  userUuid?: string,
  nickname?: string,
  userIntroduce?: string,
  profileImageUrl?: string,
  reviewerCount?: number,
  userMannersTemparature?: number,
  sameWithLoggedInUser?: boolean
}

interface ProfileResponse {
  result: ProfileData;
  isSuccess: boolean;
  message: string;
}

interface CategoryData {
  tag: {
    id: number;
    name: string;
    // 추가적인 필요한 항목이 있다면 여기에 추가
  }[];
}

interface SessionUser {
  userUuid: string;
  token: string;
  // 필요한 다른 속성들...
}

// async function getData(userUuid:string) {
// const res = await fetch(`https://moa-backend.duckdns.org/api/v1/user/profile/${userUuid}`)
//   if (!res.ok) {
//     throw new Error('Failed to fetch data')
//   }

// return res.json()
// }
const posts: PostDataType[] = DEMO_POSTS.filter((_, i) => i < 12);
const FILTERS = [
  { name: "Most Recent" },
  { name: "Curated by Admin" },
  { name: "Most Appreciated" },
  { name: "Most Discussed" },
  { name: "Most Viewed" },
];
const TABS = ["좋아요", "참여", "진행"];

const PageAuthor = () => {

  // const data = await getData(id)
  //   console.log(data.result.nickname)

  const { data: session } = useSession();
  // const session = useSession();
  // const userUUID = session.data?.user.userUuid
  // console.log("userUUID",userUUID)
  const [userData, setUserData] = useState<any>({}); // 사용자 데이터를 저장할 상태
  const [tabActive, setTabActive] = useState<string>(TABS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  
  const userUuid = session?.user?.userUuid.toString();
  const token = session?.user?.token;
  console.log(userUuid)

  // const userUuid = session?.user.userUuid || '';

  useEffect(() => {
    const getData = async () => {
      try {

        if (!token || !userUuid) {
          return;
        }

        const res = await fetch(`https://moa-backend.duckdns.org/api/v1/user/profile/${userUuid}`, {
        headers:  {
        Authorization: `Bearer ${token}`,},
      });
      
        // const data = await res.json();
        if (res.ok) {
          const result: ProfileResponse= await res.json();
          const userData: ProfileData= result.result;
          setUserData(userData);
        } else {
          // 응답이 실패하면 에러 상태 업데이트
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        // 네트워크 오류 등의 경우 에러 상태 업데이트
        setError('Failed to fetch data');
      } finally {
        // 데이터 로딩이 완료되면 로딩 상태 업데이트
        setIsLoading(false);
      }
    };

    // fetchData 함수 호출
    getData();
  }, [token, userUuid]);


  // const [userInterestName, setUserInterestName] = useState<string | null>(null);
  // useEffect(() => {
  //   const getUserCategory = async () => {
  //     try {
  //       if (!token || !userUuid) {
  //         return null;
  //       }
  
  //       const restwo = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/category/user?userUuid=${userUuid}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  
  //       if (!restwo.ok) {
  //         throw new Error('Failed to fetch userCategory');
  //       }
  
  //       const data = await restwo.json();
  
  //       // JSON 파일에서 관심사와 category_id를 가져와서 userCategory와 비교
  //       const interestsFromJson: TaxonomyType[] = __categoryData?.tag?.map((item: { id: any; name: any; }) => ({
  //         id: item.id,
  //         name: item.name,
  //         // 추가적인 필요한 항목이 있다면 여기에 추가
  //       }));
  
  //       const userCategory = data.result;
  
  //       // userCategory와 관련된 관심사 필터링
  //       const userInterest = interestsFromJson.find((interest) => interest.id === userCategory);
  
  //     // userInterest가 있을 때 state에 설정
  //     if (userInterest) {
  //       setUserInterestName(userInterest.name);
  //     } else {
  //       setUserInterestName(null);
  //     }
  //   } catch (error:any) {
  //     console.error(`Failed to get userCategory: ${error.message}`);
  //     setUserInterestName(null);
  //   }
  // };

  
  //   // 여기서 userInterest 변수를 이용하여 필요한 작업을 수행할 수 있습니다.
  // }, [token, userUuid, __categoryData.tag]);

// // 모든 관심사와 그에 해당하는 category_id를 가져오는 함수
// async function getInterests() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/category`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch interests');
//   }
//   const data = await res.json();
//   const interests = data.result.flatMap((category: { subCategories: any; }) => category.subCategories);
//   return data.result; // 이 부분은 실제 API 응답에 따라 변경이 필요할 수 있습니다.
// }

// // 사용자의 category_id를 가져오는 함수
// async function getUserCategory() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/v1/category/user?userUuid=${userUuid}`);
//   if (!res.ok) {
//     throw new Error('Failed to fetch userCategory');
//   }
//   const data = await res.json();
//   return data.result; // 이 부분은 실제 API 응답에 따라 변경이 필요할 수 있습니다.
// }

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const allInterests = await getInterests();
//       const userCategory = await getUserCategory();
//       const userInterests = allInterests.filter((interest: { id: any; }) => userCategory.includes(interest.id));
//       setInterests(userInterests);
//     } catch (error) {
//       console.error('An error occurred:', error);
//       setError('Failed to fetch data');
//     } finally {
//       setIsLoading(false);
//     }
//   };
  
//   fetchData();
// }, [userUuid]);

  return (
    
    <div className={`nc-PageAuthor `}>
      <BackbuttonHeader contents={""} />
      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-40 md:h-60 2xl:h-72">
          <NcImage
            alt="프로필 사진"
            containerClassName="absolute inset-0"
            sizes="(max-width: 1280px) 100vw, 1536px"
            src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
            fill
            priority
          />
        </div>
        <div className="container -mt-10 lg:-mt-16">
          <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-3xl md:rounded-[40px] shadow-xl flex flex-col md:flex-row">
            <div className="w-32 lg:w-40 flex-shrink-0 mt-12 sm:mt-0">
              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold rounded-full w-20 h-20 text-xl lg:text-2xl lg:w-36 lg:h-36 ring-4 ring-white dark:ring-0 shadow-2xl z-0">
                <Image
                  alt="Avatar"
                  // src={userData?.profileImageUrl}
                  src={userData.profileImageUrl ||"/images/basicProfile.jpg"}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1536px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/*  */}
            <div className="pt-5 md:pt-1 lg:ml-6 xl:ml-12 flex-grow">
              <div className="max-w-screen-sm space-y-5 ">
                <h2 className="inline-flex items-center text-2xl sm:text-xl lg:text-4xl font-semibold">
                  <span>{userData?.nickname}</span>
{/*                   <VerifyIcon
                    className="ml-2"
                    iconClass="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8"
                  /> */}
                  <MannerTemparature temparature={userData?.userMannersTemparature}/>
                </h2>
                <div className="h-14">
                <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                {userData?.userIntroduce || "특별함 보다 소소한 행복을 추구해요."}
                </span>
                <span>
{/*                   <NcImage
                  src="http://www.w3.org/2000/svg"
                  alt="edit button"
                  width={20}
                  height={20}
                  /> */}
                </span>
                </div>
{/*                 <a
                  href="#"
                  className="flex items-center text-xs font-medium space-x-2.5 rtl:space-x-reverse cursor-pointer text-neutral-500 dark:text-neutral-400 truncate"
                >
                  <GlobeAltIcon className="flex-shrink-0 w-4 h-4" />
                  <span className="text-neutral-700 dark:text-neutral-300 truncate">
                    https://example.com/me
                  </span>
                </a> */}
                {/* <SocialsList itemClass="block w-7 h-7" /> */}
                <div className='profile_bottom_box mt-7'>
                <ul className='intrest_badge'>
                    {InterestData.map((e:InterestTpye)=>(
                      <li key={e.id} className='inline-block mr-2 bg-slate-200 rounded-full h-6 px-3 leading-6 font-semibold text-[13px] text-black'>{e.content}</li>
                    ))
                    }
                  </ul>
                </div>


                  
              </div>
            </div>

            {/*  */}
            <div className="absolute md:static start-5 end-5 top-4 sm:start-auto sm:top-5 sm:end-5 flex justify-end">
{/*               <FollowButton
                isFollowing={false}
                fontSize="text-sm md:text-base font-medium"
                sizeClass="px-4 py-1 md:py-2.5 h-8 md:!h-10 sm:px-6 lg:px-8"
              /> */}

              <div className="mx-2">
{/*                 <NcDropDown
                  className="flex-shrink-0 flex items-center justify-center focus:outline-none h-10 w-10 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-full"
                  renderTrigger={() => <ShareIcon className="h-5 w-5" />}
                  onClick={() => {}}
                  data={SOCIALS_DATA}
                /> */}
                <button className="bg-gray-300 rounded-full text-[18px] h-fit w-fit p-0.5">
                  <Link href="/setting" ><SettingsIcon className="h-8 w-8"/></Link>
                  </button>
              </div>

              <button className="bg-gray-300 rounded-full text-[18px] h-fit w-fit p-0.5">
              <Link href="/editProfile"><ModeIcon className="h-8 w-8"/></Link>
              </button>

{/* TODO 타인의 프로필일때 살려야함 */}
              {/* <AccountActionDropdown containerClassName="h-9 w-9 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700" /> */}
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <Nav className="sm:space-x-2 rtl:space-x-reverse">
              {TABS.map((item, index) => (
                <NavItem
                  key={index}
                  isActive={tabActive === item}
                  // onClick={() => handleClickTab(item)}
                >
                  {item}
                </NavItem>
              ))}
            </Nav>
            <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
            <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div>
          </div>

          {/* LOOP ITEMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {posts.map((post) => (
              <Card11 key={post.id} post={post} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </main>

        {/* === SECTION 5 === */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={MEETING_CATEGORIES.filter((_, i) => i < 10)}
          />
          <div className="text-center mx-auto mt-10 md:mt-16">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div>
        </div>

        {/* === SECTION 5 === */}
        <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        />

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageAuthor

// import ProfileContents from '@/components/(page)/profile/ProfileContents'
// import React from 'react'

// function page({params}: {params: {uuid: string}}) {
//   return (
//     <div>
//       <ProfileContents uuid={params.uuid} />
//     </div>
//   )
// }

// export default page