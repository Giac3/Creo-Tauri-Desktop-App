import { BaseDirectory, createDir, readTextFile, writeFile } from '@tauri-apps/api/fs'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import { FcParallelTasks } from 'react-icons/fc'
import { MdPlaylistAdd } from 'react-icons/md'
import { BsTrash } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { FcCancel } from 'react-icons/fc'
import { HTMLMotionProps, motion } from 'framer-motion'
const TaskManager = () => {
  const [toDos, setToDos] = useState<any>([])
  const [doings, setDoings] = useState<any>([])
  const [done, setDone] = useState<any>([])
  const [addToDo, setAddToDo] = useState(false)
  const [addDoing, setAddDoing] = useState(false)
  const [addDone, setAddDone] = useState(false)
  const [itemDragged, setItemDragged] = useState<number>()
  const toDoRef =  useRef() as React.MutableRefObject<HTMLTextAreaElement>
  const doingRef =  useRef() as React.MutableRefObject<HTMLTextAreaElement>
  const doneRef =  useRef() as React.MutableRefObject<HTMLTextAreaElement>
  const dragRef =  useRef() as RefObject<HTMLTextAreaElement>
  const toDosListRef =  useRef() as RefObject<HTMLDivElement>
  const doingsListRef =  useRef() as RefObject<HTMLDivElement>
  const doneListRef =  useRef() as RefObject<HTMLDivElement>

  useEffect(() => {
    try {
      readTextFile(`CreoTasks/data.json`,
      {
        dir: BaseDirectory.Desktop,
      }).then((res) => {
        let parse =  JSON.parse(res)
        
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


  const handleDragFinishToDo = (toDo:any, id:any)  => {

    if (dragRef.current!.getBoundingClientRect().left >= doingsListRef.current!.getBoundingClientRect().left && dragRef.current!.getBoundingClientRect().right <= doingsListRef.current!.getBoundingClientRect().right ) {
      setDoings((prevDoings:any) => ([...prevDoings, {text: toDo.text}]))
      handleRemoveToDo(id)
      setItemDragged(undefined)
    } else if (dragRef.current!.getBoundingClientRect().left >= doneListRef.current!.getBoundingClientRect().left && dragRef.current!.getBoundingClientRect().right <= doneListRef.current!.getBoundingClientRect().right ) {
      setDone((prevDones:any) => ([...prevDones, {text: toDo.text}]))
      handleRemoveToDo(id)
      setItemDragged(undefined)
    } 

  }
  const handleDragFinishDoings = (doing:any, id:any)  => {

    if (dragRef.current!.getBoundingClientRect().left >= toDosListRef.current!.getBoundingClientRect().left && dragRef.current!.getBoundingClientRect().right <= toDosListRef.current!.getBoundingClientRect().right ) {
      setToDos((prevToDos:any) => ([...prevToDos, {text: doing.text}]))
      handleRemoveDoing(id)
      setItemDragged(undefined)
    } else if (dragRef.current!.getBoundingClientRect().left >= doneListRef.current!.getBoundingClientRect().left && dragRef.current!.getBoundingClientRect().right <= doneListRef.current!.getBoundingClientRect().right ) {
      setDone((prevDones:any) => ([...prevDones, {text: doing.text}]))
      handleRemoveDoing(id)
      setItemDragged(undefined)
    }

  }

  const handleDragFinishDone = (done:any, id:any)  => {

    if (dragRef.current!.getBoundingClientRect().left >= toDosListRef.current!.getBoundingClientRect().left && dragRef.current!.getBoundingClientRect().right <= toDosListRef.current!.getBoundingClientRect().right ) {
      setToDos((prevToDos:any) => ([...prevToDos, {text: done.text}]))
      handleRemoveDone(id)
      setItemDragged(undefined)
    } else if (dragRef.current!.getBoundingClientRect().left >= doingsListRef.current!.getBoundingClientRect().left && dragRef.current!.getBoundingClientRect().right <= doingsListRef.current!.getBoundingClientRect().right ) {
      setDoings((prevDoings:any) => ([...prevDoings, {text: done.text}]))
      handleRemoveDone(id)
      setItemDragged(undefined)
    }

  }

  return (
    <div className=' w-full absolute h-[100%] items-center justify-center'>
      <div className='w-[1000px] left-24 h-full absolute top-20 flex flex-col  overflow-y-auto'>
        <div className='w-full h-20 flex items-center justify-center gap-20'>
          <div ref={toDosListRef} className=' font-comfortaa border-[1px]  flex gap-32  p-2 w-60 rounded-md items-center justify-center'> <span className='bg-red-200 p-1 rounded-md shadow-md flex items-center justify-center'> To Do </span> <span className='absolute mr-16 bg-gray-200 h-6 p-1 rounded-md flex items-center justify-center shadow-md'>{toDos.length}</span> <MdPlaylistAdd onClick={() => {setAddToDo(true)}} className='w-7 h-7 hover:text-gray-300 cursor-pointer'/></div>
          <div ref={doingsListRef} className=' font-comfortaa border-[1px]  flex gap-32  p-2 w-60 rounded-md items-center justify-center'> <span className='bg-orange-200 p-1 rounded-md shadow-md flex items-center justify-center'> Doing</span> <span className='absolute mr-16 bg-gray-200 h-6 p-1 rounded-md flex items-center justify-center shadow-md'>{doings.length}</span> <MdPlaylistAdd onClick={() => {setAddDoing(true)}} className='w-7 h-7 hover:text-gray-300 cursor-pointer'/></div>
          <div ref={doneListRef} className=' font-comfortaa border-[1px]  flex gap-32  p-2 w-60 rounded-md items-center justify-center'> <span className='bg-green-200 p-1 rounded-md shadow-md flex items-center justify-center'> Done</span> <span className='absolute mr-16 bg-gray-200 h-6 p-1 rounded-md flex items-center justify-center shadow-md'>{done.length}</span> <MdPlaylistAdd onClick={() => {setAddDone(true)}} className='w-7 h-7 hover:text-gray-300 cursor-pointer'/></div>
    
        </div>
        <div className=' w-full flex justify-center gap-20'>
        <div className=' font-comfortaa  flex flex-col gap-2  p-2 w-60 rounded-md '>
          {
             toDos.map((toDo:any, index:any) => {
              return (
                <motion.div
                drag
                dragSnapToOrigin={true}
                whileTap={{ scale: 0.95 }}
                onDragStart={() => {setItemDragged(index)}}
                onDragEnd={() => {handleDragFinishToDo(toDo, index)}}
                key={index} className=' group  w-full items-center justify-center flex'>
          <textarea 
          ref={itemDragged === index ? dragRef : null}
          readOnly={true} value={toDo.text} className='w-full select-none cursor-pointer flex shadow-md p-2 rounded-md text-sm resize-none outline-none'/>
          <BsTrash onClick={handleRemoveToDo} className='w-4 h-4 opacity-0 duration-300 group-hover:opacity-100 hover:text-gray-300 cursor-pointer ml-48 mt-8 absolute'/>
          </motion.div>
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
                <motion.div 
                drag
                dragSnapToOrigin={true}
                whileTap={{ scale: 0.95 }}
                onDragStart={() => {setItemDragged(index)}}
                onDragEnd={() => {handleDragFinishDoings(doing, index)}}
                key={index} className=' group  w-full items-center justify-center flex'>
          <textarea 
          ref={itemDragged === index ? dragRef : null}
          readOnly={true} value={doing.text} className='w-full  flex shadow-md p-2 rounded-md text-sm resize-none outline-none'/>
          <BsTrash onClick={handleRemoveDoing} className='w-4 h-4 opacity-0 duration-300 group-hover:opacity-100 hover:text-gray-300 cursor-pointer ml-48 mt-8 absolute'/>
          </motion.div>
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
                <motion.div 
                drag
                dragSnapToOrigin={true}
                whileTap={{ scale: 0.95 }}
                onDragStart={() => {setItemDragged(index)}}
                onDragEnd={() => {handleDragFinishDone(done, index)}}
                key={index} className=' group  w-full items-center justify-center flex'>
          <textarea 
          ref={itemDragged === index ? dragRef : null}
          readOnly={true} value={done.text} className='w-full  flex shadow-md p-2 rounded-md text-sm resize-none outline-none'/>
          <BsTrash onClick={handleRemoveDone} className='w-4 h-4 opacity-0 duration-300 group-hover:opacity-100 hover:text-gray-300 cursor-pointer ml-48 mt-8 absolute'/>
          </motion.div>
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
