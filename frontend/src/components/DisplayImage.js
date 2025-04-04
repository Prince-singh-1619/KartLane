import React from 'react'
import { IoMdClose } from 'react-icons/io'

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className='fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center p-4'>
        <div className='border border-black bg-white shadow-2xl rounded max-w-5xl mx-auto shadow-black pb-6'>
          <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}> 
            <IoMdClose/> 
          </div>

          <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
            <img src={imgUrl} className='w-full h-full border-2' alt=''/>
          </div>
        </div>
    </div>
  )
}

export default DisplayImage