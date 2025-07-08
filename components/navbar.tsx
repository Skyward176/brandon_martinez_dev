'use client'
import * as React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Button} from "@nextui-org/react";
import {usePathname} from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { HiArrowRightOnRectangle, HiUser } from 'react-icons/hi2';

const pages = [
  {name:'About Me', href:'/'}, 
  {name:'Projects', href:'/projects'},
  {name: 'Blog', href: '/blog'}
];

function NavbarWrapper() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className= 'text-white md:hidden'
        />
      <NavbarBrand>
      <p className='text-4xl text-teal-400 font-extralight text-center hidden md:block md:text-left'> Brandon <span className="text-pink-300">Martinez</span></p>
      <p className='text-4xl text-teal-400 font-extralight text-center md:hidden'> BM </p>
      </NavbarBrand>
      <NavbarContent justify='end'>
            {pages.map((page) => (
              <NavbarItem key={page.name}>
                <Link 
                  href={page.href} 
                  className={`hover:underline font-extralight text-xl focus:text-teal-400 ${
                    pathname === page.href ? 'text-teal-400' : 'text-white'
                  }`}>
                  {page.name}
                </Link>
              </NavbarItem>
            ))}
            
            {/* Authentication Section */}
            {!loading && (
              <NavbarItem>
                {user ? (
                  <div className="flex items-center gap-3">
                    <Link 
                      href="/blog/admin" 
                      className={`hover:underline font-extralight text-xl focus:text-teal-400 ${
                        pathname === '/blog/admin' ? 'text-teal-400' : 'text-white'
                      }`}>
                      Admin
                    </Link>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      size="sm"
                      className="text-pink-400 hover:text-pink-300 bg-transparent"
                      startContent={<HiArrowRightOnRectangle />}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div></div>
                )}
              </NavbarItem>
            )}
      </NavbarContent>
      <NavbarMenu>
          {pages.map((page, index) => (
            <NavbarMenuItem key={`${page}-${index}`}>
              <Link 
                href={page.href} 
                className={`font-extralight text-xl w-full focus:text-teal-400 ${
                  pathname === page.href ? 'text-teal-400' : 'text-white'
                }`}
                size='lg'
              >
                {page.name}
              </Link>
            </NavbarMenuItem>
          ))}
          
          {/* Mobile Authentication Section */}
          {!loading && (
            <NavbarMenuItem>
              {user ? (
                <div className="flex flex-col gap-3">
                  <Link 
                    href="/blog/admin" 
                    className={`font-extralight text-xl focus:text-teal-400 ${
                      pathname === '/blog/admin' ? 'text-teal-400' : 'text-white'
                    }`}>
                    Admin
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-pink-400 hover:text-pink-300 bg-transparent justify-start p-0"
                    startContent={<HiArrowRightOnRectangle />}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className={`font-extralight text-xl flex items-center gap-2 focus:text-teal-400 ${
                    pathname === '/login' ? 'text-teal-400' : 'text-white'
                  }`}>
                  <HiUser className="text-lg" />
                  Login
                </Link>
              )}
            </NavbarMenuItem>
          )}
      </NavbarMenu>
    </Navbar>
  );
}
export default NavbarWrapper;

