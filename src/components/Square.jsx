import React from 'react'

const Square = ({value}) => {

    console.log(value);

  return (
    <div className='w-[90px] h-[90px] bg-[#1f0534] items-center justify-center border-1 border-purple-900'>
        {value}
    </div>
  )
}

export default Square