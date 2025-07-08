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
    <article className='bg-gray-900 rounded-lg p-6 border border-gray-700'>
      <h2 className='text-3xl font-extralight text-teal-400 mb-3'>{title}</h2>
      <p className='text-gray-400 text-sm mb-4'>{formatDate(createdAt)}</p>
      
      {tags && tags.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-4'>
          {tags.map((tagId, index) => {
            const tag = allTags.find(t => t.id === tagId);
            return tag ? (
              <Link 
                key={index}
                href={`/tags/${encodeURIComponent(tag.name)}`}
                className='px-3 py-1 bg-pink-300 text-black text-xs rounded-full hover:bg-pink-400 transition-colors cursor-pointer'
              >
                {tag.name}
              </Link>
            ) : null;
          })}
        </div>
      )}
      
      <div className='text-white leading-relaxed whitespace-pre-wrap'>
        {content}
      </div>
    </article>
  )
}

export default BlogPost;