// this is the about/homepage
'use client';
import {RiJavascriptLine, RiReactjsLine, RiTriangleFill, RiHtml5Line} from 'react-icons/ri';
import {TbBrandPython, TbBrandDjango} from 'react-icons/tb';
import {FaJava, FaAws} from 'react-icons/fa';
import {FaCodeBranch } from 'react-icons/fa6';
import {AiOutlineCode} from 'react-icons/ai';
import {FaSearch} from 'react-icons/fa';
import CldImage from '@/components/CldImage';
import { useState, useEffect } from 'react';

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Icon mapping function
const getIcon = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    'RiJavascriptLine': RiJavascriptLine,
    'FaCodeBranch': FaCodeBranch,
    'RiReactjsLine': RiReactjsLine,
    'RiTriangleFill': RiTriangleFill,
    'TbBrandPython': TbBrandPython,
    'TbBrandDjango': TbBrandDjango,
    'RiHtml5Line': RiHtml5Line,
    'FaJava': FaJava,
    'AiOutlineCode': AiOutlineCode,
    'FaAws': FaAws,
  };
  return iconMap[iconName] || AiOutlineCode; // fallback to AiOutlineCode if icon not found
};

export default function Home() {
  const [homeData, setHomeData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Set up real-time listener for homepage collection
    const unsubscribe = onSnapshot(
      collection(db, 'homepage'),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        if (data.length > 0) {
          setHomeData(data[0]);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching homepage data:', error);
        setLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  // Filter techs based on search term
  const filteredTechs = homeData?.techs?.filter((tech: any) =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a: any, b: any) => a.name.localeCompare(b.name)) || []; 
  
  if (loading) {
    return (
      <div className='bg-black h-full flex items-center justify-center'>
        <div className='text-white text-xl'>Loading homepage...</div>
      </div>
    );
  }

  return (
    <div className='bg-black h-full flex flex-col md:flex-row overflow-y-scroll'>
        <div className='flex w-100% p-4 mx-16 md:mx-auto my-auto md:w-1/3'>
          <CldImage
            src={homeData?.image?.src || '/portfolio/profile'}
            alt='a picture of me'
            width='500'
            height='500'
            className='rounded-md '
          /> 
        </div>

        <div className='w-100% p-4 mx-16 md:mx-auto my-auto md:w-1/3'>
          <p className='text-center text-teal-400 text-4xl'>
            About Me
          </p>
          <br/>
          <p className='text-white font-extralight text-center text-xl'> 
            {homeData?.about || "Loading . . ."}
          </p> 
        </div>
        <div className='w-100% p-4 mx-16 md:mx-auto my-auto md:w-1/3'>
          <p className='text-center text-teal-400 text-4xl'>
            Techs:
          </p>
          <br/>
          
          {/* Search Bar */}
          <div className='relative mb-4 bg-black'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FaSearch className='h-4 w-4 text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search techs and skills...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 bg-black border-b border-pink-300 rounded-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent focus:rounded-lg'
            />
          </div>

          <ul className='text-xl text-white font-extralight max-h-80 overflow-y-auto'>
            {filteredTechs.length > 0 ? filteredTechs.map((tech: any, index: number) => {
              const IconComponent = getIcon(tech.icon);
              
              // Extract details from the tech object (excluding basic fields)
              const excludeFields = ['icon', 'name'];
              const techDetails = Object.entries(tech).filter(([key]) => !excludeFields.includes(key));
              
              const handleMouseEnter = (e: React.MouseEvent) => {
                setHoveredTech(tech.name);
                setMousePosition({ x: e.clientX, y: e.clientY });
              };

              const handleMouseMove = (e: React.MouseEvent) => {
                if (hoveredTech === tech.name) {
                  setMousePosition({ x: e.clientX, y: e.clientY });
                }
              };
              
              return (
                <li 
                  key={index} 
                  className='my-2 flex flex-row justify-left items-center relative cursor-pointer hover:bg-gray-800 hover:bg-opacity-50 rounded p-2 transition-colors'
                  onMouseEnter={handleMouseEnter}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  <IconComponent className='mr-2 text-2xl text-teal-400'/>
                  <p>{tech.name}</p>
                </li>
              );
            }) : homeData?.techs ? (
              <li className='my-2 text-gray-400 text-center'>No technologies found matching "{searchTerm}"</li>
            ) : (
              // Fallback to hardcoded list if no techs in database
              <>
                Loading . . . 
              </>
            )}
          </ul>
          
          {/* Tooltip positioned under mouse cursor */}
          {hoveredTech && (() => {
            const tech = filteredTechs.find((t: any) => t.name === hoveredTech);
            if (!tech) return null;
            
            const excludeFields = ['icon', 'name'];
            const techDetails = Object.entries(tech).filter(([key]) => !excludeFields.includes(key));
            
            // Only show tooltip if there are details to display
            if (techDetails.length === 0) return null;
            
            return (
              <div 
                className='fixed z-50 bg-gray-900 border border-gray-600 rounded-lg p-4 shadow-lg max-w-sm pointer-events-none'
                style={{
                  left: `${mousePosition.x + 10}px`,
                  top: `${mousePosition.y + 10}px`,
                }}
              >
                <div className='text-sm space-y-2'>
                  {techDetails.map(([key, value]: [string, any]) => (
                    <div key={key}>
                      <span className='text-teal-400 font-medium capitalize'>{key.replace(/([A-Z])/g, ' $1')}: </span>
                      <span className='text-gray-200'>
                        {typeof value === 'object' && value !== null 
                          ? Object.entries(value).map(([subKey, subValue]) => 
                              `${subKey}: ${subValue}`
                            ).join(', ')
                          : String(value)
                        }
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
  )
}
