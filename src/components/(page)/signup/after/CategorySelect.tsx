'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import { InterestListType, SubCategoryType } from '@/types/InterestListType'
import { useSession } from 'next-auth/react'
import { set } from 'lodash'
import Swal from 'sweetalert2'

interface CategorySelectProps {
  id: number;
  name: string;
}

function CategorySelect() {

  const [selectinterest, setselectinterest] = useState<CategorySelectProps[]>([] as CategorySelectProps[]);
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false);
  const [categories, setCategories] = useState<InterestListType[]>([]);
  // console.log(selectinterest)
  const { data: session } = useSession();
  const icons = [
    { id: 1, src: '/images/interest/artIcons.png', alt: '문화·예술' },
    { id: 2, src: '/images/interest/activityIcons.png', alt: '액티비티' },
    { id: 3, src: '/images/interest/foodIcons.png', alt: '푸드·드링크' },
    { id: 4, src: '/images/interest/hobbyIcons.png', alt: '취미' },
    { id: 5, src: '/images/interest/partyIcons.png', alt: '파티·소개팅' },
    { id: 6, src: '/images/interest/tripIcons.png', alt: '여행·동행' },
    { id: 7, src: '/images/interest/studyIcons.png', alt: '자기계발' },
    { id: 8, src: '/images/interest/friendIcons.png', alt: '동네·친목' },
    { id: 9, src: '/images/interest/investIcons.png', alt: '재테크' },
    { id: 10, src: '/images/interest/languageIcons.png', alt: '외국어' },
  ]


  const postData = async () => {
    console.log(selectinterest)
    console.log(session?.user?.userUuid)
    if(selectinterest.length < 3){
      Swal.fire({
        text: `관심사를 3개 이상 선택해주세요.`,
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          container: "my-swal",
        },
      });
      return;
    }

    const payload = selectinterest.map((cate: CategorySelectProps) => cate.id)
    console.log(payload)
    try {
      const response = await fetch('https://moamoa-backend.duckdns.org/api/v1/category/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_category_id: payload,
          userUuid: session?.user?.userUuid,
        }),
      })

      if (response.ok) {
        // 성공적으로 처리된 경우의 로직을 작성합니다.
        console.log('Data sent successfully!');
      } else {
        // 오류 처리 로직을 작성합니다.
        console.error('Failed to send data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  const handleCheckbox = ( topCateId:number, id:number, name:string, checked:boolean ) => {
    console.log(categories)
    console.log(id, name, checked)
    console.log(selectinterest)
    if(checked){
      setselectinterest(selectinterest.filter((cate: CategorySelectProps) => cate.id !== id))
      setCategories(categories.map((category: InterestListType) => {
        if(category.topCategoryId === topCateId){
          category.subCategories.map((cate: SubCategoryType) => {
            if(cate.id === id){
              cate.checked = false;
            }
          })
        }
        return category;
      }))
    } else {
      setselectinterest([...selectinterest, {id, name}])
      setCategories(categories.map((category: InterestListType) => {
        if(category.topCategoryId === topCateId){
          category.subCategories.map((cate: SubCategoryType) => {
            if(cate.id === id){
              cate.checked = true;
            }
          })
        }
        return category;
      }))
    }
  }

  useEffect(() => {
    if(selectinterest.length >= 3){
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  },[selectinterest])

  useEffect(() => {
    const getCategory = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/category`);
      const data = await res.json();
      console.log(data.result)
      let categoryList = data.result;
      categoryList.map((category: InterestListType) => {
        category.subCategories.map((cate: SubCategoryType) => {
          cate.checked = false;
        })
      })
      setCategories(categoryList);
    }

    getCategory();
  },[])

  return (
    <>
      <main className=''>

      <div className='tracking-tighter mb-8'>
        <p className="text-xs text-gray-500">관심사로 더 좋은 만남을 제공할 수 있습니다.</p>
        <p className="text-xs text-gray-500">관심사를 3개 항목 이상 선택해 주세요.</p>
      </div>
      {
        categories && categories.map((category: InterestListType) => (
          <div key={category.topCategoryId}>
            <div className='interest_food flex gap-2 mt-7 mb-2'>
              <strong className='text-xl'>{category.topCategoryName}</strong>
              <span>
                <Image src={icons[category.topCategoryId - 1].src} alt={icons[category.topCategoryId - 1].alt} width={30} height={30} />
              </span>
            </div>
          <div className='flex flex-wrap mb-10'>
          {
              category.subCategories.map((cate: SubCategoryType) => (
                  <div 
                    key={cate.id}
                    className={cate.checked ? `border border-[#4338ca] px-2 py-1 rounded-full mr-1 text-[0.7rem] bg-[#4338ca] font-semibold text-white cursor-pointer transition-all` :`border px-2 py-1 rounded-full mr-1 text-[0.7rem] cursor-pointer transition-all`}
                    onClick={() => handleCheckbox(category.topCategoryId, cate.id, cate.name, cate.checked)}
                  >
                  {cate.name}
                  </div>
              ))}
          </div>
        </div>
        ))
      }
       

        <div className='flex mt-14 absolute bottom-3'>
            <button className={`h-[44px] w-fit px-10 bg-[#4338ca] rounded-2xl mx-auto text-white font-semibold ${isButtonEnabled ? '' : 'bg-gray opacity-30 cursor-not-allowed'}`}
            onClick={postData}
            disabled={!isButtonEnabled}
            >
              관심사 등록
            </button>
        </div>
      </main>
    </>
  )
}

export default CategorySelect