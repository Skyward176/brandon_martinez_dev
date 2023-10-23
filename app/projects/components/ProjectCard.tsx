import Image from 'next/image';
const ProjectCard = (props) => {
return (
  <div>
    <h1>{props.name}</h1>
    <Image 
      src='/upLift.png'
      width='500'
      height='500'
      alt='A screenshot of this project'
    />
    <div>
      <p>{props.description}</p>
      <a href={props.url}>Check it out here!</a>
    </div>
  </div>
);
}
export default ProjectCard;
