'use client';
import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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

interface TechItemProps {
  tech: {
    name: string;
    icon: string;
    tags?: string[];
    stats?: {
      experience?: string;
      comfortLevel?: string;
    };
  };
}

export default function TechItem({ tech }: TechItemProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [tagNames, setTagNames] = useState<string[]>([]);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const IconComponent = getIcon(tech.icon);

  useEffect(() => {
    if (tech.tags && tech.tags.length > 0) {
      loadTagNames();
    }
  }, [tech.tags]);

  const loadTagNames = async () => {
    if (!tech.tags || tech.tags.length === 0) return;
    
    try {
      const tagsRef = await getDocs(collection(db, 'tags'));
      const tagMap = new Map();
      
      tagsRef.docs.forEach(doc => {
        tagMap.set(doc.id, doc.data().name);
      });
      
      const resolvedTagNames = tech.tags.map(tagId => tagMap.get(tagId) || tagId);
      setTagNames(resolvedTagNames);
      setTagsLoaded(true);
    } catch (error) {
      console.error('Error loading tag names:', error);
      // Fallback to using tag IDs as names
      setTagNames(tech.tags || []);
      setTagsLoaded(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    setShowTooltip(true);
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <li className='my-2 group relative'>
      <Link 
        href={`/techs/${encodeURIComponent(tech.name)}`}
        className='block'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div className='flex flex-row justify-left items-center p-3 rounded-lg cursor-pointer border border-transparent transition-all duration-300 group-hover:border-gray-600'>
          {React.createElement(IconComponent as any, { className: 'mr-3 text-2xl text-teal-400 transition-all duration-300 group-hover:text-teal-300 group-hover:scale-110' })}
          <div className='flex-1'>
            <p className='text-white font-medium transition-colors duration-300 group-hover:text-teal-300'>
              {tech.name}
            </p>
            {tagNames.length > 0 && (
              <div className='flex flex-wrap gap-1 mt-2'>
                {tagNames.map((tagName: string, tagIndex: number) => (
                  <span 
                    key={tagIndex}
                    className='px-2 py-1 bg-pink-300 text-black text-xs rounded-full transition-all duration-300 group-hover:bg-pink-400 group-hover:scale-105'
                  >
                    {tagName}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Tooltip */}
        {showTooltip && (
          <div 
            className='fixed z-50 bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg max-w-xs w-max transition-all duration-200 pointer-events-none'
            style={{
              left: `${mousePosition.x + 10}px`,
              top: `${mousePosition.y + 10}px`,
            }}
          >
            <div className='text-white text-sm'>
              <div className='font-semibold text-teal-300 mb-2 break-words'>{tech.name}</div>
              
              {tech.stats && (tech.stats.experience || tech.stats.comfortLevel) && (
                <div>
                  {tech.stats.experience && (
                    <div className='flex mb-1 gap-2'>
                      <span className='text-gray-300 text-xs break-words flex-shrink-0'>Experience:</span>
                      <span className='text-white text-xs break-words'>{tech.stats.experience}</span>
                    </div>
                  )}
                  {tech.stats.comfortLevel && (
                    <div className='flex mb-1 gap-2'>
                      <span className='text-gray-300 text-xs break-words flex-shrink-0'>Comfort Level:</span>
                      <span className='text-white text-xs break-words'>{tech.stats.comfortLevel}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Tooltip Arrow - removed since it follows cursor */}
          </div>
        )}
      </Link>
    </li>
  );
}
