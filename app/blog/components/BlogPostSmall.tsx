'use client';
import Link from 'next/link';
import { useTags } from '@/hooks/useQueries';
import Tag from '@/components/Tag';

interface BlogPostSmallProps {
  id?: string;
  title: string;
  content: string;
  createdAt: any;
  tags?: string[];
}

function BlogPostSmall({ id, title, content, createdAt, tags }: BlogPostSmallProps) {
  // Fetch tags to resolve IDs to names
  const { data: allTags = [] } = useTags();
  
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    
    try {
      let date;
      
      // Handle Firestore timestamp with toDate method
      if (timestamp && typeof timestamp.toDate === 'function') {
        date = timestamp.toDate();
      } 
      // Handle Firestore timestamp with seconds property
      else if (timestamp && timestamp.seconds) {
        date = new Date(timestamp.seconds * 1000);
      }
      // Handle regular Date object or date string
      else {
        date = new Date(timestamp);
      }
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return '';
      }
      
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      console.warn('Error formatting date:', error, timestamp);
      return '';
    }
  };

  // Create a preview of the content (first 150 characters)
  const contentPreview = content.length > 150 ? content.substring(0, 150) + '...' : content;

  return (
    <Link href={`/blog/${id}`} className='block'>
      <div className='bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-teal-400 transition-all duration-500 ease-in-out cursor-pointer group transform hover:scale-[1.02] hover:shadow-lg'>
        <div className='flex items-start justify-between mb-2'>
          <h3 className='text-gray-100 font-medium text-lg group-hover:text-teal-400 transition-colors duration-300 ease-in-out flex-1 mr-4'>
            {title}
          </h3>
          <span className='text-gray-400 text-sm flex-shrink-0'>
            {formatDate(createdAt)}
          </span>
        </div>
        
        <p className='text-gray-300 text-sm mb-3 line-clamp-3' style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {contentPreview}
        </p>
        
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className='flex flex-wrap gap-1'>
            {tags.slice(0, 4).map((tagId, index) => {
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
            {tags.length > 4 && (
              <Tag 
                id="more"
                name={`+${tags.length - 4}`}
                size="small"
                variant="static"
                clickable={false}
              />
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export default BlogPostSmall;
