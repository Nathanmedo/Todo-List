import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useTransition } from 'react';
import { useState, useRef } from 'react';
import './contextstyle.css'

const  appContextApi = React.createContext();


function ContextComponent({children}) {
    const API_URL = 'http://localhost:3000/groceryItemsArray'
    const[groceryItems, setGroceryItems]  = useState(JSON.parse(localStorage.getItem('groceryItems')));
    const[fetchError, setFetchError] = useState(null)
    const[isLoading, setIsLoading] = useState(true)
    const[filteredItems, setFilteredItems] = useState(groceryItems);
    useEffect(()=>{
        async function fetchData(){
            try{
                let response = await fetch(API_URL);
                if(!response.ok) throw Error("The List Data is not Recieved, Please reload!")
                let data = await response.json()
                setFetchError(null);
            }catch(err){
                setFetchError(err.message)
            }
        }
        setTimeout(()=>{
            setIsLoading(false)
            fetchData();
        }, 2000)
    }, [])
    const[newItemValue, setNewItemValue] = useState("");
    const [bgColor, setBgColor] = useState(sessionStorage.getItem('theme')||'#10b981');
    let addInputRef = useRef();
    let searchInputRef = useRef();

    const[isPending, startTransition]= useTransition();

    //these test was a bad idea, do not try it again(unless if someone sees it as one. lol)

    useEffect(()=>{
        sessionStorage.setItem('theme', bgColor)
    }, [bgColor]);
    
    
    return (
        <appContextApi.Provider
        value=
        {{groceryItems,  //groceryItems
         setGroceryItems, //setState of groceryItems
         newItemValue,  //new item controlled input
         setNewItemValue, //setstate of new item controlled Input
         bgColor, 
         filteredItems,
         setFilteredItems,
         isPending,
         startTransition,
         setBgColor,
         addInputRef,
         searchInputRef,
         fetchError,
         setFetchError,
         isLoading,
         API_URL
         }}>
            {children}
        </appContextApi.Provider>
    )
}

export const useAppcontext = () => useContext(appContextApi);
export default ContextComponent
