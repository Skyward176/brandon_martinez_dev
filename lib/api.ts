import { collection, getDocs, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Tech-related interfaces
export interface Tech {
  id?: string;
  name: string;
  icon: string;
  tags: string[];
  stats?: {
    experience?: string;
    comfortLevel?: string;
  };
  description?: string;
  summary?: string;
}

export interface Tag {
  id?: string;
  name: string;
}

export interface Project {
  id?: string;
  name: string;
  description: string;
  url: string;
  img?: string;
  videoUrl?: string;
  article?: string;
  tags?: string[];
}

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  tags?: string[];
  createdAt: any;
  updatedAt: any;
}

// Fetch functions
export const fetchTechs = async (): Promise<Tech[]> => {
  const techsRef = await getDocs(collection(db, 'techs'));
  return techsRef.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  })) as Tech[];
};

export const fetchTags = async (): Promise<Tag[]> => {
  const tagsRef = await getDocs(collection(db, 'tags'));
  return tagsRef.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name
  }));
};

export const fetchProjects = async (): Promise<Project[]> => {
  const projectsRef = await getDocs(collection(db, 'projects'));
  return projectsRef.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  })) as Project[];
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const postsRef = await getDocs(collection(db, 'blog'));
  return postsRef.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  })) as BlogPost[];
};

// Helper function to ensure tag exists
const ensureTagExists = async (tagName: string) => {
  const tagsRef = await getDocs(collection(db, 'tags'));
  const existingTag = tagsRef.docs.find(doc => doc.data().name === tagName);
  
  if (!existingTag) {
    // Create the tag if it doesn't exist
    await addDoc(collection(db, 'tags'), { name: tagName });
  }
};

// Mutation functions
export const createTech = async (techData: Omit<Tech, 'id'>) => {
  // Create the tech document
  const docRef = await addDoc(collection(db, 'techs'), techData);
  
  // Ensure a tag with the same name exists
  await ensureTagExists(techData.name);
  
  return { id: docRef.id, ...techData };
};

export const updateTech = async (techId: string, techData: Partial<Tech>) => {
  await updateDoc(doc(db, 'techs', techId), techData);
  
  // If the name is being updated, ensure a tag with the new name exists
  if (techData.name) {
    await ensureTagExists(techData.name);
  }
  
  return { id: techId, ...techData };
};

export const deleteTech = async (techId: string) => {
  await deleteDoc(doc(db, 'techs', techId));
  return techId;
};

export const createProject = async (projectData: Omit<Project, 'id'>) => {
  const docRef = await addDoc(collection(db, 'projects'), projectData);
  return { id: docRef.id, ...projectData };
};

export const updateProject = async (projectId: string, projectData: Partial<Project>) => {
  await updateDoc(doc(db, 'projects', projectId), projectData);
  return { id: projectId, ...projectData };
};

export const deleteProject = async (projectId: string) => {
  await deleteDoc(doc(db, 'projects', projectId));
  return projectId;
};

export const createBlogPost = async (postData: Omit<BlogPost, 'id'>) => {
  const docRef = await addDoc(collection(db, 'blog'), postData);
  return { id: docRef.id, ...postData };
};

export const updateBlogPost = async (postId: string, postData: Partial<BlogPost>) => {
  await updateDoc(doc(db, 'blog', postId), postData);
  return { id: postId, ...postData };
};

export const deleteBlogPost = async (postId: string) => {
  await deleteDoc(doc(db, 'blog', postId));
  return postId;
};

export const createTag = async (tagData: Omit<Tag, 'id'>) => {
  const docRef = await addDoc(collection(db, 'tags'), tagData);
  return { id: docRef.id, ...tagData };
};

export const updateTag = async (tagId: string, tagData: Partial<Tag>) => {
  await updateDoc(doc(db, 'tags', tagId), tagData);
  return { id: tagId, ...tagData };
};

export const deleteTag = async (tagId: string) => {
  await deleteDoc(doc(db, 'tags', tagId));
  return tagId;
};
