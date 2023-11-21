'use client'

import React from 'react'
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import { qnaListData } from '@/data/settings/qnaListData';
import { QnaDataType } from '@/types/QnaDataType';
import MeetingCreateHeader from '@/components/(navigation)/(top)/MeetingCreateHeader';
import Heading2 from '@/components/Heading/Heading2';
import BackbuttonHeader from '@/components/(navigation)/(top)/BackbuttonHeader';

function qna() {
  return (
    <>
    <BackbuttonHeader contents='Q&A' />
    <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
      <span className="block text-xl mt-2 text-neutral-700 sm:text-base dark:text-neutral-200">
        자주 묻는 질문과 답변을 
        <br /><strong className='text-[#4338ca]'>모아</strong> 두었어요!
      </span>
    </header>
    <Accordion variant="shadow">
      {
      qnaListData.map((e:QnaDataType) => (
      <AccordionItem key={e.id} aria-label="Accordion 1" title={e.title}>
        {e.description}
      </AccordionItem>
      ))
      }
    </Accordion>
    </>
  )
}

export default qna