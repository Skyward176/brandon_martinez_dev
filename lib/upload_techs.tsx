import { collection, doc, setDoc, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { exit } from 'process';

// Sample tags data with their relationships
const tagsData = [
  { name: "Frontend", category: "technology" },
  { name: "Backend", category: "technology" },
  { name: "Programming Language", category: "technology" },
  { name: "Framework", category: "technology" },
  { name: "Database", category: "technology" },
  { name: "Cloud", category: "technology" },
  { name: "Version Control", category: "tool" },
  { name: "Web Development", category: "domain" },
  { name: "Mobile", category: "domain" },
  { name: "DevOps", category: "domain" }
];

// Technologies with their tag relationships (using tag names for now, will be converted to IDs)
const techsData = [
  { 
    name: "JavaScript", 
    icon: "RiJavascriptLine",
    tagNames: ["Programming Language", "Frontend", "Web Development"]
  },
  { 
    name: "Git", 
    icon: "FaCodeBranch",
    tagNames: ["Version Control", "DevOps"]
  },
  { 
    name: "React.js", 
    icon: "RiReactjsLine",
    tagNames: ["Frontend", "Framework", "Web Development"]
  },
  { 
    name: "Next.js", 
    icon: "RiTriangleFill",
    tagNames: ["Frontend", "Framework", "Web Development"]
  },
  { 
    name: "Python", 
    icon: "TbBrandPython",
    tagNames: ["Programming Language", "Backend"]
  },
  { 
    name: "Django", 
    icon: "TbBrandDjango",
    tagNames: ["Backend", "Framework", "Web Development"]
  },
  { 
    name: "HTML 5 + CSS", 
    icon: "RiHtml5Line",
    tagNames: ["Frontend", "Web Development"]
  },
  { 
    name: "Java", 
    icon: "FaJava",
    tagNames: ["Programming Language", "Backend"]
  },
  { 
    name: "C", 
    icon: "AiOutlineCode",
    tagNames: ["Programming Language"]
  },
  { 
    name: "AWS", 
    icon: "FaAws",
    tagNames: ["Cloud", "DevOps", "Backend"]
  }
];

// Function to create tags collection first
export const createTagsCollection = async () => {
  try {
    console.log('Creating tags collection...');
    const tagIdMap = new Map<string, string>();
    
    // Check if tags already exist
    const existingTags = await getDocs(collection(db, 'tags'));
    if (existingTags.docs.length > 0) {
      console.log('Tags collection already exists, using existing tags...');
      existingTags.docs.forEach(doc => {
        tagIdMap.set(doc.data().name, doc.id);
      });
      return tagIdMap;
    }
    
    // Create new tags
    for (const tagData of tagsData) {
      const docRef = await addDoc(collection(db, 'tags'), {
        name: tagData.name,
        category: tagData.category,
        createdAt: new Date(),
      });
      tagIdMap.set(tagData.name, docRef.id);
      console.log(`Created tag: ${tagData.name} with ID: ${docRef.id}`);
    }
    
    return tagIdMap;
  } catch (error) {
    console.error('Error creating tags collection:', error);
    throw error;
  }
};

// Function to create techs collection with proper tag relationships
export const createTechsCollection = async (tagIdMap: Map<string, string>) => {
  try {
    console.log('Creating techs collection...');
    
    // Check if techs already exist
    const existingTechs = await getDocs(collection(db, 'techs'));
    if (existingTechs.docs.length > 0) {
      console.log('Techs collection already exists, skipping creation...');
      return;
    }
    
    // Create techs with tag IDs as foreign keys
    for (const techData of techsData) {
      const tagIds = techData.tagNames
        .map(tagName => tagIdMap.get(tagName))
        .filter(id => id !== undefined) as string[];
      
      const techDoc = {
        name: techData.name,
        icon: techData.icon,
        tags: tagIds, // Store tag IDs as foreign keys
        createdAt: new Date(),
      };
      
      await addDoc(collection(db, 'techs'), techDoc);
      console.log(`Created tech: ${techData.name} with tags: ${techData.tagNames.join(', ')}`);
    }
    
    console.log('Successfully created techs collection with tag relationships!');
  } catch (error) {
    console.error('Error creating techs collection:', error);
    throw error;
  }
};

// Function to update homepage to reference techs collection
export const updateHomepageForTechs = async () => {
  try {
    console.log('Updating homepage to use techs collection...');
    
    // Get all techs from the new collection
    const techsSnapshot = await getDocs(collection(db, 'techs'));
    const techs = techsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Update or create homepage document
    const homepageDoc = {
      about: "Full-stack developer passionate about creating innovative web applications using modern technologies. Experienced in both frontend and backend development with a focus on user experience and scalable solutions.",
      image: {
        src: "/portfolio/profile"
      },
      techs: techs, // Reference to techs from collection
      updatedAt: new Date(),
    };

    await setDoc(doc(db, 'homepage', 'main'), homepageDoc);
    console.log('Successfully updated homepage with techs reference!');
    
  } catch (error) {
    console.error('Error updating homepage:', error);
    throw error;
  }
};

export const uploadTechs = async () => {
  try {
    console.log('Starting upload process...');
    
    // Step 1: Create tags collection and get tag ID mapping
    const tagIdMap = await createTagsCollection();
    
    // Step 2: Create techs collection with tag relationships
    await createTechsCollection(tagIdMap);
    
    // Step 3: Update homepage to reference the techs collection
    await updateHomepageForTechs();
    
    console.log('Successfully completed upload process!');
    console.log('Database structure:');
    console.log('- tags collection: Contains all tags with names and categories');
    console.log('- techs collection: Contains technologies with tag IDs as foreign keys');
    console.log('- homepage collection: References techs from techs collection');
    
    return { success: true, message: 'Upload completed successfully with normalized structure' };
  } catch (error) {
    console.error('Error in upload process:', error);
    return { success: false, error };
  }
};

// Function to run the upload (call this from a component or page)
export const runUpload = () => {
  console.log('========================================');
  console.log('INITIALIZING NORMALIZED DATABASE STRUCTURE');
  console.log('========================================');
  
  uploadTechs().then(result => {
    if (result.success) {
      console.log('========================================');
      console.log('✅ UPLOAD COMPLETED SUCCESSFULLY');
      console.log('========================================');
      console.log('Your database now has:');
      console.log('1. Normalized tag structure with primary keys');
      console.log('2. Technologies with tag foreign key relationships');
      console.log('3. Homepage referencing the new structure');
      console.log('========================================');
      exit(0);
    } else {
      console.error('========================================');
      console.error('❌ UPLOAD FAILED');
      console.error('========================================');
      console.error('Error details:', result.error);
      console.error('========================================');
      exit(1);
    }
  });
};

// Function to verify the database structure
export const verifyDatabaseStructure = async () => {
  try {
    console.log('========================================');
    console.log('VERIFYING DATABASE STRUCTURE');
    console.log('========================================');
    
    // Check tags collection
    const tagsSnapshot = await getDocs(collection(db, 'tags'));
    console.log(`✅ Tags collection: ${tagsSnapshot.docs.length} tags found`);
    
    tagsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`   - ${data.name} (${data.category}) [ID: ${doc.id}]`);
    });
    
    // Check techs collection
    const techsSnapshot = await getDocs(collection(db, 'techs'));
    console.log(`✅ Techs collection: ${techsSnapshot.docs.length} technologies found`);
    
    // Create tag name map for display
    const tagMap = new Map();
    tagsSnapshot.docs.forEach(doc => {
      tagMap.set(doc.id, doc.data().name);
    });
    
    techsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const tagNames = data.tags ? data.tags.map((tagId: string) => tagMap.get(tagId) || tagId) : [];
      console.log(`   - ${data.name} (${data.icon}) [Tags: ${tagNames.join(', ')}]`);
    });
    
    // Check homepage collection
    const homepageSnapshot = await getDocs(collection(db, 'homepage'));
    console.log(`✅ Homepage collection: ${homepageSnapshot.docs.length} documents found`);
    
    homepageSnapshot.docs.forEach(doc => {
      const data = doc.data();
      console.log(`   - Homepage has ${data.techs ? data.techs.length : 0} tech references`);
    });
    
    console.log('========================================');
    console.log('DATABASE STRUCTURE VERIFICATION COMPLETE');
    console.log('========================================');
    
    return { success: true, message: 'Database structure verified successfully' };
  } catch (error) {
    console.error('Error verifying database structure:', error);
    return { success: false, error };
  }
};

// Function to run verification
export const runVerification = () => {
  verifyDatabaseStructure().then(result => {
    if (result.success) {
      console.log('✅ Verification completed successfully');
      exit(0);
    } else {
      console.error('❌ Verification failed:', result.error);
      exit(1);
    }
  });
};

// Uncomment the line below to run the upload
// runUpload();