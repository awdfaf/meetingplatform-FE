import React, { useState } from 'react'
import { NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { MenuContentData } from '@/data/MenuContentData';



export default function Menu() {


  return (
    <NavbarMenu>
      {MenuContentData.map((item, index) => (
        <NavbarMenuItem key={item.id}>
          <Link
            className="w-full"
            color={
              index === 2 ? "warning" : index === MenuContentData.length - 1 ? "danger" : "foreground"
            }
            href="#"
            size="lg"
          >
            {item.content}
          </Link>
        </NavbarMenuItem>
      ))}

    </NavbarMenu>
  )
}
