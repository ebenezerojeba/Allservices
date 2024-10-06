import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span> </p>
      </div>
      <div>
        <img src={assets.contact_image} alt="" />
      </div>
    </div>
  )
}

export default Contact