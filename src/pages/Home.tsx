import React from 'react'
import TaskManager from '../components/TaskManager'
import { FcParallelTasks} from 'react-icons/fc'
const Home = () => {
  return (
    <div className='w-screen h-screen flex'>
      <h1 className=' text-2xl font-comfortaa flex gap-1 p-4 justify-center h-16 items-center'><FcParallelTasks/> Task Manager</h1>
      <TaskManager/>
    </div>
  )
}

export default Home
