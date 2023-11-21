

// import React, { FC } from "react";
// import ModalCategories from "@/components/(meeting)/(modal)/ModalCategories";
// import ModalTags from "@/components/(meeting)/(modal)/ModalTags";
// import { PostDataType } from "@/data/types";
// import { MEETING_CATEGORIES } from "@/data/category";
// import Pagination from "@/components/Pagination/Pagination";
// import ButtonPrimary from "@/components/Button/ButtonPrimary";
// import ArchiveFilterListBox from "@/components/ArchiveFilterListBox/ArchiveFilterListBox";
// import Card11 from "@/components/Card11/Card11";
// import SiteHeader from "@/app/SiteHeader";
// import __posts from "../../../../../data/jsons/__posts.json";
// import { DEMO_AUTHORS } from "@/data/authors";
// import { getServerSession } from "next-auth";
// import { options } from "@/app/api/auth/[...nextauth]/options";
// import fetch from 'node-fetch';
// import https from 'https';

// interface MeetingIdList {
//   meetingIdList: number[];
//   count: number;
// }

// interface Meeting {
//   id: number;
//   title: string;
//   hostUserUuid: string;
//   hostNickname: string;
//   meetingDatetime: string;
//   href: any;
//   meetingHeaderImageUrl: number;
// }

// interface MeetingListResponse {
//   result: Meeting[];
//   isSuccess: boolean;
//   message: string;
// }

// const fetchData = async (info: any) => {
//   try {

//     // SSL 인증서 검증을 무시하는 HTTPS 에이전트 생성
//     const httpsAgent = new https.Agent({
//       rejectUnauthorized: false, // SSL 인증서 검증 건너뛰기
//     });

//     // 첫 번째 요청
//     const responseOne = await fetch(`https://moamoa-backend.duckdns.org/api/v1/category/meeting?userUuid=${info.userUuid}&age=${info.age}&gender=${info.gender}&categoryId=${info.categoryId}&companies=${info.companies}`,
//       { agent: httpsAgent });
//     const dataOne = await responseOne.json() as MeetingIdList;



//     // // 두 번째 요청 (첫 번째 요청의 데이터를 사용)
//     const responseTwo = await fetch('https://moamoa-backend.duckdns.org/api/v1/meeting/list', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         ids: dataOne.meetingIdList,
//       }),
//       agent: httpsAgent
//     });
//     const dataTwo = await responseTwo.json() as MeetingListResponse;

//     console.log(dataTwo.result);

//     // 백엔드에서 받은 데이터를 Meeting 배열로 변환합니다.
//     const meetings = dataTwo.result.map(meeting => ({
//       ...meeting,
//       href: `/meeting/detail/${meeting.id}`,
//     }));

//     // console.log(meetings);
//     return meetings;

//   } catch (error) {
//     // 에러 처리
//     console.error('An error occurred:', error);
//   }

// };

// const DEMO_POSTS = __posts.map((post, index): PostDataType => {
//   //  ##########  GET CATEGORY BY CAT ID ######## //
//   const categories = post.categoriesId.map(
//     (id) => MEETING_CATEGORIES.filter((taxonomy) => taxonomy.id === id)[0]
//   );

//   return {
//     ...post,
//     id: `DEMO_POSTS_${index + 1}`,
//     author: DEMO_AUTHORS.filter((user) => user.id === post.authorId)[0],
//     categories: [categories[0]],
//   } as PostDataType;
// });


// // Tag and category have same data type - we will use one demo data
// const posts = DEMO_POSTS.filter((_, i) => i < 10);

// export default async function PageArchive({ params }: { params: { slug: string } }) {
//   const FILTERS = [
//     { name: "Most Recent" },
//     { name: "Curated by Admin" },
//     { name: "Most Appreciated" },
//     { name: "Most Discussed" },
//     { name: "Most Viewed" },
//   ];
//   const session = await getServerSession(options);

//   const info = {
//     userUuid: session?.user.userUuid,
//     age: session?.user.age,
//     gender: session?.user.gender,
//     categoryId: params.slug[1],
//     companies: session?.user.companyCategory
//   }

//   const meetings = fetchData(info);



//   return (
//     <>
//       <SiteHeader />
//       <div className={`nc-PageArchive`}>
//         <div className="container pt-10 pb-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
//           <div>
//             <div className="flex flex-col sm:justify-between sm:flex-row">
//               <div className="flex space-x-2.5 rtl:space-x-reverse">
//                 <ModalCategories categories={MEETING_CATEGORIES} />
//                 <ModalTags id={parseInt(params.slug[0], 10)} />

//               </div>
//               <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
//               <div className="flex justify-end">
//                 <ArchiveFilterListBox lists={FILTERS} />
//               </div>
//             </div>

//             {/* LOOP ITEMS */}
//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
//               {meetings.map((post) => (
//                 <Card11 key={post.id} post={post} />
//               ))}
//             </div>

//             {/* PAGINATIONS */}
//             <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
//               <Pagination />
//               <ButtonPrimary>Show me more</ButtonPrimary>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };


