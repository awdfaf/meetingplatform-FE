import { Route } from "@/routers/types";
import { StaticImageData } from "next/image";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: any;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: any;
  count?: number;
  thumbnail?: string | StaticImageData;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  tag: TagType[];
}
export interface TagType {
  id: number;
  name: string;
  href: any;
}

export interface PostAuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string | StaticImageData;
  bgImage?: string | StaticImageData;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: any;
}

// export interface PostDataType {
//   id: string | number;
//   author: PostAuthorType;
//   date: string;
//   href: any;
//   categories: TaxonomyType[];
//   title: string;
//   featuredImage: string | StaticImageData;
//   desc?: string;
//   like: {
//     count: number;
//     isLiked: boolean;
//   };
//   bookmark: {
//     count: number;
//     isBookmarked: boolean;
//   };
//   commentCount: number;
//   viewdCount: number;
//   readingTime: number;
//   postType: "standard" | "video" | "gallery" | "audio";
//   videoUrl?: string;
//   audioUrl?: string | string[];
//   galleryImgs?: string[];
// }

export interface PostDataType {
  id: string | number;
  author?: any;
  date: string;
  href: any | string;
  categories: any;
  title: string;
  featuredImage: string ;
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

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";
