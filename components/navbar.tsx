'use client'
import * as React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Button} from "@nextui-org/react";
import Link from '@/components/Link'
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
          className= 'text-gray-100 md:hidden'
        />      <NavbarBrand>
        <div 
          className={`select-none ${isIrisDomain ? '' : 'cursor-pointer'}`}
          onClick={handleNameClick}
        >
          <p className='text-4xl text-teal-400 font-extralight text-center hidden md:block md:text-left drop-shadow-lg'> 
            {isIris ? 'Iris' : 'Brandon'} <span className="text-pink-300">{isIris ? 'Annelise Martinez' : 'Martinez'}</span>
          </p>
          <p className='text-4xl text-teal-400 font-extralight text-center md:hidden drop-shadow-lg'> 
            {isIris ? (
              <>I<span className="text-pink-300">AM</span></>
            ) : (
              <>B<span className="text-pink-300">M</span></>
            )}
          </p>
        </div>
      </NavbarBrand>
      <NavbarContent justify='end' className="hidden md:flex">
            {pages.map((page) => (
              <NavbarItem key={page.name}>
                <Link 
                  href={page.href}
                  size='large'
                  active={pathname === page.href}
                >
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
                      active={pathname === '/blog/admin'}
                      size='large'
                    >
                      Admin
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="hover:underline font-extralight text-xl focus:text-pink-400 transition-all duration-300 ease-in-out text-pink-400 hover:text-pink-300 bg-transparent border-none cursor-pointer flex items-center gap-2"
                    >
                      <HiArrowRightOnRectangle />
                      Logout
                    </button>
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
                active={pathname === page.href}
                size='large'
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
                    active={pathname === '/blog/admin'}
                  >
                    Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="font-extralight text-xl focus:text-pink-400 transition-all duration-300 ease-in-out text-pink-400 hover:text-pink-300 bg-transparent border-none cursor-pointer flex items-center gap-2 justify-start p-0"
                  >
                    <HiArrowRightOnRectangle />
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  active={pathname === '/login'}
                >
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
              <p className="text-gray-100 text-lg mb-4">Enter the secret password:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-400 mb-4"
                placeholder="Password..."
                autoFocus
              />
              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-teal-400 text-black hover:bg-teal-300 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Enter
                </Button>
                <Button
                  type="button"
                  onClick={handlePasswordCancel}
                  variant="ghost"
                  className="text-gray-400 hover:text-gray-100 transition-all duration-300 ease-in-out"
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

