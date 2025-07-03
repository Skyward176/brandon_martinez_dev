'use client';
import { useState, useEffect } from 'react';
import { collection, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function TechsEditor() {
  const [techs, setTechs] = useState<any[]>([]);
  const [newTech, setNewTech] = useState({ name: '', icon: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const availableIcons = [
    'RiJavascriptLine', 'FaCodeBranch', 'RiReactjsLine', 'RiTriangleFill',
    'TbBrandPython', 'TbBrandDjango', 'RiHtml5Line', 'FaJava',
    'AiOutlineCode', 'FaAws'
  ];

  useEffect(() => {
    loadTechs();
  }, []);

  const loadTechs = async () => {
    try {
      const docRef = await getDocs(collection(db, 'homepage'));
      const data = docRef.docs.map((doc) => doc.data());
      setTechs(data[0]?.techs || []);
    } catch (error: any) {
      setMessage('Error loading techs: ' + error.message);
    }
  };

  const addTech = () => {
    if (newTech.name && newTech.icon) {
      setTechs([...techs, newTech]);
      setNewTech({ name: '', icon: '' });
    }
  };

  const removeTech = (index: number) => {
    setTechs(techs.filter((_, i) => i !== index));
  };

  const saveTechs = async () => {
    setLoading(true);
    setMessage('');

    try {
      const docRef = await getDocs(collection(db, 'homepage'));
      if (docRef.docs.length > 0) {
        await updateDoc(doc(db, 'homepage', docRef.docs[0].id), {
          techs: techs
        });
        setMessage('Technologies updated successfully!');
      }
    } catch (error: any) {
      setMessage('Error updating techs: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto'>
      <h2 className='text-2xl font-extralight text-teal-400 mb-6'>Manage Technologies</h2>
      
      {/* Add New Tech */}
      <div className='bg-black p-6 rounded-lg border border-gray-600 mb-6'>
        <h3 className='text-lg text-white mb-4'>Add New Technology</h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <input
            type='text'
            placeholder='Technology name'
            value={newTech.name}
            onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
            className='px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400'
          />
          <select
            value={newTech.icon}
            onChange={(e) => setNewTech({ ...newTech, icon: e.target.value })}
            className='px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-400'
          >
            <option value=''>Select icon</option>
            {availableIcons.map((icon) => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
          <button
            onClick={addTech}
            className='px-4 py-2 bg-teal-400 text-black rounded-lg hover:bg-teal-300 transition-colors'
          >
            Add Tech
          </button>
        </div>
      </div>

      {/* Current Techs */}
      <div className='bg-black p-6 rounded-lg border border-gray-600 mb-6'>
        <h3 className='text-lg text-white mb-4'>Current Technologies</h3>
        <div className='space-y-2'>
          {techs.map((tech: any, index) => (
            <div key={index} className='flex items-center justify-between p-3 bg-gray-900 rounded-lg'>
              <span className='text-white'>{tech.name} ({tech.icon})</span>
              <button
                onClick={() => removeTech(index)}
                className='px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors'
              >
                Remove
              </button>
            </div>
          ))}
        </div>
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

      <button
        onClick={saveTechs}
        disabled={loading}
        className='w-full py-3 bg-teal-400 text-black font-medium rounded-lg hover:bg-teal-300 transition-colors disabled:opacity-50'
      >
        {loading ? 'Saving...' : 'Save Technologies'}
      </button>
    </div>
  );
}
