import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { exit } from 'process';

const techsData = [
  { name: "JavaScript", icon: "RiJavascriptLine" },
  { name: "Git", icon: "FaCodeBranch" },
  { name: "React.js", icon: "RiReactjsLine" },
  { name: "Next.js", icon: "RiTriangleFill" },
  { name: "Python", icon: "TbBrandPython" },
  { name: "Django", icon: "TbBrandDjango" },
  { name: "HTML 5 + CSS", icon: "RiHtml5Line" },
  { name: "Java", icon: "FaJava" },
  { name: "C", icon: "AiOutlineCode" },
  { name: "AWS", icon: "FaAws" }
];

export const uploadTechs = async () => {
  try {
    // Create the homepage document with techs array
    const homepageDoc = {
      about: "Your about text here...", // You can update this
      image: {
        src: "/portfolio/profile"
      },
      techs: techsData
    };

    // Upload to the homepage collection
    await setDoc(doc(db, 'homepage', 'main'), homepageDoc);
    
    console.log('Successfully uploaded techs to homepage document!');
    return { success: true, message: 'Techs uploaded successfully' };
  } catch (error) {
    console.error('Error uploading techs:', error);
    return { success: false, error };
  }
};

// Function to run the upload (call this from a component or page)
export const runUpload = () => {
  uploadTechs().then(result => {
    if (result.success) {
      console.log('Upload completed successfully');
      exit()
    } else {
      console.error('Upload failed:', result.error);
    }
  });
};
runUpload()