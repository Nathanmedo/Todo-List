import React, { useTransition } from 'react'
import ListItem from './ListItem';
import { useAppcontext } from '../ContextComponent';

function Content() {
  
  const {groceryItems, bgColor, fetchError, filteredItems, isLoading, isPending} = useAppcontext();

  console.log(filteredItems);
  
    
  
  return (
    <div
    className='flex justify-center'>
        {fetchError && <p className='m-5 font-bold mt-14 text-red-600 font-Albert'>Error: {fetchError}</p>}
        {isLoading && <p style={{bgColor}}>Loading...</p>}
        {!isLoading && !fetchError && 
        <>
            {isPending ? 'Loading...' :
                <>
                  {filteredItems.length ? (
                    <ul
                    className='items-grid'>
                        {filteredItems.map((filteredItem, index)=>(
                          <ListItem groceryItem={filteredItem} index ={index}key={filteredItem.id}/>
                        ))}
                    </ul>
                  ):(
                    <p className='mt-20' style={{color: bgColor}}>Add New Item</p>
                  )}
                </>
            }
        </>}
    </div>
  )
}

export default Content
