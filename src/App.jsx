import './App.css'
import ContextComponent from './ContextComponent'
import Header from './components/Header'
import AddItem from './components/AddItem'
import SearchItem from './components/SearchItem'
import Content from './components/Content'
import Footer from './components/Footer'
import SelectOption from './components/SelectOption'
import { useRef } from 'react'

function App() {

  let addItemRef = useRef()

  return (
    <main
    className=' overflow-x-hidden'>
      <ContextComponent>
        <Header title="Grocery's"/>
        <SelectOption addItemRef={addItemRef}/>
        <div
        className='relative mt-3 mb-10'>
          <SearchItem />
          <AddItem addItemRef={addItemRef}/>
        </div>
        <Content />
        <Footer />
      </ContextComponent>
    </main>
  )
}

export default App
