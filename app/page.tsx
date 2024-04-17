// this is the about/homepage
import {RiJavascriptLine, RiReactjsLine, RiTriangleFill, RiHtml5Line} from 'react-icons/ri';
import {TbBrandPython, TbBrandDjango} from 'react-icons/tb';
import {FaJava, FaAws} from 'react-icons/fa';
import {FaCodeBranch } from 'react-icons/fa6';
import {AiOutlineCode} from 'react-icons/ai';
import CldImage from '@/components/CldImage';
export default function Home() {
  return (
    <div className='bg-black h-full flex flex-col md:flex-row overflow-y-scroll'>
        <div className='flex w-100% p-4 mx-16 md:mx-auto my-auto md:w-1/3'>
          <CldImage
            src='/portfolio/profile'
            alt='a picture of me'
            width='500'
            height='500'
            className='rounded-md '
          /> 
        </div>

        <div className='w-100% p-4 mx-16 md:mx-auto my-auto md:w-1/3'>
          <p className='text-center text-teal-400 text-4xl'>
            About Me
          </p>
          <br/>
          <p className='text-white font-extralight text-center text-xl'> 
            A third year Computer Science student and software developer. I'm learning C and Systems Programming right now. My hobbies right now are Overwatch and catching up on One Piece.
          </p> 
        </div>
        <div className='w-100% p-4 mx-16 md:mx-auto my-auto md:w-1/3'>
          <p className='text-center text-teal-400 text-4xl'>
            Techs:
          </p>
          <br/>
          <ul className='text-xl text-white font-extralight'>
            <li className='my-2 flex flex-row justify-left items-center'> <RiJavascriptLine className='mr-2 text-2xl text-teal-400'/><p>JavaScript</p></li>
            <li className='my-2 flex flex-row justify-left items-center'> <FaCodeBranch className='mr-2 text-2xl text-teal-400'/><p>Git</p></li>
            <li className='my-2 flex flex-row justify-left items-center'> <RiReactjsLine className='mr-2 text-2xl text-teal-400'/>React.js </li>
            <li className='my-2 flex flex-row justify-left items-center'> <RiTriangleFill className='mr-2 text-2xl text-teal-400'/>Next.js </li>
            <li className='my-2 flex flex-row justify-left items-center'> <TbBrandPython className='mr-2 text-2xl text-teal-400'/>Python </li>
            <li className='my-2 flex flex-row justify-left items-center'><TbBrandDjango className='mr-2 text-2xl text-teal-400'/>Django </li>
            <li className='my-2 flex flex-row justify-left items-center'><RiHtml5Line className='mr-2 text-2xl text-teal-400'/>HTML 5 + CSS</li>
            <li className='my-2 flex flex-row justify-left items-center'><FaJava className='mr-2 text-2xl text-teal-400'/>Java </li>
            <li className='my-2 flex flex-row justify-left items-center'><AiOutlineCode className='mr-2 text-2xl text-teal-400'/>C </li>
            <li className='my-2 flex flex-row justify-left items-center'><FaAws className='mr-2 text-2xl text-teal-400'/>AWS </li>
          </ul>
        </div>
      </div>
  )
}
