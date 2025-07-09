// this is the about/homepage
'use client';
import {FaSearch} from 'react-icons/fa';
import CldImage from '@/components/CldImage';
import TechItem from '@/components/TechItem';
import { useState, useEffect } from 'react';
import { useIdentity } from '@/contexts/IdentityContext';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from '@/components/Link';

const loader = async () => { //loads homepage content from db
  const docRef = await getDocs(collection(db, 'homepage'));
  const data = docRef.docs.map((doc) => doc.data());
  return data;
}

const loadTechs = async () => { //loads techs from dedicated collection
  const docRef = await getDocs(collection(db, 'techs'));
  const data = docRef.docs.map((doc) => doc.data());
  return data;
}

export default function Home() {
  const [homeData, setHomeData] = useState<any>(null);
  const [techs, setTechs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tagMap, setTagMap] = useState<Map<string, string>>(new Map());
  const { getName, isIris, isIrisDomain } = useIdentity();
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await loader();
      setHomeData(data[0]);
      
      // Load techs from dedicated collection
      const techsData = await loadTechs();
      setTechs(techsData);
      
      // Load tag names
      try {
        const tagsRef = await getDocs(collection(db, 'tags'));
        const newTagMap = new Map();
        tagsRef.docs.forEach(doc => {
          newTagMap.set(doc.id, doc.data().name);
        });
        setTagMap(newTagMap);
      } catch (error) {
        console.error('Error loading tags:', error);
      }
    };
    fetchData();
  }, []);

  // Filter techs based on search term (search both name and tag names)
  const filteredTechs = techs?.filter((tech: any) => {
    const nameMatch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
    const tagMatch = tech.tags && tech.tags.some((tagId: string) => {
      const tagName = tagMap.get(tagId) || tagId;
      return tagName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return nameMatch || tagMatch;
  }).sort((a: any, b: any) => a.name.localeCompare(b.name)) || []; 

  // Replace references to Brandon Martinez with current identity
  const processText = (text: string) => {
    if (!text) return text;
    
    // First replace full name references
    let processedText = text.replace(/Brandon Martinez/gi, getName());
    
    // Then replace standalone "Brandon" with "Iris" when in Iris mode
    if (isIris) {
      processedText = processedText.replace(/\bBrandon\b/gi, 'Iris');
    }
    
    return processedText;
  };

  return (
    <div className='bg-black h-full font-extralight overflow-hidden'>
      {/* Mobile Layout - 2 rows: Row 1 has 2 cols (image + about), Row 2 has techlist */}
      <div className='md:hidden h-full flex flex-col p-4 pt-8'>
        {/* Row 1 - Image and About Me - fit content */}
        <div className='grid grid-cols-2 gap-4 mb-4'>
          {/* Image - Row 1, Col 1 */}
          <div className='flex justify-center items-start'>
            <div className="relative w-[120px] h-[160px] sm:w-[150px] sm:h-[200px]">
              <CldImage
                src={homeData?.image?.src || '/portfolio/profile'}
                alt='a picture of me'
                fill
                sizes="(max-width: 640px) 120px, 150px"
                className="rounded-md object-cover"
              />
            </div>
          </div>
          
          {/* About Me - Row 1, Col 2 */}
          <div className='flex flex-col justify-start'>
            <p className='text-teal-400 text-3xl sm:text-4xl mb-2'>
              About Me
            </p>
            <p className='text-gray-100 font-extralight text-sm sm:text-base'> 
              {processText(homeData?.about) || "Loading . . ."}
            </p>
          </div>
        </div>

        {/* Row 2 - Tech List taking remaining space */}
        <div className='flex-1 flex flex-col min-h-0'>
          <br/>
          <p className='text-center text-teal-400 text-3xl sm:text-4xl mb-4'>
            Stuff I Know:
          </p>
          
          {/* Search Bar */}
          <div className='relative mb-4 bg-black flex-shrink-0'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FaSearch className='h-4 w-4 text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search techs and skills...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-3 bg-black border-b border-pink-300 rounded-none text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent focus:rounded-lg text-base transition-all duration-300 ease-in-out'
            />
          </div>

          <ul className='text-lg text-gray-100 font-extralight flex-1 max-h-screen overflow-auto pb-4 min-h-0'>
            {filteredTechs.length > 0 ? filteredTechs.map((tech: any, index: number) => (
              <TechItem key={index} tech={tech} />
            )) : homeData?.techs ? (
              <li className='my-2 text-gray-400 text-center'>No technologies found matching "{searchTerm}"</li>
            ) : (
              <>
                Loading . . . 
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Desktop Layout - 1 row, 3 columns: techlist | about | image */}
      <div className='hidden md:grid md:grid-cols-3 md:gap-8 md:h-screen md:p-8'>
        {/* Column 1 - Tech List */}
        <div className='flex flex-col h-full'>
          <div className='h-[4.5rem] flex items-center justify-center flex-shrink-0'>
            <p className='text-center font-extralight text-teal-400 text-4xl'>
              Stuff I Know:
            </p>
          </div>
          
          {/* Search Bar */}
          <div className='relative mb-4 bg-black flex-shrink-0'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <FaSearch className='h-4 w-4 text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search techs and skills...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 bg-black border-b border-pink-300 rounded-none text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent focus:rounded-lg transition-all duration-300 ease-in-out'
            />
          </div>

          <ul className='text-xl text-gray-100 font-extralight flex-1 max-h-screen pb-72 overflow-scroll min-h-0'>
            {filteredTechs.length > 0 ? filteredTechs.map((tech: any, index: number) => (
              <TechItem key={index} tech={tech} />
            )) : homeData?.techs ? (
              <li className='my-2 text-gray-400 text-center'>No technologies found matching "{searchTerm}"</li>
            ) : (
              <>
                Loading . . . 
              </>
            )}
          </ul>
        </div>

        {/* Column 2 - About Me */}
        <div className='flex flex-col h-full'>
          <div className='h-[4.5rem] flex items-center justify-center flex-shrink-0'>
            <p className='text-center font-extralight text-teal-400 text-4xl'>
              About Me
            </p>
          </div>
          <div className='flex-1 flex items-start justify-center pt-4'>
            <p className='text-gray-100 font-extralight text-center text-xl max-w-prose'> 
              {processText(homeData?.about) || "Loading . . ."}
            </p> 
          </div>
        </div>

        {/* Column 3 - Image */}
        <div className="flex flex-col h-full">
          <div className='h-[4.5rem] flex items-center justify-center flex-shrink-0'>
            <p className='text-center font-extralight text-teal-400 text-4xl'>
              Look, it's me!
            </p>
          </div>
          <div className='flex-1 flex items-start justify-center pt-4'>
            <div className="relative w-[250px] md:w-[300px] h-[333px] md:h-[400px] max-h-[60vh]">
              <CldImage
                src={homeData?.image?.src || '/portfolio/profile'}
                alt='a picture of me'
                fill
                sizes="(max-width: 768px) 250px, 300px"
                className="rounded-md object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
