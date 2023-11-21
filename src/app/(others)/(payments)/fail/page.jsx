// 'use client'

// import { useRouter } from "next/navigation";
// import Image from "next/image"

// export default function FailPage() {
//   const query = useRouter();

//   const router = useRouter();

//   return (
//     <main>
//       <div className="result wrapper">
//         <div className="box_section">
//           <h2 style={{ padding: "20px 0px 10px 0px" }}>
//             <Image
//               width={30}
//               height={30}
//               src="https://static.toss.im/3d-emojis/u1F6A8-apng.png"
//               art="실패 이미지"
//             />
//             결제 실패
//           </h2>
//           {/* 수정된 부분: router.query를 사용합니다. */}
//           <p>code = {router.query.code ?? "UNKNOWN_ERROR"}</p>
//           <p>message = {router.query.message ?? "알 수 없음"}</p>
//         </div>
//       </div>
//     </main>
//   );
// }
import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page