'use client';
import Link from 'next/link';
import { useTags } from '@/hooks/useQueries';
import Tag from '@/components/Tag';

interface BlogPostProps {
  id?: string;
  title: string;
  content: string;
  createdAt: any;
  tags?: string[];
}

function BlogPost({ id, title, content, createdAt, tags }: BlogPostProps) {
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
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      console.warn('Error formatting date:', error, timestamp);
      return '';
    }
  };

  return (
    <Link href={`/blog/${id}`} className='block'>
      <article className='bg-black rounded-lg p-6 border border-gray-700 hover:border-teal-400 transition-all duration-500 ease-in-out cursor-pointer group hover:bg-opacity-60 hover:backdrop-blur-md transform hover:scale-[1.02]'>
        <h2 className='text-3xl font-extralight text-teal-400 mb-3 group-hover:text-teal-300 transition-colors duration-300 ease-in-out'>{title}</h2>
        <p className='text-gray-400 text-sm mb-4'>{formatDate(createdAt)}</p>
      
      {tags && tags.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-4'>
          {tags.map((tagId, index) => {
            const tag = allTags.find(t => t.id === tagId);
            return tag ? (
              <Tag 
                key={index}
                id={tag.id || tagId}
                name={tag.name}
                size="large"
                variant="default"
              />
            ) : null;
          })}
        </div>
      )}
      
      <div className='text-gray-100 leading-relaxed whitespace-pre-wrap'>
        {content}
      </div>
    </article>
    </Link>
  )
}

export default BlogPost;