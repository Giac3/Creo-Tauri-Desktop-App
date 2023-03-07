import React, { useEffect } from 'react'
import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { motion } from 'framer-motion';
import vidguy1 from '../assets/vidguy1.jpeg'
import vidguy2 from '../assets/vidguy2.jpeg'
import { IoVolumeMuteSharp } from 'react-icons/io5'
const Paint = () => {

  useEffect(() => {
    return () => {
      try {
        console.log("Creating data directory")
      createDir("CreoPaint", {
        dir: BaseDirectory.Desktop,
        recursive: true,
      });
    } catch (e) {
      console.error(e)
    }
    }
  }, [])

  return (
    <div className='flex items-center bg-gray-100 justify-center w-screen h-screen overflow-hidden'>
      <div className=' p-3 absolute shadow-md bg-opacity-10 bg-red-200 rounded-md group'>
        <img draggable={false} className='w-[1000px] aspect-auto rounded-md' src={vidguy1}/>
        <button className='absolute bottom-5 left-5 w-10 h-10 flex duration-300 group-hover:opacity-100 hover:text-red-500 opacity-0 hover:bg-white items-center justify-center bg-gray-300 rounded-md bg-opacity-50'><IoVolumeMuteSharp className='w-7 h-7'/></button>
      </div>
      <div>
      
        <img draggable={false} className='w-[300px] absolute aspect-auto rounded-md right-0 bottom-0' src={vidguy2}/>
        <button className='absolute bottom-5 left-5 w-10 h-10 flex duration-300 group-hover:opacity-100 hover:text-red-500 opacity-0 hover:bg-white items-center justify-center bg-gray-300 rounded-md bg-opacity-50'><IoVolumeMuteSharp className='w-7 h-7'/></button>
      </div>
    </div>
    
  )
}
export default Paint
