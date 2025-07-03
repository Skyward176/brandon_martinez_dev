import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ProjectCard from './components/ProjectCard';

const loader = async () => { //loads projects from db
  const docRef = await getDocs(collection(db, 'projects'));
  const data = docRef.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
}

async function Projects() {
  const projects = await loader(); // get the projects from the db

  return (
    <div className='flex flex-col md:flex-row text-white p-8'>
      {projects.map((project: any) => (
        <ProjectCard
          key={project.id}
          name={project.name}
          description={project.description}
          url={project.url}
          img={project.img}
        />
      ))}
    </div>
  )
}

export default Projects;
