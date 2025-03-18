import ApiRequest from '../ApiRequest';
import { useAppcontext } from '../ContextComponent'
import { FaCheck, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddItem() {

    const {newItemValue, setNewItemValue, setFilteredItems, bgColor, groceryItems, setGroceryItems, addInputRef, setFetchError, API_URL}= useAppcontext();


    let checkRep = groceryItems?.some(groceryItem => (groceryItem.groceryName).toLowerCase() == newItemValue.toLowerCase());
    function checkRepetition(){
      if(checkRep) {
        toast.info('You have this item Already')
        setNewItemValue('')
      };
    }


    async function handleAddItem(newItemName){
      let newId = groceryItems?.length ? +groceryItems[groceryItems.length - 1].id + +"1" : "1";
      let newItem = {
        id: newId.toString(),
        checkStatus: false,
        groceryName: newItemName
      }
      let newArray = [...groceryItems, newItem];
      localStorage.setItem('grocery-Items', JSON.stringify(newArray));
      setGroceryItems(newArray);
      setFilteredItems(newArray);
      let postOption = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      }
      let postURl = API_URL;
      let result = await ApiRequest(postURl, postOption)
      if(result) setFetchError(result)
    }

    let checkForValue = () => {
      let notifyParag = document.querySelector('.notify')
      if(!newItemValue){
        notifyParag.innerHTML = 'Please Add Item Name'
      } 
    };

    function handleSubmitItem(e){
        e.preventDefault();
        checkForValue();
        if(!newItemValue) return;
        checkRepetition();
        if(checkRep) return;
        handleAddItem(newItemValue)
        setNewItemValue('')
    }
    let clearNotify = ()=> {
      document.querySelector('.notify').innerHTML= ''
    }

  return (
      <form
        id='addBar'
        className='bars relative h-2 mb-3' 
        onSubmit={handleSubmitItem}>
            <div className='flex gap-2 absolute ml-4 mr-4 w-screen justify-center'>
                <input
              onInput={clearNotify} 
              className=' w-9/12 pl-4 rounded-md'
              ref={addInputRef}
              maxLength={16}
              style={{border: `2px ${bgColor} solid`,
                    transition: 'border .3s',
                  boxShadow: `0 0 10px ${bgColor}`,
                  outlineColor: `GrayText`,
                  outlineOffset: '-2px'}}
              type="text"
              placeholder='Input Item name'
              value={newItemValue}
              onChange={(e)=> setNewItemValue(e.target.value)} />
              <button
                type='submit'
              className='w-12 h-12 rounded-sm flex items-center justify-center'
              onClick={()=>{addInputRef.current.focus()}}
              style={{background: bgColor,
                    transition: 'all .3s ease-in'}}>
                {newItemValue ? <FaCheck style={{color: 'white'}}/> : <FaPlus style={{color: 'white'}}/>}
              </button>
            </div>
            
          <p className='notify absolute top-14 left-1/2 -translate-x-1/2'
          style={{color: bgColor}}></p>
        </form>
    
  )
}

export default AddItem
