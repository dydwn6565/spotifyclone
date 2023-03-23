import React from 'react'

type Props = {}

export default function Logout({}: Props) {

  return (
    <div className='absolute flex  justify-center flex-col ml-[50%] mt-[20%] left-0 top-0 w-64 h-16   bg-yellow-500 z-10'>
        <div className='flex justify-center'>Would like to logout?</div>
        <div className=' flex justify-evenly'>
            <div className='text-white cursor-pointer'>Yes</div>
            <div className='text-white cursor-pointer'>No</div>
        </div>
    </div>
  )
}