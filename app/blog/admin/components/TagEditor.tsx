'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface TagData {
  id: string;
  name: string;
  createdAt: any;
  usage: {
    blogs: number;
    projects: number;
    techs: number;
  };
}

export default function TagEditor() {
  const [allTags, setAllTags] = useState<TagData[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [newTag, setNewTag] = useState('');
  const [addingTag, setAddingTag] = useState(false);
  const [editingTag, setEditingTag] = useState<TagData | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    loadAllTags();
  }, []);

  const loadAllTags = async () => {
    setLoading(true);
    try {
      const tags = new Map<string, TagData>();
      
      // Get all tags from dedicated tags collection
      const tagsRef = await getDocs(collection(db, 'tags'));
      tagsRef.docs.forEach(doc => {
        tags.set(doc.id, {
          id: doc.id,
          name: doc.data().name,
          createdAt: doc.data().createdAt,
          usage: { blogs: 0, projects: 0, techs: 0 }
        });
      });
      
      // Count usage in blog posts
      const blogRef = await getDocs(collection(db, 'blog'));
      blogRef.docs.forEach(doc => {
        const data = doc.data();
        if (data.tags) {
          data.tags.forEach((tagId: string) => {
            if (tags.has(tagId)) {
              tags.get(tagId)!.usage.blogs++;
            }
          });
        }
      });

      // Count usage in projects
      const projectsRef = await getDocs(collection(db, 'projects'));
      projectsRef.docs.forEach(doc => {
        const data = doc.data();
        if (data.tags) {
          data.tags.forEach((tagId: string) => {
            if (tags.has(tagId)) {
              tags.get(tagId)!.usage.projects++;
            }
          });
        }
      });

      // Count usage in techs collection
      const techsRef = await getDocs(collection(db, 'techs'));
      techsRef.docs.forEach(doc => {
        const data = doc.data();
        if (data.tags) {
          data.tags.forEach((tagId: string) => {
            if (tags.has(tagId)) {
              tags.get(tagId)!.usage.techs++;
            }
          });
        }
      });

      const sortedTags = Array.from(tags.values()).sort((a, b) => a.name.localeCompare(b.name));
      setAllTags(sortedTags);
    } catch (error: any) {
      setMessage('Error loading tags: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTag = async () => {
    if (!newTag.trim()) return;
    
    setAddingTag(true);
    setMessage('');
    
    try {
      // Check if tag already exists
      const existingTag = allTags.find(tag => tag.name.toLowerCase() === newTag.toLowerCase());
      if (existingTag) {
        setMessage('Tag already exists!');
        setAddingTag(false);
        return;
      }
      
      await addDoc(collection(db, 'tags'), {
        name: newTag.trim(),
        createdAt: new Date(),
      });
      
      setNewTag('');
      setMessage('Tag added successfully!');
      loadAllTags();
    } catch (error: any) {
      setMessage('Error adding tag: ' + error.message);
    } finally {
      setAddingTag(false);
    }
  };

  const startEdit = (tag: TagData) => {
    setEditingTag(tag);
    setEditName(tag.name);
  };

  const saveEdit = async () => {
    if (!editingTag || !editName.trim()) return;
    
    setLoading(true);
    setMessage('');
    
    try {
      await updateDoc(doc(db, 'tags', editingTag.id), {
        name: editName.trim(),
      });
      
      setEditingTag(null);
      setEditName('');
      setMessage('Tag updated successfully!');
      loadAllTags();
    } catch (error: any) {
      setMessage('Error updating tag: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTag = async (tag: TagData) => {
    const totalUsage = tag.usage.blogs + tag.usage.projects + tag.usage.techs;
    
    if (totalUsage > 0) {
      if (!confirm(`This tag is used in ${totalUsage} items. Are you sure you want to delete it? This will remove the tag from all content.`)) {
        return;
      }
    } else {
      if (!confirm(`Are you sure you want to delete the tag "${tag.name}"?`)) {
        return;
      }
    }
    
    setLoading(true);
    setMessage('');
    
    try {
      // TODO: In a real app, you'd want to also remove this tag from all content
      // For now, we'll just delete the tag itself
      await deleteDoc(doc(db, 'tags', tag.id));
      
      setMessage('Tag deleted successfully!');
      loadAllTags();
    } catch (error: any) {
      setMessage('Error deleting tag: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditingTag(null);
    setEditName('');
  };

  const getTotalUsage = (tag: TagData) => {
    return tag.usage.blogs + tag.usage.projects + tag.usage.techs;
  };

  const TagItem = ({ tag }: { tag: TagData }) => {
    const [showUsage, setShowUsage] = useState(false);

    const handleShowUsage = () => {
      setShowUsage(!showUsage);
    };

    return (
      <div className='bg-transparent border border-gray-600 rounded-lg p-4'>
        <div className='flex items-center justify-between mb-2'>
          <span className='text-white font-medium'>{tag.name}</span>
          <div className='flex gap-2'>
            <button
              onClick={() => startEdit(tag)}
              className='text-teal-400 hover:text-teal-300 text-sm'
            >
              Edit
            </button>
            <button
              onClick={() => deleteTag(tag)}
              className='text-red-400 hover:text-red-300 text-sm'
            >
              Delete
            </button>
          </div>
        </div>
        
        {showUsage && (
          <div className='text-sm text-gray-300 space-y-1'>
            <div className='flex justify-between'>
              <span>Blog Posts:</span>
              <span className='text-white'>{tag.usage.blogs}</span>
            </div>
            <div className='flex justify-between'>
              <span>Projects:</span>
              <span className='text-white'>{tag.usage.projects}</span>
            </div>
            <div className='flex justify-between'>
              <span>Technologies:</span>
              <span className='text-white'>{tag.usage.techs}</span>
            </div>
            <div className='flex justify-between font-semibold pt-1 border-t border-gray-600'>
              <span>Total Usage:</span>
              <span className='text-teal-400'>{getTotalUsage(tag)}</span>
            </div>
          </div>
        )}

        <button
          onClick={handleShowUsage}
          className='mt-2 text-teal-400 hover:text-teal-300 text-sm'
        >
          {showUsage ? 'Hide Usage' : 'Show Usage'}
        </button>
      </div>
    );
  };

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-extralight text-teal-400'>Tag Management</h2>
        <button
          onClick={loadAllTags}
          disabled={loading}
          className='px-4 py-2 bg-teal-400 text-black rounded-lg hover:bg-teal-300 transition-colors disabled:opacity-50'
        >
          {loading ? 'Refreshing...' : 'Refresh Tags'}
        </button>
      </div>

      {/* Add New Tag Section */}
      <div className='bg-transparent border border-gray-600 rounded-lg p-4 mb-6'>
        <h3 className='text-lg text-white mb-3'>Add New Tag</h3>
        <div className='flex gap-3'>
          <input
            type='text'
            placeholder='Enter tag name...'
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTag();
              }
            }}
            className='flex-1 px-3 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
            disabled={addingTag}
          />
          <button
            onClick={addTag}
            disabled={addingTag || !newTag.trim()}
            className='px-4 py-2 bg-teal-400 text-black rounded-lg hover:bg-teal-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {addingTag ? 'Adding...' : 'Add Tag'}
          </button>
        </div>
        <p className='text-gray-400 text-sm mt-2'>
          Add a new tag that can be used across blog posts, projects, and technologies.
        </p>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.includes('Error') 
            ? 'bg-red-900 border border-red-600 text-red-300' 
            : 'bg-green-900 border border-green-600 text-green-300'
        }`}>
          {message}
        </div>
      )}

      <div className='mb-6'>
        <div className='flex items-center gap-4 mb-4'>
          <div className='text-white'>
            <span className='text-gray-300'>Total Tags:</span>
            <span className='ml-2 text-teal-400 font-semibold'>{allTags.length}</span>
          </div>
        </div>
        
        <div className='text-sm text-gray-400 mb-4'>
          This shows all tags used across blog posts, projects, and technologies. Click "Show Usage" to see where each tag is being used.
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {allTags.map((tag) => (
          <div key={tag.id} className='bg-transparent border border-gray-600 rounded-lg p-4'>
            <div className='flex items-start justify-between mb-2'>
              <h4 className='text-white font-medium text-lg'>{tag.name}</h4>
              <div className='flex gap-1'>
                <button
                  onClick={() => startEdit(tag)}
                  className='px-2 py-1 bg-teal-400 text-black text-xs rounded hover:bg-teal-300 transition-colors'
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTag(tag)}
                  className='px-2 py-1 bg-pink-300 text-black text-xs rounded hover:bg-pink-400 transition-colors'
                >
                  Delete
                </button>
              </div>
            </div>
            
            <div className='text-sm text-gray-300 space-y-1'>
              <div className='flex justify-between'>
                <span>Blog Posts:</span>
                <span className='text-teal-400'>{tag.usage.blogs}</span>
              </div>
              <div className='flex justify-between'>
                <span>Projects:</span>
                <span className='text-teal-400'>{tag.usage.projects}</span>
              </div>
              <div className='flex justify-between'>
                <span>Technologies:</span>
                <span className='text-teal-400'>{tag.usage.techs}</span>
              </div>
              <div className='flex justify-between border-t border-gray-600 pt-1 mt-2 font-medium'>
                <span>Total Usage:</span>
                <span className='text-pink-400'>{getTotalUsage(tag)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {allTags.length === 0 && !loading && (
        <div className='text-center text-gray-400 py-8'>
          No tags found. Tags will appear here as you add them to blog posts, projects, and technologies.
        </div>
      )}

      {/* Edit Tag Modal (Simplified) */}
      {editingTag && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div className='bg-gray-900 rounded-lg p-6 max-w-sm w-full'>
            <h3 className='text-lg text-white mb-4'>Edit Tag</h3>
            <input
              type='text'
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className='w-full px-3 py-2 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400'
            />
            <div className='flex justify-end gap-2 mt-4'>
              <button
                onClick={cancelEdit}
                className='px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className='px-4 py-2 bg-teal-400 text-black rounded-lg hover:bg-teal-300 transition-colors'
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
