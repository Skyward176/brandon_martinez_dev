import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Tag from '@/components/Tag';

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: any;
  updatedAt: any;
  tags?: string[];
}

interface Tag {
  id: string;
  name: string;
}

const loadBlogPost = async (postId: string) => {
  try {
    const postDoc = await getDoc(doc(db, 'blog', postId));
    
    if (!postDoc.exists()) {
      return null;
    }
    
    const postData = postDoc.data();
    const post: BlogPost = {
      id: postDoc.id,
      title: postData.title,
      content: postData.content,
      createdAt: postData.createdAt?.toDate ? postData.createdAt.toDate() : postData.createdAt,
      updatedAt: postData.updatedAt?.toDate ? postData.updatedAt.toDate() : postData.updatedAt,
      tags: postData.tags || []
    };
    
    // Load tag names if there are tags
    let tags: Tag[] = [];
    if (post.tags && post.tags.length > 0) {
      const tagsQuery = await getDocs(collection(db, 'tags'));
      tags = tagsQuery.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
    }
    
    return { post, tags };
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const data = await loadBlogPost(params.id);
  
  if (!data) {
    notFound();
  }
  
  const { post, tags } = data;
  
  const formatDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className='bg-black text-white p-8 h-full overflow-auto'>
      <div className='max-w-4xl mx-auto'>
        {/* Navigation */}
        <div className='mb-8'>
          <Link 
            href='/blog'
            className='text-teal-400 hover:text-teal-300 transition-colors inline-flex items-center'
          >
            ← Back to Blog
          </Link>
        </div>
        
        {/* Post Header */}
        <header className='mb-8 text-center'>
          <h1 className='text-4xl md:text-5xl font-extralight text-teal-400 mb-4'>
            {post.title}
          </h1>
          <p className='text-gray-400 text-lg'>
            {formatDate(post.createdAt)}
          </p>
        </header>
        
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 justify-center mb-8'>
            {post.tags.map((tagId, index) => {
              const tag = tags.find(t => t.id === tagId);
              return tag ? (
                  <Tag
                    key={index}
                    id={tag.id}
                    name={tag.name}
                    size="large"
                    variant="default"
                  />
              ) : null;
            })}
          </div>
        )}
        
        {/* Post Content */}
        <article className='prose prose-invert prose-lg max-w-none'>
          <div className='text-white leading-relaxed whitespace-pre-wrap'>
            {post.content}
          </div>
        </article>
        
        {/* Footer */}
        <footer className='mt-12 pt-8 border-t border-gray-700'>
          <div className='text-center'>
            <Link 
              href='/blog'
              className='text-teal-400 hover:text-teal-300 transition-colors'
            >
              ← Back to Blog
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
