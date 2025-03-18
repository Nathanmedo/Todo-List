import { FaArrowRight, FaPlus, FaSearch } from 'react-icons/fa';
import { useAppcontext } from '../ContextComponent';
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';

function SelectOption() {
    
    //destructuring bgcolor from contextAPI
    const {bgColor} = useAppcontext();


    //display Add Bar
    const displayAddBar = () => {
        let addBar = document.getElementById('addBar');
        let bars = document.querySelectorAll('.bars');
        bars.forEach(bar=> bar.classList.remove('active-bar'))
        addBar.classList.toggle('active-bar');
        let removeBars = document.getElementById('remove-active');
        removeBars.classList.add('active');
    }
    //display search bar
    const displaySearchBar = () => {
        let searchBar = document.getElementById('searchBar');
        let bars = document.querySelectorAll('.bars');
        bars.forEach(bar=> bar.classList.remove('active-bar'));
        searchBar.classList.toggle('active-bar');
        let removeBars = document.getElementById('remove-active');
        removeBars.classList.add('active');
    }
    
    //remove search and add item input
    const removeBars = () => {
      let bars = document.querySelectorAll('.bars');
      bars.forEach(bar=> bar.classList.remove('active-bar'));
      let removeBars = document.getElementById('remove-active');
      removeBars.classList.remove('active');
    }
    
    const buttonSection = useRef()
    useLayoutEffect(()=>{
      const buttonAnimation = gsap.context(()=>{
        let timeline = gsap.timeline();
        timeline.from('#action-button', {scale: 0, blur: 20, opacity: 0, stagger: .4, duration: .5, delay: 1.2})
      }, buttonSection)
      return ()=> buttonAnimation.revert();
    }, [])

  return (
    <div
    ref={buttonSection}
    className='mt-3 mb-5 ml-5 flex gap-2 text-2xl'>
      <button 
        id='action-button'
        className='rounded-sm'
        onClick={displayAddBar}
        style={{backgroundColor: bgColor, color: 'white'}}
        tooltip = 'Add item'>
        <FaPlus />
      </button>
      <button 

        id='action-button'
        className='rounded-sm'
        onClick={displaySearchBar}
        style={{backgroundColor: bgColor, color: 'white'}}
        tooltip='Search Item'>
        <FaSearch />
    </button>
    <button
    id='remove-active'
    className='rounded-sm'
    style={{backgroundColor: bgColor, color: 'white'}}
    onClick={removeBars}>
        <FaArrowRight /> 
    </button>
    </div>
  )
}

export default SelectOption
