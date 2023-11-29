import Image from "next/image";
import React from "react";

const SingleContentDemo = ({data}:{data?:string}) => {
  return (
    <>
      {data && data}
    </>
  );
};

export default SingleContentDemo;
