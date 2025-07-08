'use client';
import Link from 'next/link';
import { useTags } from '@/hooks/useQueries';

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
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Create a preview of the content (first 150 characters)
  const contentPreview = content.length > 150 ? content.substring(0, 150) + '...' : content;

  return (
    <Link href={`/blog/${id}`} className='block'>
      <div className='bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-teal-400 transition-all duration-300 cursor-pointer group'>
        <div className='flex items-start justify-between mb-2'>
          <h3 className='text-white font-medium text-lg group-hover:text-teal-400 transition-colors flex-1 mr-4'>
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
                <span 
                  key={index}
                  className='px-2 py-1 bg-pink-300 text-black text-xs rounded-full'
                >
                  {tag.name}
                </span>
              ) : null;
            })}
            {tags.length > 4 && (
              <span className='px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded-full'>
                +{tags.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

export default BlogPostSmall;
