'use client';
import Link from 'next/link';
import React from 'react';

interface TagProps {
  id: string;
  name: string;
  size?: 'small' | 'medium' | 'large'| 'xl';
  variant?: 'default' | 'solid' | 'static';
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ComponentType<any>;
}

const Tag = ({ 
  id, 
  name, 
  size = 'medium', 
  variant = 'default', 
  clickable = true,
  onClick,
  className = '',
  icon: Icon
}: TagProps) => {
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-md',
    xl: 'px-6 py-2 min-w-48 text-lg'
  };

  const variantClasses = {
    default: 'my-1 border border-1 border-pink-300 text-gray-100 hover:text-black hover:border-pink-400 hover:bg-pink-400',
    solid: 'bg-pink-300 text-black hover:bg-pink-400',
    static: 'bg-gray-600 text-gray-300'
  };

  const baseClasses = `
    inline-flex items-center gap-1
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    rounded-full 
    transition-all 
    duration-300 
    ease-in-out 
    ${clickable && variant !== 'static' ? 'cursor-pointer hover:mx-2 transform hover:scale-105 hover:border-pink-400 hover:bg-pink-400 hover:shadow-lg' : ''} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const content = (
    <>
      {Icon && <Icon className="w-3 h-3" />}
      <span>{name}</span>
    </>
  );

  const handleClick = (e: React.MouseEvent) => {
    if (!clickable) return;
    
    e.stopPropagation();
    
    if (onClick) {
      onClick();
    }
  };

  if (!clickable || variant === 'static') {
    return (
      <span className={baseClasses}>
        {content}
      </span>
    );
  }

  if (onClick) {
    return (
      <span 
        onClick={handleClick}
        className={baseClasses}
      >
        {content}
      </span>
    );
  }

  // Use Next.js Link for navigation
  return (
    <Link 
      href={`/tags/${encodeURIComponent(id)}`}
      className={baseClasses}
      onClick={(e) => e.stopPropagation()}
    >
      {content}
    </Link>
  );
};

export default Tag;
