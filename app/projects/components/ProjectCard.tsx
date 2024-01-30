import CldImage from "@/components/CldImage";
const ProjectCard = (props:{name:string, description:string, url:string, img:string}) => {
return (
  <div className = 'flex flex-col w-1/2 p-4 shadow-sm shadow-gray-400'>
    <h1 className='text-4xl font-extralight text-teal-400'>{props.name}</h1>

    <CldImage
      src={props.img}
      width='500'
      height='500'
      className = 'w-full'
      alt= {`image of ${props.name}`}
    />
    <div className='p-4'>
      <p>{props.description}</p>
      <a href={props.url}>Check it out here!</a>
    </div>
  </div>
);
}
export default ProjectCard;
