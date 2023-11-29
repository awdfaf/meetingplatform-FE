import React from 'react'
import MoaIcon from './MoaIcon'


export default function MoaLogo({ className }: { className?: string }) {
  return (
    <div className={className ? className : ''}>
       <MoaIcon />
    </div>
  )
}
