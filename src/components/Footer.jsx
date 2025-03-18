import React, { useLayoutEffect, useRef } from 'react'
import { useAppcontext } from '../ContextComponent'
import gsap from 'gsap';

function Footer() {
    // destructuring the color state 
    const {bgColor, setBgColor} = useAppcontext();

    //creating a hook to target the parent div of the animations
    const footerAnimations = useRef(null);

    //gsap animations
    useLayoutEffect(()=>{
        //recording the animations with use context
        let footer = 
        gsap.context(()=>{
            let timeline = gsap.timeline();
            timeline.from('#footer-div', {y: 400, ease: 'bounce.out', duration: 1.3, delay: 1.5})
            .from('#color-theme', {scale: .5, ease: 'bounce.out'})
        }, footerAnimations)
        return ()=> footer.revert();
    }, [])
    function changeThemeandSave(e){
        setBgColor(e.target.value);
        sessionStorage.setItem('theme', bgColor);
    }
  return (
    <footer
    ref={footerAnimations}>
        <div
        id='footer-div'
        style={{backgroundColor: bgColor, transition: 'background-color .3s ease-in'}}
        className='fixed bottom-0 flex items-center justify-around text-white w-screen h-14'>
            <div
            className='flex items-center w-39 gap-2 pl-3 pr-3 pt-1 pb-1 bg-white bg-opacity-30 text-white hover:bg-opacity-40 hover:cursor-pointer shadow-sm shadow-gray-500'>
                <input type="color" 
                name="color" 
                id="color-theme" 
                onChange={(e)=>changeThemeandSave(e)}
                hidden/>
                <label htmlFor="color-theme">Choose Theme</label>
            </div>
        </div>
    </footer>
  )
}

export default Footer
