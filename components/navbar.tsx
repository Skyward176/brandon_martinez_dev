'use client'
import * as React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenu, NavbarMenuItem, NavbarMenuToggle} from "@nextui-org/react";
import {usePathname} from 'next/navigation';
const pages = [
  {name:'About Me', href:'/'}, 
  {name:'Projects', href:'/projects'},
  {name: 'Blog', href: '/blog'}
];

function NavbarWrapper() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname()
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className= 'text-white md:hidden'
        />
      <NavbarBrand>
      <p className='text-4xl text-teal-400 font-extralight text-center hidden md:block md:text-left'> Brandon Martinez </p>
      <p className='text-4xl text-teal-400 font-extralight text-center md:hidden'> BM </p>
      </NavbarBrand>
      <NavbarContent justify='end'>
            {pages.map((page) => (
              <NavbarItem key={page.name}>
                <Link 
                  href={page.href} 
                  color={
                    pathname === page.href ? 'primary':'foreground'
                  }
                  className="hover:underline font-extralight text-xl">
                  {page.name}
                </Link>
              </NavbarItem>
            ))}
      </NavbarContent>
      <NavbarMenu>
          {pages.map((page, index) => (
            <NavbarMenuItem key={`${page}-${index}`}>
              <Link 
                color={
                  pathname === page.href ? 'primary':'foreground'
                }
                href={page.href} 
                className="font-extralight text-xl w-full"
                size='lg'
              >
                {page.name}
              </Link>
            </NavbarMenuItem>
          ))}
      </NavbarMenu>
    </Navbar>
  );
}
export default NavbarWrapper;

