import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import CommentCard from "@/components/CommentCard/CommentCard";
import Link from "next/link";
import { get } from "lodash";

export interface SingleCommentListsProps { }

const SingleCommentLists = ({hostUuid}:{hostUuid?:string}) => {

  const [comments, setComments] = useState([])
  useEffect(() => {
    console.log(hostUuid)
    async function getComments(){
      const res = await fetch(`https://moamoa-backend.duckdns.org/api/v1/meeting-feature/meeting-review?meetingHostUuid=2292fa9b-106b-4147-9853-52fd61cb05f0&page=0&size=20`)
      const data = await res.json()
      setComments(data.result.content)
      console.log(data)
    }
   
    if(hostUuid){
      getComments()
    }
  },[hostUuid])
  return (
    <ul className="nc-SingleCommentLists space-y-5">
      {
        comments.length === 0 ? <div>no data</div> :
        comments.map((comment:any) => (
          <CommentCard key={comment.id} comment={comment}/>
        ))
      }
      {/* <CommentCard />
      <CommentCard />
      <CommentCard />
      <CommentCard /> */}

      <ButtonPrimary className="dark:bg-primary-700 w-fit px-5 py-3">
        <a href='/meeting/participate'>
          모임 참가
        </a>
      </ButtonPrimary>
    </ul>
  );
};

export default SingleCommentLists;
