import React, { useTransition } from 'react'
import { useAppcontext } from '../ContextComponent'

function SearchItem() {

  //destructuring bgColor from context Api
  const {bgColor, groceryItems, setFilteredItems, startTransition} = useAppcontext();


  function handleSearch(e){
    const value = e.target.value;
    startTransition(()=>{
      let filteredItems = groceryItems.filter(groceryItem => {
        return((groceryItem.groceryName).toLowerCase().includes(value.toLowerCase()))
      });
      setFilteredItems(filteredItems);
    })
  }

  
  return (
    <div className='absolute bars w-screen flex justify-center h-12 ml-3 mr-3'
    id='searchBar'>
      <input type="text"
      onChange={(e)=>handleSearch(e)}
      style={{border: `2px ${bgColor} solid`,
      boxShadow: `0 0 10px ${bgColor}`,
      outlineColor: `GrayText`,
      outlineOffset: '2px'}}
      placeholder='Search Item'
      className='w-10/12 rounded-md pl-4' />
    </div>
  )
}

export default SearchItem
