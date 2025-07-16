'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
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

const Resume = () => {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResume = async () => {
            const docRef = doc(db, 'resume', 'brandon_martinez');
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setResumeData(docSnap.data() as ResumeData);
            }
            setLoading(false);
        };
        fetchResume();
    }, []);

    if (loading) {
        return (
            <div className='bg-gray-900 text-white p-8 h-full flex items-center justify-center'>
                <h1 className='text-2xl'>Loading resume...</h1>
            </div>
        );
    }

    if (!resumeData) {
        return (
            <div className='bg-gray-900 text-white p-8 h-full flex items-center justify-center'>
                <h1 className='text-2xl'>Resume data not found</h1>
            </div>
        );
    }

    return (
        <div className='bg-gray-900 text-white min-h-screen'>
            <div className='max-w-4xl mx-auto p-8'>
                {/* Header */}
                <header className='text-center mb-8'>
                    <h1 className='text-4xl font-bold mb-2 text-white'>{resumeData.name}</h1>
                    <p className='text-lg text-gray-300'>
                        <strong>{resumeData.contact.location}</strong> • {resumeData.contact.email} • {resumeData.contact.phone} •
                        <a href={`https://${resumeData.contact.github}`} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 ml-1">
                            {resumeData.contact.github}
                        </a>
                    </p>

                    {/* PDF Download Button */}
                    <div className='mt-6'>
                        <a
                            href="/api/resume/pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className='inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200'
                        >
                            📄 Download PDF
                        </a>
                    </div>
                </header>

                {/* Summary */}
                <section className='mb-8'>
                    <p className='text-lg leading-relaxed text-justify text-gray-100'>{resumeData.summary}</p>
                </section>

                <hr className='border-gray-600 mb-8' />

                {/* Projects */}
                <section className='mb-8'>
                    <h2 className='text-2xl font-bold mb-6 border-b-2 border-teal-400 pb-2 text-white'>Projects</h2>
                    {resumeData.projects.map((project, index) => (
                        <div key={index} className='mb-6'>
                            <div className='flex justify-between items-baseline mb-2'>
                                <h3 className='text-xl font-bold text-white'>{project.title}</h3>
                                <span className='text-md italic text-gray-400'>{project.duration}</span>
                            </div>
                            <p className='text-md mb-2 text-gray-200'>{project.description}</p>
                            <p className='text-sm text-gray-300'>
                                <strong>Technologies:</strong> {project.technologies.join(', ')}
                            </p>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 text-sm">
                                    View Project →
                                </a>
                            )}
                        </div>
                    ))}
                </section>

                <hr className='border-gray-600 mb-8' />

                {/* Skills */}
                <section className='mb-8'>
                    <h2 className='text-2xl font-bold mb-6 border-b-2 border-teal-400 pb-2 text-white'>Skills</h2>
                    <div className='space-y-2 text-gray-200'>
                        <p><strong className="text-white">Languages:</strong> {resumeData.skills.languages.join(', ')}</p>
                        <p><strong className="text-white">Frameworks & Libraries:</strong> {resumeData.skills.frameworks.join(', ')}</p>
                        <p><strong className="text-white">Tools & Platforms:</strong> {resumeData.skills.tools.join(', ')}</p>
                        <p><strong className="text-white">Other:</strong> {resumeData.skills.other.join(', ')}</p>
                    </div>
                </section>

                <hr className='border-gray-600 mb-8' />

                {/* Experience */}
                <section className='mb-8'>
                    <h2 className='text-2xl font-bold mb-6 border-b-2 border-teal-400 pb-2 text-white'>Experience</h2>
                    {resumeData.experience.map((exp, index) => (
                        <div key={index} className='mb-6'>
                            <div className='flex justify-between items-baseline mb-1'>
                                <h3 className='text-xl font-bold text-white'>{exp.role}</h3>
                                <span className='text-md italic text-gray-400'>{exp.duration}</span>
                            </div>
                            <p className='text-lg italic mb-3 text-gray-300'>{exp.company}</p>
                            <ul className='list-disc list-inside space-y-1'>
                                {exp.description.map((point, i) => (
                                    <li key={i} className='text-md text-gray-200'>{point}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>

                <hr className='border-gray-600 mb-8' />

                {/* Education */}
                <section className='mb-8'>
                    <h2 className='text-2xl font-bold mb-6 border-b-2 border-teal-400 pb-2 text-white'>Education</h2>
                    {resumeData.education.map((edu, index) => (
                        <div key={index} className='mb-4'>
                            <div className='flex justify-between items-baseline mb-1'>
                                <h3 className='text-lg font-bold text-white'>{edu.degree}</h3>
                                <span className='text-md italic text-gray-400'>{edu.duration}</span>
                            </div>
                            <p className='text-md italic text-gray-300'>{edu.institution}</p>
                            {edu.gpa && <p className='text-md text-gray-200'>GPA: {edu.gpa}</p>}
                        </div>
                    ))}
                </section>

                <hr className='border-gray-600 mb-8' />

                {/* Coursework and Awards */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {/* Coursework */}
                    <section>
                        <h2 className='text-2xl font-bold mb-6 border-b-2 border-teal-400 pb-2 text-white'>Notable Coursework</h2>
                        <ul className='list-disc list-inside space-y-2'>
                            {resumeData.coursework.map((course, index) => (
                                <li key={index} className='text-md text-gray-200'>{course}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Awards */}
                    <section>
                        <h2 className='text-2xl font-bold mb-6 border-b-2 border-teal-400 pb-2 text-white'>Awards</h2>
                        <ul className='list-disc list-inside space-y-2'>
                            {resumeData.awards.map((award, index) => (
                                <li key={index} className='text-md text-gray-200'>{award}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Resume;