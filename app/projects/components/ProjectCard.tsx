'use client';
import CldImage from "@/components/CldImage";
import Link from 'next/link';
import { useTags } from '@/hooks/useQueries';

interface ProjectCardProps {
  name: string;
  description: string;
  url: string;
  img?: string;
  videoUrl?: string;
  tags?: string[];
  id?: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  // Fetch tags to resolve IDs to names
  const { data: allTags = [] } = useTags();
  
  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const renderMedia = () => {
    if (props.videoUrl) {
      const videoId = getYouTubeVideoId(props.videoUrl);
      if (videoId) {
        return (
          <div className='w-full aspect-video mb-4'>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`${props.name} video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className='rounded-lg border border-pink-300'
            />
          </div>
        );
      }
    }
    
    if (props.img) {
      return (
        <CldImage
          src={props.img}
          width={400}
          height={400}
          className='w-full object-contain border border-pink-300 rounded-lg mb-4'
          alt={`image of ${props.name}`}
        />
      );
    }
    
    return null;
  };

  return (
    <div className='flex flex-col w-full md:w-1/3 p-6 my-4 mx-2 border-solid border-1 border-gray-400 rounded-lg hover:border-teal-400 transition-all duration-500 ease-in-out transform hover:scale-[1.02] hover:shadow-lg'>
      <div className='cursor-pointer' onClick={() => props.id && window.open(`/projects/${props.id}`, '_blank')}>
        <h1 className='text-2xl md:text-3xl lg:text-4xl font-extralight text-teal-400 mb-4 break-words leading-tight hover:text-teal-300 transition-colors duration-300 ease-in-out'>
          {props.name}
        </h1>
        
        {renderMedia()}
        
        <p className='mb-3'>{props.description}</p>
      </div>
      
      {/* Tags */}
      {props.tags && props.tags.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-4'>
          {props.tags.map((tagId, index) => {
            const tag = allTags.find(t => t.id === tagId);
            return tag ? (
              <Link 
                key={index}
                href={`/tags/${encodeURIComponent(tag.name)}`}
                className='px-3 py-1 bg-pink-300 text-black text-xs rounded-full hover:bg-pink-400 transition-all duration-300 ease-in-out transform hover:scale-105'
              >
                {tag.name}
              </Link>
            ) : null;
          })}
        </div>
      )}
      
      <div className='mt-auto'>
        <a href={props.url} className='text-teal-400 hover:text-teal-300 transition-colors duration-300 ease-in-out'>
          Check it out here!
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;
