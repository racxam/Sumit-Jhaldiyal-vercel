import React, { useRef } from 'react'
import { projects } from '../constants'
import { Link } from 'react-router-dom'
import { arrow } from '../assets/icons'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import { motion,useInView } from 'framer-motion'

const Projects = () => {
  const aniref=useRef(null);
  const isInView=useInView(aniref,{once:true});

  const cardVariant={
    initial:{
      y:100,
      opacity:0
    },
    animate:{
      y:0,
      opacity:1,
      transition:{
        staggerChildren:"0.5"
      }
    }
  }
  const containerVariant = {
    hidden: { opacity: 0.8 },
    visible: {
      opacity:1 ,
      transition: {
        staggerChildren: 0.1// Adjust the stagger delay as needed
      }
    }
  };
  
  const itemVariant = {
    hidden: { opacity: 0.7, scale: 0.9,y:"-0.3vw",x:"-2.67vw"},

    visible: {
      opacity: 1,
      scale: 1,
      x:0,
      y:0,
      transition: {
        type:"spring",
        stiffness:"90"
      }
    }
  };

  return (
    <motion.section className='max-container'
    variants={containerVariant}
    initial="hidden"
    whileInView="visible"
    >
      <motion.h1 className='head-text' 
      variants={itemVariant}
      >My<span className='font-semibold blue-gradient_text drop-shadow'> Projects</span></motion.h1>
      <motion.div className='mt-5 flex flex-col gap-3 text-slate-500'
      >
        <motion.p
         initial={{
          opacity:0.6,
           y:7
        }}
        whileInView={{
          opacity:1,
          y:0
        }}
        transition={{
          duration:0.4
        }}
             
        >"Venturing into diverse projects, each one holds a unique place in my portfolio. Many are open-source, inviting you to explore and share your insights. Your collaboration adds depth and value to these creations, making our collective impact even greater."</motion.p>
      </motion.div>
      <motion.div className='flex flex-wrap my-20 gap-16'
      ref={aniref}

      

       >
        {projects.map((project,index)=>(
          <motion.div className='lg:w-[400px] w-full ' key={index}
          variants={cardVariant} initial="initial" animate={isInView?"animate":"initial"}
          duration={{
            duration:6,
            dealy:index*0.5,
            staggerChildren:0.9
          }}
          >
            <div className='block-container w-12 h-12'>
              <div className={`btn-back rounded-xl ${project.theme} `}/>
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img
                src={project.iconUrl}
                alt='Project Icon'
                className='w-1/2 h-1/2 object-contain'
                />
              </div>
              </div>
              <div className='mt-5 flex flex-col'>
                <h4 className='text-2xl font-poppins font-semibold '>
                  {project.name}

                </h4>
                <p className='mt-2 text-slate-500'>
                  {project.description}
                </p>
                <motion.div className='mt-5 flex items-center gap-2 font-poppins'>
                  <Link to={project.link} target='_blank' rel='noopener noreferer' className='font-semibold text-blue-600'
                   
                  >
                  <motion.p
                   whileHover={{
                    scale:1.1
                  }}
                  whileTap={{
                    scale:0.9,
                    color:"green"
                  }}
                  >{project.type=="live"?"Live Link":"Source Code"}</motion.p>
                  </Link>
                  <img
                  src={arrow}
                  alt='arrow'
                  className='w-4 h-10 object-contain'
                
                  />
                </motion.div>

              </div>

            </motion.div>
        ))}
      </motion.div>
      <hr className='border-slate-200'/>
      <CTA/>
      <br />
      

      <br />
      <Footer/>
    </motion.section>
  )
}

export default Projects
