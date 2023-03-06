import React, { useEffect } from 'react'
import { BaseDirectory, createDir } from "@tauri-apps/api/fs";

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
    <div>
      Stuff
    </div>
  )
}

export default Paint
