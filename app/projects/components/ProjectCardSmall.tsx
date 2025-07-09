'use client';
import Link from 'next/link';
import { useTags } from '@/hooks/useQueries';
import Tag from '@/components/Tag';

interface ProjectCardSmallProps {
  name: string;
  description: string;
  url: string;
  img?: string;
  videoUrl?: string;
  tags?: string[];
  id?: string;
}

const ProjectCardSmall = (props: ProjectCardSmallProps) => {
  // Fetch tags to resolve IDs to names
  const { data: allTags = [] } = useTags();

  return (
    <Link href={`/projects/${props.id}`} className='block'>
      <div className='bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-teal-400 transition-all duration-500 ease-in-out cursor-pointer group transform hover:scale-[1.02] hover:shadow-lg'>
        <div className='flex items-start gap-4'>
          {/* Project Image/Video Thumbnail */}
          {props.img && (
            <div className='w-16 h-16 bg-gray-800 rounded-lg flex-shrink-0 overflow-hidden'>
              <img 
                src={props.img} 
                alt={props.name}
                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'
              />
            </div>
          )}
          
          {/* Project Info */}
          <div className='flex-1 min-w-0'>
            <h3 className='text-white font-medium text-lg mb-1 group-hover:text-teal-400 transition-colors duration-300 ease-in-out truncate'>
              {props.name}
            </h3>
            <p className='text-gray-400 text-sm mb-2' style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {props.description}
            </p>
            
            {/* Tags */}
            {props.tags && props.tags.length > 0 && (
              <div className='flex flex-wrap gap-1'>
                {props.tags.slice(0, 3).map((tagId, index) => {
                  const tag = allTags.find(t => t.id === tagId);
                  return tag ? (
                    <Tag 
                      key={index}
                      id={tag.id || tagId}
                      name={tag.name}
                      size="small"
                      variant="default"
                    />
                  ) : null;
                })}
                {props.tags.length > 3 && (
                  <Tag 
                    id="more"
                    name={`+${props.tags.length - 3}`}
                    size="small"
                    variant="static"
                    clickable={false}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCardSmall;
