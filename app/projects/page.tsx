import { promises as fs } from 'fs';
import ProjectCard from './components/ProjectCard';
async function Projects() {

  //testing opening jsons
  // this is a silly way to do this but I don't want to write a loop right now

  const file1 = await fs.readFile(process.cwd() + '/app/projects/database/upLift.json', 'utf8');
  const data1 = JSON.parse(file1);
  const file2 = await fs.readFile(process.cwd() + '/app/projects/database/kantan.json', 'utf8');
  const data2 = JSON.parse(file2);
  return (
    <div className='flex text-white p-4'>

      <ProjectCard
        name={data1.name}
        description={data1.description}
        url={data1.url}
        img={data1.img}
      />

      <ProjectCard
        name={data2.name}
        description={data2.description}
        url={data2.url}
        img={data2.img}
      />

    </div>
  )
}
export default Projects;
