import { promises as fs } from 'fs';
import ProjectCard from './components/ProjectCard';
async function Projects() {

  //testing opening jsons
  const file = await fs.readFile(process.cwd() + '/app/projects/database/upLift.json', 'utf8');
  const data = JSON.parse(file);
  return (
    <div className='text-white p-4'>
      <ProjectCard
        name={data.name}
        description={data.description}
        url={data.url}
        img={data.img}
      />
    </div>
  )
}
export default Projects;
