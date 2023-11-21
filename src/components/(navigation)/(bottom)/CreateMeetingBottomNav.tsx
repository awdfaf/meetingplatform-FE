'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';

export default function CreateMeetingBottomNav(props: { active: number, setActive: Function }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { active, setActive } = props;
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

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction key="previous" label="이전" icon={<RestoreIcon />} onClick={handlePrevious} />
          <BottomNavigationAction key="empty1" label="" />
          <BottomNavigationAction key="empty2" label="" />
          <BottomNavigationAction key="empty3" label="" />
          <BottomNavigationAction key="next" label="다음" icon={<ArchiveIcon />} onClick={handleNext} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
