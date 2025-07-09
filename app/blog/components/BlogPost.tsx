'use client';
import Link from 'next/link';
import { useTags } from '@/hooks/useQueries';

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
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
              <span 
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `/tags/${encodeURIComponent(tag.name)}`;
                }}
                className='px-3 py-1 bg-pink-300 text-black text-xs rounded-full hover:bg-pink-400 transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105 hover:shadow-lg'
              >
                {tag.name}
              </span>
            ) : null;
          })}
        </div>
      )}
      
      <div className='text-white leading-relaxed whitespace-pre-wrap'>
        {content}
      </div>
    </article>
    </Link>
  )
}

export default BlogPost;