import React from 'react'
import { motion, scale } from 'framer-motion'

const Square = ({value, onClick}) => {

  return (
    <motion.button className='w-[90px] h-[90px] bg-[#1f0534] flex text-4xl font-semibold  items-center justify-center border-1 border-purple-900'
    whileTap={{scale:0.9}}
    onClick={onClick}>
        {value}
    </motion.button>
  )
}

export default Square