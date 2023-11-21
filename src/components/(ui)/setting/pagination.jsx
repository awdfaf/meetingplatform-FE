/* 'use client'

import { Pagination } from '@nextui-org/react';
import React from 'react'


const [page, setPage] = React.useState(1);

function Paginate() {
  return (
    <Pagination
    isCompact
    showControls
    showShadow
    color="success"
    page={page}
    total={pages}
    onChange={(page) => setPage(page)}
  />
  )
}

export default Paginate */