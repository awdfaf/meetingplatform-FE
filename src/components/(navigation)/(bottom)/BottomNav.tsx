'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';



export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  let router = useRouter()
  const session = useSession();

  const handleHostClick = () => {
    if (session.data) {
      router.push(`/author/${session.data.user.userUuid}`);
    } else {
      // 사용자가 로그인하지 않았을 때 처리 (예: 로그인 페이지로 리디렉션)
      router.push('/login');
    }
  }

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="카테고리" icon={<RestoreIcon />} onClick={() => { router.push('/meeting/category/0/0') }} />
          <BottomNavigationAction label="모임 생성" icon={<FavoriteIcon />} onClick={() => { router.push('/meeting/create') }} />
          <BottomNavigationAction label="호스트" icon={<ArchiveIcon />} onClick={handleHostClick} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
