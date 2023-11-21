import React, { useState } from 'react'
import { Navbar, NavbarContent, NavbarItem, NavbarMenuToggle } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import Menu from '../../(menu)/Menu';
import MoaLogo from '@/components/Logo/MoaLogo';
import MoaIcon from '@/components/Logo/MoaIcon';






export default function HeaderDefault() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBlurred={false}
    >

      <NavbarContent justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarItem>
          <Link href="/">
            {/* <MoaLogo /> */}
            <MoaIcon />
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link size="sm" href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href='/cert'>
            <Button size="sm" color="primary" variant="flat">
              Sign Up
            </Button>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <Menu />

    </Navbar>
  );
}
