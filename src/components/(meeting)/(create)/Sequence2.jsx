'use client'

import React, { useState, useEffect, useRef } from 'react'
import { usePathname, useSearchParams, useRouter, useParams } from 'next/navigation'
import Heading from '@/components/Heading/Heading';
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { experimentalStyled as styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';



// interface Sequence2Props {
//   url: string;
//   setUrl: (newUrl: string) => void;
//   updateQueryParams: any;  // Ideally, provide a more specific type than 'any'
// }

// 그리드 스타일
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Sequence2(props) {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const router = useRouter();
  const searchParams = useSearchParams()

  const [inputThemeCategoryId, setInputThemeCategoryId] = useState(searchParams.get('ThemeCategoryId') || '');
  const { url, setUrl, updateQueryParams, active, setActive } = props;

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  // const ref = React.useRef<HTMLDivElement>(null);
  const ref = useRef()
  const maxTabs = 10;

  const handlePrevious = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  const handleNext = () => {
    if (active < maxTabs) {
      setActive(active + 1);
    }
  };


  // 아코디언
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";




  const handleSave = () => {
    const baseURL = 'http://localhost:3000'; // Adjust as needed

    const updatedUrl = updateQueryParams(baseURL, url, {
      ThemeCategoryId: inputThemeCategoryId,
    });
    setUrl(updatedUrl);
    router.push(updatedUrl);
  };

  return (
    <>
      <div className='tracking-tighter mb-8'>
        <p className='text-lg font-semibold text-center'>어떤 주제로 모임을 하고싶나요?</p>
        <p className="text-xs text-center text-gray-500">카테고리를 선택하세요</p>
      </div>

      <div className='flex flex-col justify-center items-center relative'>
        <div className='flex flex-col justify-start md:w-[80%] w-full transition-all'>
          <label className='text-[0.75rem] text-gray-500 bg-white -mb-3 ml-5 z-50 w-fit px-2'>주제</label>
          <input
            className='border-2 border-[#E5E7EB] text-[0.8rem] rounded-full px-5 h-[50px] placeholder:text-[#9CA3AF80] placeholder:text-[0.8rem]'
            value={inputThemeCategoryId}
            onChange={(e) => setInputThemeCategoryId(e.target.value)}
          />
        </div>

      </div>

      {/*       <div className="flex flex-col gap-2">
        <p className="text-small text-default-500">Selected value: {selectedValue}</p>
        <input
          type="text"
          className=''
          value={inputThemeCategoryId}
          onChange={(e) => setInputThemeCategoryId(e.target.value)}
        />
        <button onClick={handleNext}>Next</button>
      </div> */}
      {/* <Accordion variant="splitted">
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {Array.from(Array(6)).map((_, index) => (
                <Grid xs={2} sm={4} md={4} key={index}>
                  <Item>xs=2</Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion> */}
      <>
        {/* <Box sx={{ pb: 7 }} ref={ref}>
          <CssBaseline />
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation showLabels>
              <BottomNavigationAction key="previous" label="이전" icon={<RestoreIcon />} onClick={() => { handleSave(); handlePrevious(); }} />
              <BottomNavigationAction key="empty1" label="" />
              <BottomNavigationAction key="empty2" label="" />
              <BottomNavigationAction key="empty3" label="" />
              <BottomNavigationAction key="next" label="다음" icon={<ArchiveIcon />} onClick={() => { handleSave(); handleNext(); }} />
            </BottomNavigation>
          </Paper>
        </Box> */}
        <div className='w-full bg-white p-2 flex justify-between fixed bottom-0 gap-1 text-sm right-[1px]'>
          <button className='w-[30%] h-[44px] bg-[gray] grid place-items-center text-white font-semibold rounded-xl'
          onClick={() => { handleSave(); handlePrevious(); }}>
            이전
          </button>

          <button className="w-full h-[44px] grid place-items-center text-white font-semibold rounded-xl bg-[#4338ca]"
          onClick={() => { handleSave(); handleNext(); }}>
            다음
          </button>
        </div>
      </>
    </>
  );
}
