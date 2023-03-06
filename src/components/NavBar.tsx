import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FcParallelTasks} from 'react-icons/fc'

const NavBar = () => {
    const navigate = useNavigate()
  return (
    <div className='h-screen w-[200px] min-w-[200px] bg-[#f7f7f5] border-r-[1px] border-r-[#f1f1ef] flex flex-col gap-2 items-center '>
      <button onClick={() => {navigate("/")}} className='p-2 gap-2 font-comfortaa flex items-center border-[1px] w-[90%] mt-2 rounded-md'><FcParallelTasks className='w-5 h-5'/>Task Manager</button>
      <button onClick={() => {navigate("/paint")}} className='p-2 font-comfortaa flex items-center border-[1px] w-[90%]  rounded-md'>Paint</button>
    </div>
  )
}

export default NavBar




