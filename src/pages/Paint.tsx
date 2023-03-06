import React, { useEffect } from 'react'
import { BaseDirectory, createDir } from "@tauri-apps/api/fs";
import { motion } from 'framer-motion';

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
    <div className='flex items-center justify-center w-screen overflow-scroll h-screen'>
    </div>
  )
}

export default Paint
