'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Contact {
  email: string;
  phone: string;
  location: string;
  github: string;
}

interface Project {
  title: string;
  duration: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

interface Education {
  degree: string;
  institution: string;
  duration: string;
  gpa?: string;
}

interface Skills {
  languages: string[];
  frameworks: string[];
  tools: string[];
  other: string[];
}

interface ResumeData {
  name: string;
  contact: Contact;
  summary: string;
  projects: Project[];
  skills: Skills;
  experience: Experience[];
  education: Education[];
  coursework: string[];
  awards: string[];
}

const ResumeEditor = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      const docRef = doc(db, 'resume', 'brandon_martinez');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setResumeData(docSnap.data() as ResumeData);
      } else {
        // Initialize with data from the markdown
        setResumeData({
          name: 'Brandon Martinez',
          contact: {
            email: 'brandonam04@gmail.com',
            phone: '(732) 810-2978',
            location: 'Manalapan, NJ',
            github: 'github.com/Skyward176'
          },
          summary: 'Aspiring Software Developer and Computer Science student passionate about full-stack development, AI/ML, and elegant user experiences. Seeking a full-time position to contribute to meaningful software projects and grow as an engineer.',
          projects: [
            {
              title: 'AIrys',
              duration: 'Apr 2025 – Present',
              description: 'An AI agent designed to run efficiently on a 24GB VRAM system.',
              technologies: ['PyTorch', 'NLP', 'Python', 'LLMs', 'HuggingFace']
            },
            {
              title: 'brandonmartinez.dev',
              duration: '2021 – Present',
              description: 'Personal portfolio featuring a blog, project stream, admin panel, and skill database.',
              technologies: ['Next.js', 'React', 'TailwindCSS', 'Firebase']
            },
            {
              title: 'UpLift',
              duration: '2023',
              description: 'Capstone web app enabling users to create and share workout routines.',
              technologies: ['Next.js', 'Firebase', 'TailwindCSS']
            },
            {
              title: 'dialedIn',
              duration: '2021',
              description: 'Espresso recipe tracking tool for recording brew variables and flavor notes.',
              technologies: ['Django', 'Django REST Framework', 'PostgreSQL', 'Docker', 'Bootstrap']
            }
          ],
          skills: {
            languages: ['Python', 'JavaScript', 'C', 'HTML/CSS'],
            frameworks: ['React', 'Vue', 'Django', 'Next.js', 'Nuxt.js', 'TailwindCSS', 'PyTorch', 'HuggingFace'],
            tools: ['Git', 'Linux', 'Docker', 'Firebase', 'VSCode', 'Neovim'],
            other: ['Fluent in Spanish']
          },
          experience: [
            {
              role: 'IT Help Desk Intern',
              company: 'Institute for Advanced Study',
              duration: 'Sep 2023 to Aug 2024',
              description: [
                'Triaged incoming support tickets for PC and Mac systems.',
                'Resolved issues involving Microsoft Office, Exchange, and enterprise software.',
                'Provided hardware/software support and inventory management.',
                'Gained exposure to Active Directory and enterprise IT workflows.'
              ]
            },
            {
              role: 'Barista',
              company: 'Jamesbrew',
              duration: 'Nov 2022 to Aug 2023',
              description: [
                'Crafted high-quality espresso beverages.',
                'Maintained cleanliness and delivered exceptional customer service.'
              ]
            },
            {
              role: 'Barista Trainer',
              company: 'Starbucks',
              duration: 'Jul 2021 to Nov 2022',
              description: [
                'Led onboarding and training of new hires.',
                'Ensured team adherence to store procedures and customer experience standards.'
              ]
            },
            {
              role: 'Web Intern',
              company: 'Hansen Info Tech',
              duration: 'Mar 2021 to May 2021',
              description: [
                'Updated and created HTML/CSS content for client websites.',
                'Observed professional web workflows and team collaboration best practices.'
              ]
            }
          ],
          education: [
            {
              degree: 'BS in Computer Science',
              institution: 'Rutgers University',
              duration: 'Expected May 2025',
              gpa: '3.3'
            },
            {
              degree: 'AS in Computer Science',
              institution: 'Brookdale Community College',
              duration: '2021 – 2023',
              gpa: '3.9'
            },
            {
              degree: 'High School Diploma',
              institution: 'Manalapan High School',
              duration: 'Class of 2021',
              gpa: '4.3'
            }
          ],
          coursework: [
            'Intro to AI: Studied fundamental statistical models including Bayesian networks, perceptrons, and Q-learning.',
            'Internet Technology: Learned design and implementation of the Internet stack (Link, Transport, Network, Application).',
            'Systems Programming: Built a custom malloc implementation, deepening understanding of memory management in C.'
          ],
          awards: [
            'National Merit Recognized Scholar — National Merit Scholarship Corporation (2021) Top 50,000 scorers nationwide on the NMSQT exam.'
          ]
        });
      }
      setLoading(false);
    };
    fetchResume();
  }, []);

  const handleSave = async () => {
    if (resumeData) {
      const docRef = doc(db, 'resume', 'brandon_martinez');
      await setDoc(docRef, resumeData, { merge: true });
      alert('Resume saved successfully!');
    }
  };

  const updateField = (field: keyof ResumeData, value: any) => {
    if (resumeData) {
      setResumeData({ ...resumeData, [field]: value });
    }
  };

  const updateContact = (field: keyof Contact, value: string) => {
    if (resumeData) {
      setResumeData({
        ...resumeData,
        contact: { ...resumeData.contact, [field]: value }
      });
    }
  };

  const updateSkills = (field: keyof Skills, value: string[]) => {
    if (resumeData) {
      setResumeData({
        ...resumeData,
        skills: { ...resumeData.skills, [field]: value }
      });
    }
  };

  const addProject = () => {
    if (resumeData) {
      const newProject: Project = {
        title: '',
        duration: '',
        description: '',
        technologies: []
      };
      setResumeData({
        ...resumeData,
        projects: [...resumeData.projects, newProject]
      });
    }
  };

  const updateProject = (index: number, field: keyof Project, value: any) => {
    if (resumeData) {
      const updatedProjects = [...resumeData.projects];
      updatedProjects[index] = { ...updatedProjects[index], [field]: value };
      setResumeData({ ...resumeData, projects: updatedProjects });
    }
  };

  const removeProject = (index: number) => {
    if (resumeData) {
      const updatedProjects = resumeData.projects.filter((_, i) => i !== index);
      setResumeData({ ...resumeData, projects: updatedProjects });
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!resumeData) {
    return <div className="text-white">Failed to load resume data</div>;
  }

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Resume</h2>
      
      {/* Basic Info */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={resumeData.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={resumeData.contact.email}
              onChange={(e) => updateContact('email', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="tel"
              value={resumeData.contact.phone}
              onChange={(e) => updateContact('phone', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Location</label>
            <input
              type="text"
              value={resumeData.contact.location}
              onChange={(e) => updateContact('location', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">GitHub</label>
            <input
              type="text"
              value={resumeData.contact.github}
              onChange={(e) => updateContact('github', e.target.value)}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Summary</h3>
        <textarea
          value={resumeData.summary}
          onChange={(e) => updateField('summary', e.target.value)}
          className="w-full p-2 bg-gray-700 rounded h-24"
        />
      </div>

      {/* Projects */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Projects</h3>
          <button
            onClick={addProject}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
          >
            Add Project
          </button>
        </div>
        {resumeData.projects.map((project, index) => (
          <div key={index} className="mb-4 p-3 bg-gray-700 rounded">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium">Project {index + 1}</h4>
              <button
                onClick={() => removeProject(index)}
                className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 text-sm">Title</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                  className="w-full p-2 bg-gray-600 rounded text-sm"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Duration</label>
                <input
                  type="text"
                  value={project.duration}
                  onChange={(e) => updateProject(index, 'duration', e.target.value)}
                  className="w-full p-2 bg-gray-600 rounded text-sm"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="block mb-1 text-sm">Description</label>
              <textarea
                value={project.description}
                onChange={(e) => updateProject(index, 'description', e.target.value)}
                className="w-full p-2 bg-gray-600 rounded text-sm h-20"
              />
            </div>
            <div className="mt-3">
              <label className="block mb-1 text-sm">Technologies (comma-separated)</label>
              <input
                type="text"
                value={project.technologies.join(', ')}
                onChange={(e) => updateProject(index, 'technologies', e.target.value.split(', ').filter(t => t.trim()))}
                className="w-full p-2 bg-gray-600 rounded text-sm"
              />
            </div>
            <div className="mt-3">
              <label className="block mb-1 text-sm">Link (optional)</label>
              <input
                type="url"
                value={project.link || ''}
                onChange={(e) => updateProject(index, 'link', e.target.value)}
                className="w-full p-2 bg-gray-600 rounded text-sm"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-8 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Languages (comma-separated)</label>
            <input
              type="text"
              value={resumeData.skills.languages.join(', ')}
              onChange={(e) => updateSkills('languages', e.target.value.split(', ').filter(s => s.trim()))}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Frameworks (comma-separated)</label>
            <input
              type="text"
              value={resumeData.skills.frameworks.join(', ')}
              onChange={(e) => updateSkills('frameworks', e.target.value.split(', ').filter(s => s.trim()))}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Tools (comma-separated)</label>
            <input
              type="text"
              value={resumeData.skills.tools.join(', ')}
              onChange={(e) => updateSkills('tools', e.target.value.split(', ').filter(s => s.trim()))}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Other (comma-separated)</label>
            <input
              type="text"
              value={resumeData.skills.other.join(', ')}
              onChange={(e) => updateSkills('other', e.target.value.split(', ').filter(s => s.trim()))}
              className="w-full p-2 bg-gray-700 rounded"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
      >
        Save Resume
      </button>
    </div>
  );
};

export default ResumeEditor;
