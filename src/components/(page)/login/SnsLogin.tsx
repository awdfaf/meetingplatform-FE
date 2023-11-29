'use client'

import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import MoaLogo from '@/components/Logo/MoaLogo';
import MoaLogo2 from '@/components/Logo/MoaLogo2';
import Firstbottom from '@/components/Logo/firstbottom';
import LogoSvg from '@/components/Logo/LogoSvg';

export default function SnsLogin() {

  const query = useSearchParams();
  const callBackUrl = query?.get('callbackUrl');
  const session = useSession()


  const handleLogin = async (provider: string) => {
    
    const result = await signIn(provider, {
        redirect: true,
        callbackUrl: callBackUrl ? callBackUrl : '/'
    })
};

  return (
    <div className='flex flex-col justify-center items-center bg-white pt-10'>
      <div className='flex justify-start m-auto w-[180px] h-auto py-10'>
        <LogoSvg />
      </div>
      <div className='flex flex-col justify-center items-center gap-2 mt-4'>
        <button onClick={() => handleLogin('kakao')} title="새창 열림"
          className='bg-[#fee102] w-[300px] rounded-full font-semibold text-yellow-800 py-2'>
          <span className='text-sm'>카카오톡으로 5초만에 시작하기</span>
        </button>
        <Link className='mt-3 bg-[#3a31b9] w-[300px] rounded-full font-semibold text-center py-2' href="/moa-login">
            <span className='text-sm text-white'>모아로 로그인</span>
        </Link>
      </div>
      <div className='flex justify-center items-center gap-2 my-4'>
        <Link href='/' className='text-xs px-4'>둘러보기</Link>
        <div className='w-[1px] h-5 bg-gray-300'></div>
        <Link href='/signup?step=1' className='text-xs px-4'>회원가입</Link>
      </div>
      <div className='flex justify-center absolute -bottom-[50px] left-[50%] -translate-x-[50%] opacity-0'
        style = {{
          animation: 'move-up 1s ease-in-out forwards',
        }}
      >
        <Firstbottom />
      </div>
    </div>
  )
}

// 'use client'

// import React from 'react'
// import { signIn, useSession } from 'next-auth/react'
// import { useSearchParams } from 'next/navigation'
// import Link from 'next/link';
// import Image from 'next/image';
// import MoaLogo from '@/components/Logo/MoaLogo';
// import MoaLogo2 from '@/components/Logo/MoaLogo2';
// import Firstbottom from '@/components/Logo/firstbottom';
// import LogoSvg from '@/components/Logo/LogoSvg';

// export default function SnsLogin() {

//   const query = useSearchParams();
//   const callBackUrl = query?.get('callbackUrl');
//   const session = useSession()


//   const handleLogin = async (provider: string) => {
    
//     const result = await signIn(provider, {
//         redirect: true,
//         callbackUrl: callBackUrl ? callBackUrl : '/'
//     })
// };

//   return (
//     <div className='flex flex-col justify-center items-center bg-white pt-10'>
//       <div className='flex justify-start m-auto w-[180px] h-auto py-10'>
//         <LogoSvg />
//       </div>
//       <div className='flex flex-col justify-center items-center gap-2 mt-4'>
//         <button onClick={() => handleLogin('kakao')} title="새창 열림"
//           className='bg-[#fee102] w-[300px] rounded-full font-semibold text-yellow-800 py-2'>
//           <span className='text-sm'>카카오톡으로 5초만에 시작하기</span>
//         </button>
//         <Link className='mt-3 bg-[#3a31b9] w-[300px] rounded-full font-semibold text-center py-2' href="/moa-login">
//             <span className='text-sm text-white'>모아로 로그인</span>
//         </Link>
//       </div>
//       <div className='flex justify-center items-center gap-2 my-4'>
//         <Link href='/' className='text-xs px-4'>둘러보기</Link>
//         <div className='w-[1px] h-5 bg-gray-300'></div>
//         <Link href='/signup?step=1' className='text-xs px-4'>회원가입</Link>
//       </div>
//       <div className='flex justify-center absolute -bottom-[50px] left-[50%] -translate-x-[50%] opacity-0'
//         style = {{
//           animation: 'move-up 1s ease-in-out forwards',
//         }}
//       >
//         <Firstbottom />
//       </div>
//     </div>
//   )
// }
