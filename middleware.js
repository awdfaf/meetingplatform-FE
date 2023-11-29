

import { NextResponse } from 'next/server'



export async function middleware(request) {
  // TODO: 이걸로 url 얻어서 서버로 요청해도 될듯
  // console.log(request.nextUrl)

  // NextResponse.next()  //통과
  // NextResponse.redirect()  //다른페이지 이동
  // NextResponse.rewrite()  //다른페이지 이동

  


  const sessionToken = request.cookies.get('next-auth.session-token')?.value;

  const isLoggedIn = sessionToken !== undefined
  

  // logout -> null 출력
  // console.log(sessionToken)

  // meeting 페이지 접근시 로그인 안되어있으면 로그인 페이지로 이동
  if ( request.nextUrl.pathname.startsWith('/meeting/participate') ||
  request.nextUrl.pathname.startsWith('/meeting/create'))
    if (!isLoggedIn){
      // TODO : host 바꾸기
      return NextResponse.redirect(new URL('https://meetingplatform-fe.vercel.app/login'), request.url)
    }


  // 접속로그 저장
  if ( request.nextUrl.pathname === '/'){
    //request.nextUrl.pathname.startsWith

    // 접속 시간
    // console.log(new Date().toLocaleString())
    // 접속 os
    // console.log(request.headers.get('sec-ch-ua-platform'))
    // 접속 ip -> 안됨
    // const clientIp = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for');
    // console.log(clientIp);

    return NextResponse.next()
  }


  
} 

