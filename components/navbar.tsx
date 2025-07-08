'use client'
import * as React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Button} from "@nextui-org/react";
import {usePathname} from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useIdentity } from '@/contexts/IdentityContext';
import { HiArrowRightOnRectangle, HiUser } from 'react-icons/hi2';

const pages = [
  {name:'About Me', href:'/'}, 
  {name:'Projects', href:'/projects'},
  {name: 'Blog', href: '/blog'}
];

function NavbarWrapper() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [clickCount, setClickCount] = React.useState(0);
  const [showPasswordInput, setShowPasswordInput] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const { isIris, setIsIris, getFullName, getInitials, isIrisDomain } = useIdentity();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleNameClick = () => {
    // Don't allow easter egg activation on Iris domain (it's automatic there)
    if (isIrisDomain) return;
    
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 5) {
      setShowPasswordInput(true);
    }
    
    // Reset after 10 seconds if not completed
    setTimeout(() => {
      if (newCount < 5) {
        setClickCount(0);
      }
    }, 10000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'trapdoor') {
      setIsIris(true);
      setShowPasswordInput(false);
      setClickCount(0);
      setPassword('');
    } else {
      setPassword('');
      setShowPasswordInput(false);
      setClickCount(0);
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordInput(false);
    setClickCount(0);
    setPassword('');
  };

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen} 
      className="flex-shrink-0 backdrop-blur-md bg-black/30 border-b border-white/10"
      maxWidth="full"
      isBlurred={false}
    >
      <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className= 'text-white md:hidden'
        />      <NavbarBrand>
        <div 
          className={`select-none ${isIrisDomain ? '' : 'cursor-pointer'}`}
          onClick={handleNameClick}
        >
          <p className='text-4xl text-teal-400 font-extralight text-center hidden md:block md:text-left drop-shadow-lg'> 
            {isIris ? 'Iris' : 'Brandon'} <span className="text-pink-300">{isIris ? 'Annelise Martinez' : 'Martinez'}</span>
          </p>
          <p className='text-4xl text-teal-400 font-extralight text-center md:hidden drop-shadow-lg'> 
            {getInitials()} 
          </p>
        </div>
      </NavbarBrand>
      <NavbarContent justify='end'>
            {pages.map((page) => (
              <NavbarItem key={page.name}>
                <Link 
                  href={page.href} 
                  className={`hover:underline font-extralight text-xl focus:text-teal-400 transition-all duration-300 ${
                    pathname === page.href ? 'text-teal-400' : 'text-white/90 hover:text-white'
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
                      className={`hover:underline font-extralight text-xl focus:text-teal-400 transition-all duration-300 ${
                        pathname === '/blog/admin' ? 'text-teal-400' : 'text-white/90 hover:text-white'
                      }`}>
                      Admin
                    </Link>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      size="sm"
                      className="text-pink-400 hover:text-pink-300 bg-transparent transition-all duration-300"
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
      <NavbarMenu className="backdrop-blur-md bg-black/40 border-r border-white/10">
          {pages.map((page, index) => (
            <NavbarMenuItem key={`${page}-${index}`}>
              <Link 
                href={page.href} 
                className={`font-extralight text-xl w-full focus:text-teal-400 transition-all duration-300 ${
                  pathname === page.href ? 'text-teal-400' : 'text-white/90 hover:text-white'
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
                    className={`font-extralight text-xl focus:text-teal-400 transition-all duration-300 ${
                      pathname === '/blog/admin' ? 'text-teal-400' : 'text-white/90 hover:text-white'
                    }`}>
                    Admin
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-pink-400 hover:text-pink-300 bg-transparent justify-start p-0 transition-all duration-300"
                    startContent={<HiArrowRightOnRectangle />}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className={`font-extralight text-xl flex items-center gap-2 focus:text-teal-400 transition-all duration-300 ${
                    pathname === '/login' ? 'text-teal-400' : 'text-white/90 hover:text-white'
                  }`}>
                  <HiUser className="text-lg" />
                  Login
                </Link>
              )}
            </NavbarMenuItem>
          )}
      </NavbarMenu>
      
      {/* Password Input Modal */}
      {showPasswordInput && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 max-w-sm w-full mx-4">
            <form onSubmit={handlePasswordSubmit}>
              <p className="text-white text-lg mb-4">Enter the secret password:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-gray-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-teal-400 mb-4"
                placeholder="Password..."
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-teal-400 text-black hover:bg-teal-300 transition-colors"
                >
                  Enter
                </Button>
                <Button
                  type="button"
                  onClick={handlePasswordCancel}
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Navbar>
  );
}
export default NavbarWrapper;

