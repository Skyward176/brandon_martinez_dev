import CldImage from "@/components/CldImage";

interface ProjectCardProps {
  name: string;
  description: string;
  url: string;
  img?: string;
  videoUrl?: string;
}

const ProjectCard = (props: ProjectCardProps) => {
  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const renderMedia = () => {
    if (props.videoUrl) {
      const videoId = getYouTubeVideoId(props.videoUrl);
      if (videoId) {
        return (
          <div className='w-full aspect-video mb-4'>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={`${props.name} video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className='rounded-lg border border-pink-300'
            />
          </div>
        );
      }
    }
    
    if (props.img) {
      return (
        <CldImage
          src={props.img}
          width={400}
          height={400}
          className='w-full object-contain border border-pink-300 rounded-lg mb-4'
          alt={`image of ${props.name}`}
        />
      );
    }
    
    return null;
  };

  return (
    <div className='flex flex-col w-full md:w-1/3 p-6 my-4 mx-2 border-solid border-1 border-gray-400 rounded-lg'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-extralight text-teal-400 mb-4 break-words leading-tight'>{props.name}</h1>
      
      {renderMedia()}
      
      <div className=''>
        <p className='mb-3'>{props.description}</p>
        <a href={props.url} className='text-teal-400 hover:text-teal-300 transition-colors'>
          Check it out here!
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;
