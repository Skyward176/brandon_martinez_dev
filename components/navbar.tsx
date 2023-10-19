'use client'
import * as React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

const pages = ['About Me', 'Projects', 'Blog'];

function NavbarWrapper() {

  return (
    <Navbar>
      <NavbarBrand>
        <p className='text-4xl hidden font-extralight md:block'> Brandon Martinez </p>
        <p className='text-4xl block font-extralight md:hidden'>BM</p>
      </NavbarBrand>
      <NavbarContent className='md-hidden'>
            {pages.map((page) => (
              <NavbarItem className='bg-black w-full text-center' key={page}>
                <p className="hover:underline font-extralight text-white text-xl">{page}</p>
              </NavbarItem>
            ))}
      </NavbarContent>
    </Navbar>
  );
}
export default NavbarWrapper;

