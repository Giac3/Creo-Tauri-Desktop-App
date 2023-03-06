import { BaseDirectory, createDir, readTextFile, writeFile } from '@tauri-apps/api/fs'
import React, { useEffect, useRef, useState } from 'react'
import { FcParallelTasks } from 'react-icons/fc'
import { MdPlaylistAdd } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { FcCancel } from 'react-icons/fc'
const TaskManager = () => {
  const [toDos, setToDos] = useState<any>([])
  const [doings, setDoings] = useState<any>([])
  const [done, setDone] = useState<any>([])
  const [addToDo, setAddToDo] = useState(false)
  const [addDoing, setAddDoing] = useState(false)
  const [addDone, setAddDone] = useState(false)
  const toDoRef =  useRef() as React.MutableRefObject<HTMLTextAreaElement>
  const doingRef =  useRef() as React.MutableRefObject<HTMLTextAreaElement>
  const doneRef =  useRef() as React.MutableRefObject<HTMLTextAreaElement>

  useEffect(() => {
    try {
      readTextFile(`CreoTasks/data.json`,
      {
        dir: BaseDirectory.Desktop,
      }).then((res) => {
        let parse =  JSON.parse(res)
        console.log(parse)
        setToDos(parse.toDos)
        setDoings(parse.doings)
        setDone(parse.done)
      })
    } catch (e) {
      console.log(e);
    }
  }, [])

  useEffect(() => {
    return () => {
      try {
        console.log("Creating data directory")
      createDir("CreoTasks", {
        dir: BaseDirectory.Desktop,
        recursive: true,
      });
    } catch (e) {
      console.error(e)
    }
    }
  }, [])

  useEffect(() => {
    try {
      writeFile(
       {
         contents: JSON.stringify({toDos, doings, done}),
         path: `CreoTasks/data.json`,
       },
       {
         dir: BaseDirectory.Desktop,
       }
     );
   } catch (e) {
     console.log(e);
   }
  }, [toDos, doings, done])

  const handleAddToDo = () => {
    setToDos((prevToDos:any) => ([...prevToDos, {text: toDoRef.current.value}]))
    setAddToDo(false)
  }

  const handleRemoveToDo = (id:any) => {
    let copy = [...toDos]
    copy.splice(id, 1)
    setToDos(copy)
  }

  const handleAddDoings = () => {
    setDoings((prevDoings:any) => ([...prevDoings, {text: doingRef.current.value}]))
    setAddDoing(false)
  }

  const handleRemoveDoing = (id:any) => {
    let copy = [...doings]
    copy.splice(id, 1)
    setDoings(copy)
  }

  const handleAddDone = () => {
    setDone((prevDones:any) => ([...prevDones, {text: doneRef.current.value}]))
    setAddDone(false)
  }

  const handleRemoveDone = (id:any) => {
    let copy = [...done]
    copy.splice(id, 1)
    setDone(copy)
  }


  return (
    <div className=' w-full absolute h-[100%] items-center justify-center'>
      <div className='w-[1000px] left-24 h-full absolute top-20 flex flex-col  overflow-y-auto'>
        <div className='w-full h-20 flex items-center justify-center gap-20'>
          <div className=' font-comfortaa border-[1px]  flex gap-32  p-2 w-60 rounded-md items-center justify-center'> <span className='bg-red-200 p-1 rounded-md shadow-md flex items-center justify-center'> To Do </span> <span className='absolute mr-16 bg-gray-200 h-6 p-1 rounded-md flex items-center justify-center shadow-md'>{toDos.length}</span> <MdPlaylistAdd onClick={() => {setAddToDo(true)}} className='w-7 h-7 hover:text-gray-300 cursor-pointer'/></div>
          <div className=' font-comfortaa border-[1px]  flex gap-32  p-2 w-60 rounded-md items-center justify-center'> <span className='bg-orange-200 p-1 rounded-md shadow-md flex items-center justify-center'> Doing</span> <span className='absolute mr-16 bg-gray-200 h-6 p-1 rounded-md flex items-center justify-center shadow-md'>{doings.length}</span> <MdPlaylistAdd onClick={() => {setAddDoing(true)}} className='w-7 h-7 hover:text-gray-300 cursor-pointer'/></div>
          <div className=' font-comfortaa border-[1px]  flex gap-32  p-2 w-60 rounded-md items-center justify-center'> <span className='bg-green-200 p-1 rounded-md shadow-md flex items-center justify-center'> Done</span> <span className='absolute mr-16 bg-gray-200 h-6 p-1 rounded-md flex items-center justify-center shadow-md'>{done.length}</span> <MdPlaylistAdd onClick={() => {setAddDone(true)}} className='w-7 h-7 hover:text-gray-300 cursor-pointer'/></div>
    
        </div>
        <div className=' w-full flex justify-center gap-20'>
        <div className=' font-comfortaa  flex flex-col gap-2  p-2 w-60 rounded-md '>
          
          {
             toDos.map((toDo:any, index:any) => {
              return (
                <div key={index} className=' group  w-full items-center justify-center flex'>
          <textarea readOnly={true} value={toDo.text} className='w-full  flex shadow-md p-2 rounded-md text-sm resize-none outline-none'/>
          <BsTrash onClick={handleRemoveToDo} className='w-4 h-4 opacity-0 duration-300 group-hover:opacity-100 hover:text-gray-300 cursor-pointer ml-48 mt-8 absolute'/>
          </div>
              )
            })
          }

          {
            addToDo? 
            <div className=' group  w-full items-center justify-center flex'>
            <textarea ref={toDoRef} className='w-full  flex shadow-md p-2 rounded-md text-sm resize-none outline-none'></textarea>
            <AiOutlinePlus onClick={handleAddToDo} className='w-4 h-4 opacity-0 duration-300 group-hover:opacity-100 hover:text-gray-300 cursor-pointer ml-48 mt-8 absolute'/>
            <FcCancel onClick={() => {setAddToDo(false)}} className='w-4 h-4 opacity-0 duration-300 group-hover:opacity-100 hover:text-gray-300 cursor-pointer ml-40 mt-8 absolute'/>
            </div>
            : null
          }
        </div>
        <div className=' font-comfortaa  flex flex-col gap-2  p-2 w-60 rounded-md '>
        {
             doings.map((doing:any, index:any) => {
              return (
                <div key={index} className=' group  w-full items-center justify-center flex'>
          <textarea readOnly={true} value={doing.text} className='w-full  flex shadow-md p-2 rounded-md text-sm resize-none outline-none'/>
          <BsTrash onClick={handleRemoveDoing} className='w-4 h-4 opacity-0 duration-300 group-hover:opacity-100 hover:text-gray-300 cursor-pointer ml-48 mt-8 absolute'/>
          </div>
              )
            })
          }

        {
            addDoing? 
            <div className=' group  w-full items-center justify-center flex'>
            <textarea ref={doingRef} className='w-full  flex shadow-md p-2 rounded-md text-sm resize-none outline-none'></textarea>
            <AiOutlinePlus onClick={handleAddDoings} className='w-4 h-4 opacity-0 duration-300 group-hover:opacity-100 hover:text-gray-300 cursor-pointer ml-48 mt-8 absolute'/>
            <FcCancel onClick={() => {setAddDoing(false)}} className='w-4 h-4 opacity-0 duration-300 group-hover:opacity-100 hover:text-gray-300 cursor-pointer ml-40 mt-8 absolute'/>
            </div>
            : null
          }
        </div>
        <div className=' font-comfortaa  flex flex-col gap-2  p-2 w-60 rounded-md '>

        {
             done.map((done:any, index:any) => {
              return (
                <div key={index} className=' group  w-full items-center justify-center flex'>
          <textarea readOnly={true} value={done.text} className='w-full  flex shadow-md p-2 rounded-md text-sm resize-none outline-none'/>
          <BsTrash onClick={handleRemoveDone} className='w-4 h-4 opacity-0 duration-300 group-hover:opacity-100 hover:text-gray-300 cursor-pointer ml-48 mt-8 absolute'/>
          </div>
              )
            })
          }

        {
            addDone? 
            <div className=' group  w-full items-center justify-center flex'>
            <textarea ref={doneRef} className='w-full  flex shadow-md p-2 rounded-md text-sm resize-none outline-none'></textarea>
            <AiOutlinePlus onClick={handleAddDone} className='w-4 h-4 opacity-0 duration-300 group-hover:opacity-100 hover:text-gray-300 cursor-pointer ml-48 mt-8 absolute'/>
            <FcCancel onClick={() => {setAddDone(false)}} className='w-4 h-4 opacity-0 duration-300 group-hover:opacity-100 hover:text-gray-300 cursor-pointer ml-40 mt-8 absolute'/>
            </div>
            : null
          }

        </div>
        </div>
      </div>
    </div>
  )
}

export default TaskManager
