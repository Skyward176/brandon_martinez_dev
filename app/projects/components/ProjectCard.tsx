import CldImage from "@/components/CldImage";
const ProjectCard = (props:{name:string, description:string, url:string, img:string}) => {
return (
  <div className = 'flex flex-col w-full md:w-1/3 p-6 my-4 m-auto border-solid border-1 border-gray-400 rounded-lg relative'>
    <h1 className='text-4xl font-extralight text-teal-400 mb-4'>{props.name}</h1>

    <CldImage
      src={props.img}
      width={400}
      height={400}
      className='w-full object-contain border border-gray-800 rounded-lg mb-4'
      alt= {`image of ${props.name}`}
    />
    <div className='flex-grow pb-12'>
      <p className='mb-3'>{props.description}</p>
    </div>
    <a className='text-teal-300 hover:underline hover:text-pink-300 text-xl absolute bottom-6 right-6'href={props.url}>Check it out here!</a>
  </div>
);
}
export default ProjectCard;
