import React, { useLayoutEffect, useRef } from 'react'
import { FaShoppingBag } from 'react-icons/fa'
import gsap from 'gsap'
import { useAppcontext } from '../ContextComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Header({title}) {

    //create a hook for the section to be animated.
    const headerAnimation = useRef(null);

    useLayoutEffect(()=>{
        let header = 
        gsap.context(()=>{
            // create a wiggle with 10 oscilations
            // CustomWiggle.create('myWiggle', {wiggles: 10, type: 'anticipate'});

            let timeline = gsap.timeline();
            timeline.from('#header', {y: -1000, ease:'bounce.in', duration: 1})
            .from('#image', {x: -500, ease: 'back.in', duration: 1.2}, '<.4')
            .from('#header-name', {scale: .3, ease: 'bounce', duration: 1.2}, '<.4')
            .from('#items-counter', {scale: .5, opacity:0, blur: 20, ease: 'bounce', duration: .5})
        }, headerAnimation)
        return () => header.revert()
    }, []);

    //destructure of the useState stored in the contextApi

    const {bgColor, groceryItems} = useAppcontext()

  return (
    <header
    ref={headerAnimation}
    className='w-screen'
    >
            <div
            id='header'
            style={{backgroundColor: bgColor,
                transition: 'background-color .3s ease-in'}}
            className='flex  pr-8 pl-5 items-center flex-wrap justify-between'>
                <div className="logo gap-3 flex items-center">
                    <img 
                    src="src/assets/logo.png" 
                    alt="Logo"
                    id='image'
                    />
                    <h1
                    id='header-name'
                    className=' font-Albert font-bold text-5xl text-white'>{title}</h1>
                </div>
                <div
                id='items-counter'
                className='flex items-center ml-3 mt-5 mb-5 w-39 gap-2 pl-3 pr-3 pt-1 pb-1 bg-white bg-opacity-30 text-white hover:bg-opacity-40 hover:cursor-pointer shadow-sm shadow-gray-500'>
                    <FaShoppingBag />
                    {groceryItems.length > 0 ? groceryItems.length : 'No'} items left
                </div>
        </div>
        <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                limit={2}
                rtl={false}
                className='font-Albert'
                pauseOnFocusLoss
                draggable
                style={{fontWeight: 'bold'}}
                pauseOnHover
                theme='colored'
                transition: Bounce
              />
    </header>
  )
}


Header.defaultProps={
    title: 'Grocery List'
}
    

export default Header
