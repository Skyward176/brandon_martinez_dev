import {FaGithub} from 'react-icons/fa';
type ViewOnGithubProps = {
  url: string 
  className?:string
};

const ViewOnGithub = ({ url, className }: ViewOnGithubProps) => {
    return (
        <div className={`flex justify-center ${className ?? ''}`}>
          <div
          className='px-6 py-3 bg-black text-gray-100 font-medium rounded-lg hover:bg-teal-300 hover:text-black hover:scale-105 transition-colors flex w-96 justify-center'
          >
          <FaGithub className="inline-block mr-2 text-3xl" />
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl"
          >
            View Project on GitHub
          </a>
          </div>
        </div>
    )
}
export default ViewOnGithub;