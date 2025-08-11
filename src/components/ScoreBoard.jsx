import React from 'react'



const ScoreBoard = ({score}) => {


  return (
    <>
    <div className='flex justify-between w-[300px] mb-4 text-lg font-semibold'>
        <div className='text-violet-400'>You (X) : {score.X}</div>
        <div className='text-[#b21f66]'>AI (O) : {score.O}</div>
    </div>
    </>
  )
}

export default ScoreBoard