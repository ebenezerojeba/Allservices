import React, { useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)
  return (
    <div className='flex flex-col items-center gap-4 my-6 text-gray-900 md:mx-10'>
    <h1 className=' text-2xl text-blue-800 text-center font-bold font-Ysabeau'>Top Skilled-Workers to Book</h1>
    <p className='sm:w-1/3 mb-4 text-center text-sm'>Simply browse through our extended list of trusted skilled-workers</p>
    <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y- px-3 sm:px-0'>
   {doctors.slice(3,7).map((item,index)=>(
    <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
        <img className='bg-blue-50' src={item.image} alt="" />
        <div className='p-4'>
            <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'} `}>
              <p className={`h-2 w-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'}  rounded-full`}></p><p>{item.available ? 'Available': "Not Available"}</p>
            </div>
            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
            <p className='text-gray-600 text-sm'>{item.speciality}</p>
        </div>
    </div>
   ))}
    </div>
    <button onClick={()=>{navigate('/artisans'); scrollTo(0,0)}} className='bg-blue-50'>more</button>
</div>
  )
}

export default TopDoctors

