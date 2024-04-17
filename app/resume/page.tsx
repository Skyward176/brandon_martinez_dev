'use client'
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import './resume.css'
import { useEffect, useState } from 'react';
const Resume = () => {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch('/resume.md')
            .then(response => response.text())
            .then(text => setMarkdown(text));
    }, []);

    return (
        <div>
            <h1> Excuse the mess, this section is under construction! </h1>
            <ReactMarkdown children={markdown} rehypePlugins={[rehypeRaw]} />
        </div>
    );
};
export default Resume;