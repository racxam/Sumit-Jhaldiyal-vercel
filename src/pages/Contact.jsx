import React, { Suspense, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Canvas } from '@react-three/fiber';
import Fox from '../models/fox';
import Loader from '../components/Loader';
import useAlert from '../hooks/useAlert';
import Alert from '../components/Alert'
import{ motion} from 'framer-motion'

import { TypeAnimation } from 'react-type-animation';


const Contact = () => {
  const formRef=useRef(null); 
  const [isLoading,setIsLoading]=useState(false);
  const [currentAnimation,setCurrentAnimation]=useState('idle')
  const {alert,showAlert,hideAlert}=useAlert();
  const [form,setForm]=useState({
    name:"",
    email:"",
    message:"",
  });
  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleFocus=()=>setCurrentAnimation('walk')
  const handleBlur=()=>setCurrentAnimation('idle')
  const handleSubmit=(e)=>{
    e.preventDefault();
    setIsLoading(true);
    setCurrentAnimation('hit')
    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name:form.name,
        to_name:"Sumit",
        from_email:form.email,
        to_email:'sumitracxam@gmail.com',
        message:form.message
      },
      import.meta.env.VITE_APP_EMAILJS_PUBILC_KEY
    ).then(()=>{
      setIsLoading(false)
      showAlert({show:true,text:'I recieved your Message!',type:'success'})

      setTimeout(() => {
        setCurrentAnimation('idle')
        setForm({name:"",email:"",message:""})
      }, 3000);

    }).catch((error)=>{
      setIsLoading(true);
      setCurrentAnimation('sad')
      console.log(false)
      showAlert({show:true,text:"I ain't recieved your Message!",type:'danger'})

    })

  }
  return (
   <section className='flex lg:flex-row flex-col max-container h-[100vh] fonty'>

 
    {alert.show && <Alert {...alert}/>}

    <div className='flex-1 min-w-[50%] flex flex-col'>
      
      <h1 className='head-text'><TypeAnimation 
      sequence={[
        'Drop us a note', // Types 'One'
        1200, // Waits 1s
        'Leave us a Msg', // Types 'Three' without deleting 'Two'
        'Contact us', // Deletes 'One' and types 'Two'
        2400, // Waits 2s
        () => {
          console.log('Sequence completed');
        },
      ]}
      wrapper="span"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '4rem',  fontFamily:"Monserrat",background: "linear-gradient(135deg, #0061ff, #60efff 160%)",
      webkitBackgroundClip: "text",
      webkitTextFillColor: "transparent"}}
      className='drop-shadow'
    /></h1>

      <motion.form onSubmit={handleSubmit} className='w-full flex flex-col gap-7 mt-14'
      initial={{
        opacity:0,
        y:100
      }}
      whileInView={{
        opacity:1,
        y:0
      }}
      
      >

        <label className='text-black-500 font-semibold'>Name
          <motion.input type="text" name="name" className='input sonty' placeholder='Sumit Kumar Jhaldiyal' required value={form.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
          whileFocus={{
            scale:1.0225
          }}
          autoFocus
          />
        </label>

        <label className='text-black-500 font-semibold'>E-mail
          <motion.input type="text" name="email" className='input sonty' placeholder='smrt@gmail.com' required value={form.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
          whileFocus={{
            scale:1.0225
          }}
          />
        </label>

        <label className='text-black-500 font-semibold'>Message
          <motion.textarea 
        
          rows={4} name="message" className='textarea sonty' placeholder='How may I help you?' required value={form.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}
          
          whileFocus={{
            scale:1.0225
          }}
          />
        </label>
        <motion.button type='submit'className='btn' disabled={isLoading} onFocus={handleFocus} onBlur={handleBlur}
        whileHover={{
          scale:1.0225,

        }}
        whileTap={{
          scale:0.9,
          color:"green",
          fontWeight:"bold",


        }}
        
        >{isLoading?'Sending...':'Send Msg'}</motion.button>

      </motion.form>
    </div>
    <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
      <Canvas camera={{position:[0,0,5],
      fov:75,
      near:0.1,
      far:1000
      }
    }>
        <directionalLight intensity={2.5} position={[0,0,1]}/>
        <ambientLight intensity={0.5}/>
        <Suspense fallback={<Loader/>}>
          <Fox 
          position={[0.5,0.35,0]}
          rotation={[12.6,-0.6,0]}
          scale={[0.5,0.5,0.5]}
          currentAnimation={currentAnimation}
          />
        </Suspense>

      </Canvas>
    </div>

   </section>
  )
}

export default Contact
