'use client';
import React from 'react';
// Import major icon categories from react-icons
import * as Ai from 'react-icons/ai';
import * as Bi from 'react-icons/bi';
import * as Bs from 'react-icons/bs';
import * as Ci from 'react-icons/ci';
import * as Di from 'react-icons/di';
import * as Fa from 'react-icons/fa';
import * as Fc from 'react-icons/fc';
import * as Fi from 'react-icons/fi';
import * as Gi from 'react-icons/gi';
import * as Go from 'react-icons/go';
import * as Gr from 'react-icons/gr';
import * as Hi from 'react-icons/hi';
import * as Im from 'react-icons/im';
import * as Io from 'react-icons/io';
import * as Lu from 'react-icons/lu';
import * as Md from 'react-icons/md';
import * as Pi from 'react-icons/pi';
import * as Ri from 'react-icons/ri';
import * as Si from 'react-icons/si';
import * as Tb from 'react-icons/tb';
import * as Ti from 'react-icons/ti';
import * as Wi from 'react-icons/wi';

// Icon mapping function
const getIcon = (iconName: string) => {
  const iconLibraries = [Ai, Bi, Bs, Ci, Di, Fa, Fc, Fi, Gi, Go, Gr, Hi, Im, Io, Lu, Md, Pi, Ri, Si, Tb, Ti, Wi];
  
  for (const iconLib of iconLibraries) {
    if ((iconLib as any)[iconName]) {
      return (iconLib as any)[iconName];
    }
  }
  
  // Fallback to AiOutlineCode if icon not found
  return Ai.AiOutlineCode;
};

interface TechIconProps {
  iconName: string;
  techName: string;
  className?: string;
}

export default function TechIcon({ iconName, techName, className = '' }: TechIconProps) {
  const IconComponent = getIcon(iconName);
  
  return (
    <div className={`bg-teal-400 rounded-lg flex items-center justify-center hover:bg-teal-300 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${className}`}>
      {React.createElement(IconComponent, { 
        className: 'text-black transition-transform duration-300 ease-in-out',
        size: 64
      })}
    </div>
  );
}
