import React, { useRef } from 'react'
import {skills,experiences} from '../constants/index'
import { VerticalTimeline, VerticalTimelineElement } from'react-vertical-timeline-component' ;
import 'react-vertical-timeline-component/style.min.css';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { TypeAnimation } from 'react-type-animation';
import {motion,useInView} from 'framer-motion'




const About = () => {
  const aniref=useRef(null);
  const isInView=useInView(aniref,{once:true});
  const cardVariant={
    initial:{
      y:50,
      opacity:0
    },
    animate:{
      y:0,
      opacity:1
    }
  }
  return (
    <section className='max-container'>
      
      <motion.h1
      initial={{
        opacity:0,
        scale:0.8
      }}
      whileInView={{
        opacity:1,
        scale:1
      }}
      transition={{
        type:"spring",
        stiffness:"90"
      }}
       className='head-text'>🙏 नमस्ते !,<span className='font-semibold blue-gradient_text drop-shadow'> I'm</span> <br />
      <TypeAnimation 
      sequence={[
        'Sumit Kumar Jhaldiyal', // Types 'One'
        1200, // Waits 1s
        'UI/UX Designer', // Types 'Three' without deleting 'Two'
        'Web Developer', // Deletes 'One' and types 'Two'
        2400, // Waits 2s
        () => {
          console.log('Sequence completed');
        },
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '1.5em', display: 'inline-block', fontFamily:"Monserrat",background: "linear-gradient(135deg, #0061ff, #60efff 160%)",
      webkitBackgroundClip: "text",
      webkitTextFillColor: "transparent",
      paddingBottom:"2%"

    }}
      className='drop-shadow'
    />


      
      </motion.h1>
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
      <motion.p
      initial={{
        scale:0.7
      }}
      whileInView={{
        scale:1
      }}
      >Introducing Sumit Kumar Jhaldiyal, a tech aficionado from the heart of Uttarakhand, India. In the ever-evolving field of Computer Science, Sumit is not just a student; he's a fervent devotee infusing zeal into each code snippet. Get ready for a journey where innovation and dedication converge under Sumit's tech-savvy guidance. </motion.p>
      </div>
      <div className='py-20 flex flex-col'>
      <motion.h3 className='subhead-text'
       initial={{
        y:100,

      }}
      whileInView={{
        y:0,

      }}
      >My Skills</motion.h3>
      <motion.div className='mt-16 flex flex-wrap gap-12'
      initial={{
        y:100,

      }}
      whileInView={{
        y:0,

      }}
      transition={{
        staggerChildren:"3",
        
        
      }}
      >
      
        {skills.map((skill,index)=>(
          

          <div className='block-container w-20 h-20'
        
         
          >
            <div className='btn-back rounded-x5 '/>
            <div className='btn-front rounded-x1 flex flex-col justify-center items-center'>
              <img src={skill.imageUrl} alt={skill.name} className={'w-1/2 h-1/2 object-contain ' }/>
               <p className='font-light text-center'>{skill.name}</p>

            </div>
            </div>
        ))}
      </motion.div>

      </div>


      <div className='py-16'>
          <motion.h3 className='subhead-text'
           initial={{
            y:100
          }}
          whileInView={{
            y:1
            
          }}
       
          >Education</motion.h3>
          <div className='mt-5 flex flex-col gap-3 text-slate-500'>

          <motion.p
          initial={{
            y:100
          }}
          whileInView={{
            y:1
          }}
          
          >Sumit Kumar Jhaldiyal has pursued his academic journey with dedication and enthusiasm, focusing on building a strong foundation in computer science and related disciplines. His educational background reflects his passion for technology and his commitment to continuous learning. Explore below to learn more about his academic achievements and qualifications.</motion.p>
          </div>

      </div>
      <div className='mt-12 flex-container'>
          <VerticalTimeline  >
            {experiences.map((experience)=>(
              <VerticalTimelineElement
              key={experience.company_name}
               date={experience.date}
               icon={<div className='flex justify-center items-center w-full h-full'>
                <img
                src={experience.icon}
                alt={experience.company_name}
                className={'w-[60%] h-[60%] object-contain'}
                />
               </div>}
               contentStyle={{
                borderBottom:'8px',
                borderStyle:'solid',  
                borderBottomColor: experience.iconBg,

               }}
               iconStyle={{
                background:experience.iconBg,

               }}
              >
                <div>
                  <h3 className='text-black text-xl font-poppins font-semibold'>
                    {experience.title}</h3>
                    <p className='text-black-500 font-medium font-base' style={{margin:0}}>
                      {experience.company_name}
                    </p>
                </div>
                <ul className='my-5 list-disc ml-5 space-y-2'>
                  {experience.points.map((point,index)=>(
                    <li key={`experience Point-${index}`}className='text-black-500/50 font-normal pl-1 text-sm'>
                      {point}
                    </li>
                  ))}
                </ul>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
      </div>
      <hr className='border-slate-200'/>
      <CTA/>
      <br />
      <Footer/>
    </section>
  )
}

export default About
