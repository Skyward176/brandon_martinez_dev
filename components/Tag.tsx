'use client';
import Link from 'next/link';

interface TagProps {
  id: string;
  name: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'solid' | 'static';
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
}

const Tag = ({ 
  id, 
  name, 
  size = 'medium', 
  variant = 'default', 
  clickable = true,
  onClick,
  className = ''
}: TagProps) => {
  const sizeClasses = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-xs',
    large: 'px-4 py-2 text-sm'
  };

  const variantClasses = {
    default: 'border border-1 border-pink-300 text-white hover:text-black hover:outline-pink-400 hover:bg-pink-400',
    solid: 'bg-pink-300 text-black hover:bg-pink-400',
    static: 'bg-gray-600 text-gray-300'
  };

  const baseClasses = `
    ${sizeClasses[size]} 
    ${variantClasses[variant]} 
    rounded-full 
    transition-all 
    duration-300 
    ease-in-out 
    ${clickable && variant !== 'static' ? 'cursor-pointer hover:mx-2 transform hover:scale-105 hover:outline-pink-400 hover:bg-pink-400 hover:shadow-lg' : ''} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const handleClick = (e: React.MouseEvent) => {
    if (!clickable) return;
    
    e.stopPropagation();
    
    if (onClick) {
      onClick();
    } else {
      // Default behavior: navigate to tag page
      window.location.href = `/tags/${encodeURIComponent(name)}`;
    }
  };

  if (!clickable || variant === 'static') {
    return (
      <span className={baseClasses}>
        {name}
      </span>
    );
  }

  return (
    <span 
      onClick={handleClick}
      className={baseClasses}
    >
      {name}
    </span>
  );
};

export default Tag;
