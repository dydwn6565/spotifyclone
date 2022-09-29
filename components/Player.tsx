import React,{useState} from 'react'

type Props = {}

function Player({}: Props) {
    const [currentPlayerId,setCurrentPlayerId] = useState();
  return (
    <div className="sticky bottom-0 w-full h-24 bg-white">Player</div>
  )
}

export default Player