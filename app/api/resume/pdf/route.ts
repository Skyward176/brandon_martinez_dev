import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { renderToBuffer } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import React from 'react';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 11,
    color: '#333333',
  },
  summary: {
    fontSize: 11,
    textAlign: 'justify',
    marginBottom: 20,
    lineHeight: 1.4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#000000',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingBottom: 3,
  },
  projectContainer: {
    marginBottom: 12,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  projectDuration: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  projectDescription: {
    fontSize: 10,
    marginBottom: 2,
    lineHeight: 1.3,
  },
  technologies: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  skillCategory: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  skillLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    width: 120,
  },
  skillList: {
    fontSize: 10,
    flex: 1,
  },
  experienceItem: {
    marginBottom: 12,
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  roleTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 3,
  },
  duration: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  bulletPoint: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 1,
  },
  educationItem: {
    marginBottom: 8,
  },
  degreeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  degree: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  institution: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  courseworkItem: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.3,
  },
  awardItem: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.3,
  }
});

export async function GET() {
  try {
    // Fetch resume data from Firestore
    const docRef = doc(db, 'resume', 'brandon_martinez');
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return new NextResponse('Resume data not found', { status: 404 });
    }

    const data = docSnap.data();

    // Create PDF document inline
    const MyDocument = () => (
      React.createElement(Document, {},
        React.createElement(Page, { size: "A4", style: styles.page },
          // Header
          React.createElement(View, { style: styles.header },
            React.createElement(Text, { style: styles.name }, data.name),
            React.createElement(Text, { style: styles.contactInfo },
              `${data.contact.location} • ${data.contact.email} • ${data.contact.phone} • ${data.contact.github}`
            )
          ),
          
          // Summary
          React.createElement(Text, { style: styles.summary }, data.summary),
          
          // Projects
          React.createElement(Text, { style: styles.sectionTitle }, "Projects"),
          ...data.projects.map((project: any, index: number) =>
            React.createElement(View, { key: index, style: styles.projectContainer },
              React.createElement(View, { style: styles.projectHeader },
                React.createElement(Text, { style: styles.projectTitle }, project.title),
                React.createElement(Text, { style: styles.projectDuration }, project.duration)
              ),
              React.createElement(Text, { style: styles.projectDescription }, project.description),
              React.createElement(Text, { style: styles.technologies },
                `Technologies: ${project.technologies.join(', ')}`
              )
            )
          ),
          
          // Skills
          React.createElement(Text, { style: styles.sectionTitle }, "Skills"),
          React.createElement(View, { style: styles.skillCategory },
            React.createElement(Text, { style: styles.skillLabel }, "Languages:"),
            React.createElement(Text, { style: styles.skillList }, data.skills.languages.join(', '))
          ),
          React.createElement(View, { style: styles.skillCategory },
            React.createElement(Text, { style: styles.skillLabel }, "Frameworks:"),
            React.createElement(Text, { style: styles.skillList }, data.skills.frameworks.join(', '))
          ),
          React.createElement(View, { style: styles.skillCategory },
            React.createElement(Text, { style: styles.skillLabel }, "Tools:"),
            React.createElement(Text, { style: styles.skillList }, data.skills.tools.join(', '))
          ),
          React.createElement(View, { style: styles.skillCategory },
            React.createElement(Text, { style: styles.skillLabel }, "Other:"),
            React.createElement(Text, { style: styles.skillList }, data.skills.other.join(', '))
          ),
          
          // Experience
          React.createElement(Text, { style: styles.sectionTitle }, "Experience"),
          ...data.experience.map((exp: any, index: number) =>
            React.createElement(View, { key: index, style: styles.experienceItem },
              React.createElement(View, { style: styles.roleHeader },
                React.createElement(Text, { style: styles.roleTitle }, exp.role),
                React.createElement(Text, { style: styles.duration }, exp.duration)
              ),
              React.createElement(Text, { style: styles.company }, exp.company),
              ...exp.description.map((point: string, i: number) =>
                React.createElement(Text, { key: i, style: styles.bulletPoint }, `• ${point}`)
              )
            )
          ),
          
          // Education
          React.createElement(Text, { style: styles.sectionTitle }, "Education"),
          ...data.education.map((edu: any, index: number) =>
            React.createElement(View, { key: index, style: styles.educationItem },
              React.createElement(View, { style: styles.degreeHeader },
                React.createElement(Text, { style: styles.degree }, edu.degree),
                React.createElement(Text, { style: styles.duration }, edu.duration)
              ),
              React.createElement(Text, { style: styles.institution }, edu.institution),
              edu.gpa ? React.createElement(Text, { style: styles.institution }, `GPA: ${edu.gpa}`) : null
            )
          ),
          
          // Coursework
          React.createElement(Text, { style: styles.sectionTitle }, "Notable Coursework"),
          ...data.coursework.map((course: string, index: number) =>
            React.createElement(Text, { key: index, style: styles.courseworkItem }, `• ${course}`)
          ),
          
          // Awards
          React.createElement(Text, { style: styles.sectionTitle }, "Awards"),
          ...data.awards.map((award: string, index: number) =>
            React.createElement(Text, { key: index, style: styles.awardItem }, `• ${award}`)
          )
        )
      )
    );

    // Generate PDF buffer
    const pdfBuffer = await renderToBuffer(React.createElement(MyDocument));
    
    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="brandon_martinez_resume.pdf"',
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Error generating PDF', { status: 500 });
  }
}
