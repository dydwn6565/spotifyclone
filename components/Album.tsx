import React from 'react'
import { BiUserVoice } from 'react-icons/bi'

type Props = {}

const Album = (props: Props) => {
  return (
     <div className="flex flex-col items-center justify-center bg-neutral-900 h-screen ">
      <BiUserVoice className="scale-875 fill-white" />
      
      <div className="text-white mt-16  text-3xl font-bold">Follow your first Album</div>
      <div className="text-white mt-8 text-2xl">Press the heart icon to save your favorite ablum</div>
      <button className="bg-white w-36 h-12 rounded-3xl mt-10">Find Album</button>
    </div>
  )
  
}

export default Album