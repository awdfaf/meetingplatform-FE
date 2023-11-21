// 클라이언트 사이드에서만 실행될 코드임을 명시합니다.
"use client";

// 리액트 기본 및 Headless UI 컴포넌트를 임포트합니다.
import { FC, Fragment, ReactNode, useEffect, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
// Heroicons 아이콘을 임포트합니다.
import {
  ExclamationTriangleIcon,
  HashtagIcon,
  LifebuoyIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
// Next.js의 이미지 컴포넌트를 임포트합니다.
import Image from "next/image";
// 더미 데이터를 임포트합니다.
import { DEMO_AUTHORS } from "@/data/authors";
import { MEETING_CATEGORIES } from "@/data/category";
import { DEMO_POSTS } from "@/data/posts";
// Next.js의 링크 컴포넌트와 라우터 훅을 임포트합니다.
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  href?: string;
}

interface Author {
  id: number;
  displayName: string; // 'name' 대신 'displayName'으로 변경합니다.
  avatar: string;
  href?: string;
}

// 예시 데이터를 선언합니다.
const examplePosts: Post[] = [
  { id: 1, title: 'asd 1', href: "/login" },
  // ...더 많은 게시물 데이터
];
const exampleAuthors: Author[] = [
  { id: 1, displayName: 'Author 1', avatar: "/images/moa1.png", href: "/login" },
  // ...더 많은 저자 데이터
];

// 더미 데이터에서 필요한 부분만 추출합니다. (최대 9개)
const categories = MEETING_CATEGORIES.filter((_, i) => i < 9);
// const posts = DEMO_POSTS.filter((_, i) => i < 5);
// const authors = DEMO_AUTHORS.filter((_, i) => i < 9);

// 여러 클래스명을 조건부로 결합하여 사용하기 위한 유틸리티 함수입니다.
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

// Props 타입을 정의하는 인터페이스입니다.
interface Props {
  renderTrigger?: () => ReactNode;
}

// SearchModal 컴포넌트를 정의합니다. FC는 Function Component의 약어입니다.
const SearchModal: FC<Props> = ({ renderTrigger }) => {

  // 상태를 선언합니다.
  const [posts, setPosts] = useState<Post[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  // 모달의 열림 상태와 원시 검색 쿼리 상태를 관리하는 state 훅입니다.
  const [open, setOpen] = useState(false);
  const [rawQuery, setRawQuery] = useState("ㅁㄴㄹㅇㄹㅇㄴㅁ");

  // 컴포넌트가 마운트될 때 백엔드로부터 데이터를 가져오는 것을 시뮬레이션합니다.
  useEffect(() => {
    // API 요청을 보내고 데이터를 받는 것을 시뮬레이션합니다.
    // 실제로는 여기서 fetch 또는 axios를 사용할 것입니다.
    const getSearchData = async () => {
      const response = await fetch(`https://moamoa-backend.duckdns.org/api/v1/search/related-search?title=${rawQuery}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`Fetch failed with status: ${response.status}`);
      }
      const data = await response.json();

      // console.log(data);

      // 백엔드에서 받은 데이터를 Post 배열로 변환합니다.
      const fetchedPosts: Post[] = data.map((post: any) => ({
        id: post.id,
        title: post.meetingTitle,
        href: `/meeting/detail/${post.id}`, // 각 포스트의 ID를 기반으로 href를 설정합니다.
      }));

      setPosts(fetchedPosts)
    }

    getSearchData()

    const postsfilter = posts.filter((_, i) => i < 5);
    const authorsfilter = authors.filter((_, i) => i < 9);
    setPosts(postsfilter);
    setAuthors(exampleAuthors);
  }, [rawQuery]);




  // next/router에서 제공하는 useRouter 훅을 사용하여 라우팅 관련 기능을 사용할 수 있습니다.
  const router = useRouter();

  // 사용자가 입력한 검색 쿼리를 소문자로 변환하고, 특정 문자를 제거합니다.
  const query = rawQuery.toLowerCase().replace(/^[#>]/, "");

  // 입력된 쿼리에 따라 게시물을 필터링합니다.
  const filteredPosts =
    rawQuery === "#"
      ? posts // '#' 입력 시 모든 게시물을 보여줍니다.
      : query === "" || rawQuery.startsWith(">")
        ? [] // 쿼리가 비어있거나 '>'로 시작하면 빈 배열을 반환합니다.
        : posts.filter((project) => project.title.toLowerCase().includes(query)); // 쿼리에 맞는 게시물만 필터링합니다.

  // 입력된 쿼리에 따라 프로젝트(카테고리)를 필터링합니다.
  const filteredProjects =
    rawQuery === "#"
      ? categories // '#' 입력 시 모든 카테고리를 보여줍니다.
      : query === "" || rawQuery.startsWith(">")
        ? [] // 쿼리가 비어있거나 '>'로 시작하면 빈 배열을 반환합니다.
        : categories.filter((project) =>
          project.name.toLowerCase().includes(query)
        ); // 쿼리에 맞는 카테고리만 필터링합니다.

  // 입력된 쿼리에 따라 사용자를 필터링합니다.
  const filteredUsers =
    rawQuery === ">"
      ? authors // '>' 입력 시 모든 사용자를 보여줍니다.
      : query === "" || rawQuery.startsWith("#")
        ? [] // 쿼리가 비어있거나 '#'로 시작하면 빈 배열을 반환합니다.
        : authors.filter((user) =>
          user.displayName.toLowerCase().includes(query)
        ); // 쿼리에 맞는 사용자만 필터링합니다.

  // 검색 결과를 콘솔에 로깅하는 코드는 주석 처리되어 있습니다.
  // console.log(posts);

  // 모달 컴포넌트의 JSX 마크업을 반환합니다.
  return (
    <>
      {/* 모달을 열기 위한 div 요소입니다. 클릭 시 모달이 열립니다. */}
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {/* renderTrigger가 제공되면 해당 함수를 실행하여 렌더링하고, 그렇지 않으면 기본 버튼을 렌더링합니다. */}
        {renderTrigger ? (
          renderTrigger()
        ) : (
          // 모달을 열기 위한 버튼의 스타일을 정의합니다. 다크 모드에 대응하는 클래스도 포함되어 있습니다.
          <button className="flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center">
            {/* SVG 아이콘을 정의합니다. 여기서는 검색 아이콘으로 사용됩니다. */}
            <svg
              width={22}
              height={22}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 돋보기 아이콘의 외곽선을 그립니다. */}
              <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* 돋보기 아이콘의 손잡이 부분을 그립니다. */}
              <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div >

      {/*  Transition 컴포넌트를 사용하여 모달의 등장과 사라짐에 애니메이션을 적용합니다. */}
      < Transition.Root
        show={open} // 모달의 표시 상태를 결정하는 show 속성입니다.
        as={Fragment} // React.Fragment를 사용하여 불필요한 div 태그를 추가하지 않습니다.
        afterLeave={() => setRawQuery("a")} // 모달이 닫힌 후 실행될 함수입니다. 여기서는 rawQuery 상태를 초기화합니다.
        appear // 최초 마운트 시 애니메이션을 적용합니다.
      >
        {/* Dialog 컴포넌트를 사용하여 모달의 기본적인 레이아웃과 이벤트 핸들링을 정의합니다. */}
        < Dialog
          as="div" // Dialog의 HTML 태그를 div로 정의합니다.
          className="relative z-[99]" // z-index를 통해 다른 요소들 위에 표시되도록 설정합니다.
          onClose={() => setOpen(false)} // Dialog가 닫힐 때 실행될 함수입니다. 모달 상태를 닫힘으로 설정합니다.
        >
          {/* 모달의 배경에 대한 Transition 효과를 정의합니다. */}
          <Transition.Child
            as={Fragment} // Fragment를 사용하여 불필요한 태그를 생성하지 않습니다.
            enter="ease-out duration-300" // 모달 등장 애니메이션의 속성입니다.
            enterFrom="opacity-0" // 등장 애니메이션 시작 상태입니다. 투명도 0.
            enterTo="opacity-100" // 등장 애니메이션 끝 상태입니다. 투명도 100.
            leave="ease-in duration-200" // 모달 퇴장 애니메이션의 속성입니다.
            leaveFrom="opacity-100" // 퇴장 애니메이션 시작 상태입니다. 투명도 100.
            leaveTo="opacity-0" // 퇴장 애니메이션 끝 상태입니다. 투명도 0.
          >
            {/* 모달 배경을 정의합니다. 투명한 검은색 배경으로, 투명도를 조절하여 등장과 퇴장 효과를 줍니다. */}
            < div className="fixed inset-0 bg-black/40 transition-opacity" />
          </Transition.Child >

          {/* 모달 창 자체에 대한 위치, 오버플로우, 패딩 설정을 포함한 컨테이너를 정의합니다. */}
          < div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20" >
            {/* 모달 창에 대한 Transition 효과를 정의합니다. */}
            < Transition.Child
              as={Fragment} // Fragment를 사용하여 불필요한 태그를 생성하지 않습니다.
              enter="ease-out duration-300" // 모달 창 등장 애니메이션의 속성입니다.
              enterFrom="opacity-0 scale-95" // 등장 애니메이션 시작 상태입니다. 투명도 0, 축소 상태.
              enterTo="opacity-100 scale-100" // 등장 애니메이션 끝 상태입니다. 투명도 100, 원래 크기.
              leave="ease-in duration-100" // 모달 창 퇴장 애니메이션의 속성입니다.
              leaveFrom="opacity-100 scale-100" // 퇴장 애니메이션 시작 상태입니다. 투명도 100, 원래 크기.
              leaveTo="opacity-0 scale-100" // 퇴장 애니메이션 끝 상태입니다. 투명도 0, 크기는 변하지 않음.
            >
              {/* Dialog.Panel 컴포넌트는 모달 내부의 컨텐츠 영역을 정의합니다. */}
              < Dialog.Panel
                className="block mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                as="form" // Dialog.Panel을 form으로 사용하겠다고 정의합니다.
                onSubmit={(e) => { // 폼 제출 이벤트 핸들러입니다.
                  e.preventDefault(); // 기본 폼 제출 동작을 방지합니다.
                  router.push("/search"); // 사용자를 검색 페이지로 라우팅합니다.
                  setOpen(false); // 모달을 닫습니다.
                }}
              >
                {/* Combobox 컴포넌트를 사용하여 자동 완성 기능을 가진 입력 필드를 만듭니다. */}
                < Combobox
                  onChange={(item: any) => { // 선택 항목이 변경되었을 때의 이벤트 핸들러입니다.
                    router.push(item.href); // 선택된 항목의 href에 따라 라우팅합니다.
                    setOpen(false); // 모달을 닫습니다.
                  }}
                  name="searchpallet" // 입력 필드의 이름을 정의합니다.
                >
                  {/* 검색 아이콘과 입력 필드를 포함하는 div를 정의합니다. */}
                  <div className="relative">
                    {/* 검색 아이콘을 정의합니다. */}
                    < MagnifyingGlassIcon
                      className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400" // 아이콘 스타일을 정의합니다.
                      aria-hidden="true" // 스크린 리더에서는 이 아이콘을 숨깁니다.
                    />
                    {/* 실제 사용자가 입력할 수 있는 입력 필드입니다. */}
                    {/* 검색 입력 필드의 스타일을 정의합니다. */}
                    <Combobox.Input
                      className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="Search..." // 입력 필드의 플레이스홀더 텍스트입니다.
                      onChange={(event) => setRawQuery(event.target.value)} // 입력 값이 변경될 때의 이벤트 핸들러입니다.
                    />
                  </div >

                  {/* 필터링된 프로젝트, 사용자 또는 게시물이 있을 때만 결과 옵션을 표시합니다. */}
                  {
                    (filteredProjects.length > 0 ||
                      filteredUsers.length > 0 ||
                      filteredPosts.length > 0) && (
                      <Combobox.Options
                        static // 옵션 목록이 항상 렌더링되도록 합니다.
                        className="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2" // 옵션 목록의 스타일을 정의합니다.
                      >
                        {/* 필터링된 게시물이 있을 경우, 게시물 제목을 표시합니다. */}
                        {filteredPosts.length > 0 && (
                          <li>
                            <h2 className="text-xs font-semibold text-gray-900">
                              Posts
                            </h2>
                            {/* // 게시물 섹션의 제목입니다. */}
                            <ul className="-mx-4 mt-2 text-sm text-gray-700">
                              {/* // 게시물 목록의 스타일을 정의합니다. */}
                              {/* 필터링된 게시물 목록을 매핑하여 표시합니다. */}
                              {filteredPosts.map((post) => (
                                <Combobox.Option
                                  key={post.id} // 각 옵션에는 고유한 key가 필요합니다.
                                  value={post} // 옵션의 값으로 post 객체를 전달합니다.
                                  className={({ active }) => // 옵션이 활성 상태일 때의 스타일을 정의합니다.
                                    classNames(
                                      "flex select-none items-center px-4 py-2", // 공통 스타일을 적용합니다.
                                      active && "bg-indigo-600 text-white" // 활성 상태일 때의 스타일을 적용합니다.
                                    )
                                  }
                                >
                                  {({ active }) => ( // 옵션의 내용을 랜더링합니다.
                                    <>
                                      {/* 각 옵션에 표시될 아이콘을 정의합니다. 여기서는 시계 아이콘을 사용합니다. */}
                                      <ClockIcon
                                        className={classNames(
                                          "h-6 w-6 flex-none", // 아이콘의 크기와 여백을 정의합니다.
                                          active ? "text-white" : "text-gray-400" // 활성 상태에 따라 아이콘 색상을 달리합니다.
                                        )}
                                        aria-hidden="true" // 스크린 리더에게 이 아이콘을 숨깁니다.
                                      />
                                      {/* 검색된 게시물의 제목을 표시하는 부분입니다. */}
                                      <span className="ms-3 flex-auto truncate">
                                        {post.title}
                                        {/* // 게시물의 제목을 표시합니다. */}
                                      </span>
                                    </>
                                  )}
                                </Combobox.Option>
                              ))}
                            </ul>
                          </li>
                        )}

                        {/* 필터링된 프로젝트(카테고리)가 있을 경우, 해당 섹션을 렌더링합니다. */}
                        {filteredProjects.length > 0 && (
                          <li>
                            {/* 섹션 제목을 정의합니다. 여기서는 'Categories'입니다. */}
                            <h2 className="text-xs font-semibold text-gray-900">
                              Categories
                            </h2>
                            {/* 카테고리 목록을 위한 ul 태그입니다. */}
                            <ul className="-mx-4 mt-2 text-sm text-gray-700">
                              {/* 필터링된 프로젝트(카테고리) 목록을 매핑하여 렌더링합니다. */}
                              {filteredProjects.map((project) => (
                                <Combobox.Option
                                  key={project.id} // 각 옵션에는 고유한 key가 필요합니다.
                                  value={project} // 옵션의 값으로 project 객체를 전달합니다.
                                  className={({ active }) => // 활성 상태에 따른 스타일을 지정합니다.
                                    classNames(
                                      "flex select-none items-center px-4 py-2", // 공통 스타일을 적용합니다.
                                      active && "bg-indigo-600 text-white" // 활성 상태일 때의 스타일을 적용합니다.
                                    )
                                  }
                                >
                                  {({ active }) => ( // 옵션의 내용을 랜더링합니다.
                                    <>
                                      {/* 각 옵션에 표시될 아이콘을 정의합니다. 여기서는 해시태그 아이콘을 사용합니다. */}
                                      <HashtagIcon
                                        className={classNames(
                                          "h-6 w-6 flex-none", // 아이콘의 크기와 여백을 정의합니다.
                                          active ? "text-white" : "text-gray-400" // 활성 상태에 따라 아이콘 색상을 달리합니다.
                                        )}
                                        aria-hidden="true" // 스크린 리더에게 이 아이콘을 숨깁니다.
                                      />
                                      {/* 카테고리(프로젝트)의 이름을 표시합니다. */}
                                      <span className="ms-3 flex-auto truncate">
                                        {project.name}
                                        {/* // 카테고리(프로젝트)의 이름을 렌더링합니다. */}
                                      </span>
                                    </>
                                  )}
                                </Combobox.Option>
                              ))}
                            </ul>
                          </li>
                        )}

                        {filteredUsers.length > 0 && (
                          <li>
                            {/* "Authors" 섹션의 제목입니다. */}
                            <h2 className="text-xs font-semibold text-gray-900">
                              Authors
                            </h2>
                            {/* 사용자 목록을 렌더링합니다. */}
                            <ul className="-mx-4 mt-2 text-sm text-gray-700">
                              {/* 필터링된 사용자를 매핑하여 Combobox.Option 컴포넌트로 나열합니다. */}
                              {/* 각 사용자를 선택 가능한 옵션으로 렌더링합니다. */}
                              {filteredUsers.map((user) => (
                                <Combobox.Option
                                  key={user.id} // 각 옵션에는 고유한 키가 필요합니다.
                                  value={user} // 옵션의 값으로 사용자 객체를 사용합니다.
                                  className={({ active }) => // 활성 상태에 따라 클래스를 조건부로 적용합니다.
                                    classNames(
                                      "flex select-none items-center px-4 py-2", // 기본 스타일을 적용합니다.
                                      active && "bg-indigo-600 text-white" // 활성 상태일 때의 스타일을 적용합니다.
                                    )
                                  }
                                >
                                  {/* 사용자의 아바타 이미지를 렌더링합니다. */}
                                  <Image
                                    src={user.avatar} // 사용자의 아바타 이미지 주소입니다.
                                    alt="author" // 대체 텍스트로 "author"를 사용합니다.
                                    className="h-6 w-6 flex-none rounded-full" // 이미지 스타일을 적용합니다.
                                    sizes="30px" // 이미지 크기를 설정합니다.
                                    width={30} // 이미지 너비를 설정합니다.
                                    height={30} // 이미지 높이를 설정합니다.
                                  />
                                  <span className="ms-3 flex-auto truncate">
                                    {user.displayName}
                                  </span>
                                </Combobox.Option>
                              ))}
                            </ul>
                          </li>
                        )}
                      </Combobox.Options>
                    )
                  }

                  {/* '?' 쿼리가 있을 때 '도움말' 섹션을 렌더링합니다. */}
                  {
                    rawQuery === "?" && (
                      <div className="py-14 px-6 text-center text-sm sm:px-14">
                        {/* 도움말 아이콘 */}
                        <LifebuoyIcon
                          className="mx-auto h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        <p className="mt-4 font-semibold text-gray-900">
                          Help with searching
                        </p>
                        <p className="mt-2 text-gray-500">
                          Use this tool to quickly search for users and projects
                          across our entire platform. You can also use the search
                          modifiers found in the footer below to limit the results
                          to just users or projects.
                        </p>
                      </div>
                    )
                  }

                  {
                    query !== "" &&
                    rawQuery !== "?" &&
                    filteredProjects.length === 0 &&
                    filteredUsers.length === 0 && (
                      <div className="py-14 px-6 text-center text-sm sm:px-14">
                        <ExclamationTriangleIcon
                          className="mx-auto h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                        <p className="mt-4 font-semibold text-gray-900">
                          No results found
                        </p>
                        <p className="mt-2 text-gray-500">
                          We couldn’t find anything with that term. Please try
                          again.
                        </p>
                      </div>
                    )
                  }

                  <div className="flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700">
                    Type{" "}
                    <kbd
                      className={classNames(
                        "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                        rawQuery.startsWith("#")
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-400 text-gray-900"
                      )}
                    >
                      #
                    </kbd>{" "}
                    <span className="sm:hidden">for projects,</span>
                    <span className="hidden sm:inline">
                      to access Category,
                    </span>
                    <kbd
                      className={classNames(
                        "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                        rawQuery.startsWith(">")
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-400 text-gray-900"
                      )}
                    >
                      &gt;
                    </kbd>{" "}
                    for users,{" "}
                    <kbd
                      className={classNames(
                        "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                        rawQuery === "?"
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-400 text-gray-900"
                      )}
                    >
                      ?
                    </kbd>{" "}
                    for help{" "}
                    {/* <Link
                      href={"/search"}
                      className="mx-1 flex h-5 px-1.5 items-center justify-center rounded border bg-white sm:mx-2 border-primary-6000 text-neutral-900"
                      onClick={() => setOpen(false)}
                    >
                      Go to search pageasda
                    </Link>{" "} */}
                  </div>
                </Combobox >
              </Dialog.Panel >
            </Transition.Child >
          </div >
        </Dialog >
      </Transition.Root >
    </>
  );
};

export default SearchModal;
