import React from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'

const CTA = () => {
  return (
    <motion.section className='cta'
    initial={{
      opacity:0.9,

      y:100
    }}
    whileInView={{
      opacity:1,

      y:0
    }}
    transition={{
      type:"spring",
      stiffness:150
    }}
    >
        <p className='cta-text'>Wants To Create Something!!! <br className='sm:block hidden' /> Let's Build it Together 😇</p>
        <Link to={"/contact"} className='btn'>Contact</Link>

    </motion.section>
  )
}

export default CTA
