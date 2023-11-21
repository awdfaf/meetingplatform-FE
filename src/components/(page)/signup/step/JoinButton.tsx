import { SignupType } from '@/types/SignupType'
import { useRouter } from 'next/navigation'
import React, { SetStateAction, useEffect, useState } from 'react'
import { useSearchParam } from 'react-use';
import Swal from 'sweetalert2';


function JoinButton({active, setActive, signUpData, setSignUpData, stepId, handleJoin} : 
  {active:any, setActive:React.Dispatch<SetStateAction<any>>, signUpData:SignupType, setSignUpData:React.Dispatch<React.SetStateAction<SignupType>>, stepId:number, handleJoin: () => void}) {

  const router = useRouter();

  // console.log(active)
  const nextStep = () => {
    if(active[stepId-1]?.status){
      router.push(`/signup?step=${stepId+1}`)
    }else{
      Swal.fire({
        text: `입력내용을 확인해주세요.`,
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          container: "my-swal",
        },
      });
    }
  }

  const handleConfirm = () => {
    // 변경된 부분: stepId가 4이고 handleJoin이 호출될 때 signUpData 업데이트 및 Swal 모달 띄우기
    if (stepId === 4) {
      setSignUpData((prevData) => ({
        ...prevData,
        // 여기에 signUpData 업데이트 로직 추가
      }));

      Swal.fire({
        text: `가입을 완료하시겠습니까?`, // 수정 가능
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '예',
        cancelButtonText: '아니오',
      }).then((result) => {
        if (result.isConfirmed) {
          // handleJoin 호출
          handleJoin();
        }
      });
    } else {
      // 변경된 부분: stepId가 4가 아닐 때, 확인 버튼 클릭 시 handleStep 호출
      nextStep();
    }
  }

  return (
    <>
      <div className='w-full bg-white p-2 flex justify-between fixed bottom-0 gap-1 text-sm'>
        {
          stepId > 1 ? 
            <button className='w-[30%] h-[44px] bg-[gray] grid place-items-center text-white font-semibold rounded-xl'
            onClick={()=>router.push(`/signup?step=${stepId-1}`)}
          >
            이전
          </button>
          : null
        }
        
        <button className={`w-full h-[44px] grid place-items-center text-white font-semibold rounded-xl ${active[stepId-1]?.status ? 'bg-[#4338ca]' : 'bg-[#4338ca55] cursor-not-allowed'}`}
          onClick={() => {
            handleConfirm();
          }}
        >
          다음
        </button>
      </div>
      </>
  )
}

export default JoinButton;
