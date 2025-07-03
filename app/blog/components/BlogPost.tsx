interface BlogPostProps {
  id: string;
  title: string;
  content: string;
  createdAt: any;
  tags?: string[];
}

function BlogPost({ id, title, content, createdAt, tags }: BlogPostProps) {
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
          {tags.map((tag, index) => (
            <span 
              key={index}
              className='px-3 py-1 bg-pink-300 text-black text-xs rounded-full'
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className='text-white leading-relaxed whitespace-pre-wrap'>
        {content}
      </div>
    </article>
  )
}

export default BlogPost;