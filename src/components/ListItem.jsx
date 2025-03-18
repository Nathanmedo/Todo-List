import React from 'react'
import { useAppcontext } from '../ContextComponent';
import { useRef, useLayoutEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import gsap from 'gsap';
import ApiRequest from '../ApiRequest';

function ListItem({groceryItem, index}) {

  //destructuring the background color usestate
  const {bgColor, groceryItems, setGroceryItems, API_URL, setFetchError} = useAppcontext();

    //creating a hook for the items animation
  let itemsHook = useRef(null)

  useLayoutEffect(()=>{ 
      let itemsAnimation = gsap.context(()=>{
          let timeline = gsap.timeline();
          timeline.from('#listItem', {blur: 20, opacity: 0, scale: .8, ease: 'bounce', duration: Number(groceryItems.length)* .3, stagger: 1})
      }, itemsHook)
      return ()=> itemsAnimation.revert()
  },[]);

  async function handleCheck(id){
    let toggleCheck = groceryItems.map(groceryItem=>(
      groceryItem.id == id ? {...groceryItem, checkStatus: !groceryItem.checkStatus} : groceryItem
    ));
    setGroceryItems(toggleCheck)
    let itemToggled = toggleCheck.filter(item=> item.id == id);
    let patchOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checkStatus: itemToggled[0].checkStatus})
    }
    let patchURl = `${API_URL}/${id}`
    let result = await ApiRequest(patchURl, patchOptions)
    if(result) setFetchError(result);
  }

  async function handleDelete(id){
    let deleteItem = groceryItems.filter((groceryItem)=> groceryItem.id !== id)
    setGroceryItems(deleteItem);
    let deleteOption = {
      method: 'DELETE'
    }
    const deleteURl = `${API_URL}/${id}`
    console.log(deleteURl);
    let result = await ApiRequest(deleteURl, deleteOption)
    if(result) setFetchError(result);
  }

  let handleMouseOver = (i)=>{
    let trashIcon = document.querySelectorAll('.trashIcon');
    index == i ? trashIcon[i].style.color='red' : trashIcon[i].style.color = bgColor
    
  }

  let handleMouseOut = (i)=>{
    let trashIcon = document.querySelectorAll('.trashIcon');
    index == i ? trashIcon[i].style.color = bgColor : trashIcon[i].style.color='red'
  }

  return (
    <div
    ref={itemsHook}
    id='listItem'
    className='hover:scale-105 transition duration-200'
    >
      <li 
        id='listItem'
        style={{border: `2px ${bgColor} solid`,
                boxShadow: `0 0 10px ${bgColor}`,
                transition: 'box-shadow .3s, border .3s ease-in'}}
        className='flex cursor-pointer relative items-center justify-center w-72 rounded-md h-12'>
          <div className="checkbox absolute left-4">
              <input type="checkbox" 
              checked={groceryItem.checkStatus}
              id={groceryItem.id}
              onChange={()=>handleCheck(groceryItem.id)}
              hidden
              />
              <label htmlFor={groceryItem.id}>
                <div
                  className={`checkbox-style ${groceryItem.checkStatus ? "active": null}`}
                  style={{border: `2px ${bgColor} solid`}}>
                </div>
              </label>
          </div>
          <label htmlFor={groceryItem.id}
              style={{color: bgColor, fontWeight: 'bold', 
                          textShadow: `0 0 8px ${bgColor}`, 
                          transition: 'color .3s, text-shadow .3s ease-in'}}
                          >{groceryItem.groceryName}
          </label>
          <button
            className='absolute right-4'
            onClick={()=>handleDelete(groceryItem.id)}
            >
              <FaTrash 
              className='text-2xl trashIcon'
              style={{color: bgColor,
              transition: 'color .25s ease-in-out'}}
              onMouseOver={()=>handleMouseOver(index)}
              onMouseOut={()=>handleMouseOut(index)}
              />
          </button>
      </li>
    </div>
  )
}

export default ListItem
