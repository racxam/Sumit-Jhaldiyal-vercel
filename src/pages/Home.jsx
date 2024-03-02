import {Suspense, useEffect, useState,useRef} from 'react'

import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import Homeinfo from '../components/Homeinfo'
import summusic from '../assets/summusic.mp3'
import { soundoff, soundon } from '../assets/icons'





const Home = () => {
  

  const [isRotating,setIsRotating]=useState(false);
  const [currentStage,setCurrentStage]=useState(1);
  const audioRef=useRef(new Audio(summusic));
  audioRef.current.volume=0.4;
  audioRef.current.loop=true;
  const [isPlayingMusic,setIsPlayingMusic]= useState(false);
  useEffect(()=>{
    if (isPlayingMusic) {
      audioRef.current.play();
      return()=>{
        audioRef.current.pause();
      }
    }
  },[isPlayingMusic])


  const adjustIslandForScreenSize=()=>{
    let screenScale=null;
   let screenPosition=[0,-6.5,-43];
   let rotation=[0.1,4.7,0];
    if (window.innerWidth<768) {
      screenScale=[0.9,0.9,0.9];
    }else{
      screenScale=[1,1,1]
    }
    return [screenScale,screenPosition,rotation]
  }

  const adjustPlaneForScreenSize=()=>{
    let screenScale, screenPosition;

    if (window.innerWidth<768) {
      screenScale=[1.5,1.5,1.5],
      screenPosition=[0,-1.5,0]
    }else{
      screenScale=[3,3,3],
      screenPosition=[0,-4,-4]
    }
    return [screenScale,screenPosition]
  }


  const [islandScale,islandPostion,islandrotation]=adjustIslandForScreenSize();
  const[planeScale,planePosition]=adjustPlaneForScreenSize();
  return (
    
   <section className='w-full h-screen relative'> 
   <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
    {currentStage && <Homeinfo currentStage= {currentStage}/>}
  </div>
   
   <Canvas className={`w-full h-screen bg-transparent ${isRotating ? "cursor-grabbing":"cursor-grab"}`} camera={{near:0.1,far:1000 }}>
      <Suspense fallback={<Loader/>}>
        <directionalLight position={[1,1,1]} intensity={0.65}/>
        <ambientLight intensity={.8}/>

        <hemisphereLight skyColor={"#b1e1ff"} groundColor={"#000000"} intensity={1}/>
        <Plane/>
        <Bird/>
        <Sky isRotating={isRotating}/>
        <Island position={islandPostion} scale={islandScale} rotation={islandrotation} isRotating={isRotating}
         setIsRotating={setIsRotating}
         setCurrentStage={setCurrentStage} 
        
        />
        <Plane
           isRotating={isRotating} 
           scale={planeScale}
           position={planePosition} 
           rotation={[0,20,0]}
        />
      </Suspense>
   </Canvas>
   <div className='absolute bottom-2 left-2'>
    <img src={isPlayingMusic?soundoff:soundon} alt="sound" className='w-10 h-10 cursor-pointer object-contain' onClick={()=>{
      setIsPlayingMusic(!isPlayingMusic);
    }}/>
   </div>

   </section>
  )
}

export default Home
