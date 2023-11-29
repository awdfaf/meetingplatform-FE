"use client";

import React, { FC, useRef, useState } from "react";
import Avatar from "@/components/Avatar/Avatar";
import NcDropDown, { NcDropDownItem } from "@/components/NcDropDown/NcDropDown";
import twFocusClass from "@/utils/twFocusClass";
import ModalEditComment from "./ModalEditComment";
import ModalDeleteComment from "./ModalDeleteComment";
import ModalReportItem from "@/components/ModalReportItem/ModalReportItem";
import Link from "next/link";
import { DEMO_AUTHORS } from "@/data/authors";
import SingleCommentForm from "@/app/(singles)/SingleCommentForm";
import CommentCardLikeReply from "../CommentCardLikeReply/CommentCardLikeReply";

const DEMO_COMMENTS = [
  {
    id: 1,
    author: null,
    date: "May 20, 2021",
    content:
      "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
    like: { count: 96, isLiked: false },
  },

  {
    id: 3,
    author: null,
    date: "May 20, 2021",
    content:
      "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    like: { count: 66, isLiked: true },
  },
  {
    id: 4,
    author: null,
    date: "May 20, 2021",
    content:
      "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    like: { count: 45, isLiked: true },
  },
];

const AUTHOR = DEMO_AUTHORS[0];
export interface CommentType {
  createDatetime : Date;
  id: number;
  meetingHostUuid : string;
  meetingId: number;
  meetingReviewContent : string;
  rating : number;
  reviewerUserUuid : string;
}

export interface CommentCardProps {
  className?: string;
  comment?: CommentType;
  size?: "large" | "normal";
}

const CommentCard: FC<CommentCardProps> = ({
  className = "",
  comment,
  size = "large",
}) => {
  const date = comment?.createDatetime === null ? "May 20, 2021" : comment?.createDatetime;
  const textareaRef = useRef(null);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditting, setIsEditting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const openReplyForm = () => {
    setIsReplying(true);
    setTimeout(() => {
      textareaRef.current && (textareaRef.current as any).focus();
    }, 100);
  };
  const closeReplyForm = () => {
    setIsReplying(false);
  };

  const openModalEditComment = () => setIsEditting(true);
  const closeModalEditComment = () => setIsEditting(false);

  const openModalReportComment = () => setIsReporting(true);
  const closeModalReportComment = () => setIsReporting(false);

  const openModalDeleteComment = () => setIsDeleting(true);
  const closeModalDeleteComment = () => setIsDeleting(false);

  // const hanldeClickDropDown = (item: (typeof actions)[number]) => {
  //   if (item.id === "reply") {
  //     return openReplyForm();
  //   }
  //   if (item.id === "edit") {
  //     return openModalEditComment();
  //   }
  //   if (item.id === "report") {
  //     return openModalReportComment();
  //   }
  //   if (item.id === "delete") {
  //     return openModalDeleteComment();
  //   }
  //   return;
  // };

  const renderCommentForm = () => {
    return (
      <SingleCommentForm
        textareaRef={textareaRef}
        onClickSubmit={closeReplyForm}
        onClickCancel={closeReplyForm}
        className="flex-grow"
      />
    );
  };

  return (
    <>
      <div className={`nc-CommentCard flex ${className}`}>
        <Avatar
          sizeClass={`h-6 w-6 text-base ${
            size === "large" ? "sm:text-lg sm:h-8 sm:w-8" : ""
          }`}
          radius="rounded-full"
          containerClassName="mt-4"
        />
        <div className="flex-grow flex flex-col p-4 ms-2 text-sm border border-neutral-200 rounded-xl sm:ms-3 sm:text-base dark:border-neutral-700">
          {/* AUTHOR INFOR */}
          <div className="relative flex items-center pe-6">
            <div className="absolute -end-3 -top-3">
              {/* <NcDropDown
                className={`p-2 text-neutral-500 flex items-center justify-center rounded-lg hover:text-neutral-800 dark:hover:text-neutral-200 sm:hover:bg-neutral-100 dark:hover:bg-neutral-800 ${twFocusClass()}`}
                data={actions}
                onClick={hanldeClickDropDown}
              /> */}
            </div>
            <Link
              className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
              href={AUTHOR.href}
            >
              {AUTHOR.displayName}
            </Link>
            <span className="mx-2">·</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
              {date && date.toLocaleString('ko-KR', { hour12: false }).replace(/T/, ' ').replace(/\..+/, '')}
            </span>
          </div>

          {/* CONTENT */}
          <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
            {comment?.meetingReviewContent}
          </span>

          {/* ACTION LIKE REPLY */}
          {isReplying ? (
            renderCommentForm()
          ) : (
            // <CommentCardLikeReply
            //   className={className}
            //   isLiked={like.isLiked}
            //   likeCount={like.count}
            //   onClickReply={() => setIsReplying(true)}
            // />
            null
          )}
        </div>
      </div>

      <ModalEditComment
        show={isEditting}
        onCloseModalEditComment={closeModalEditComment}
      />
      <ModalReportItem
        show={isReporting}
        onCloseModalReportItem={closeModalReportComment}
      />
      <ModalDeleteComment
        show={isDeleting}
        onCloseModalDeleteComment={closeModalDeleteComment}
      />
    </>
  );
};

export default CommentCard;
