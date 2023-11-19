import { createContext, useState } from 'react';
import Inventory from './components/Inventory'
import Basket from './components/Basket'
import { UiStateContextType } from './types'


export const UiStateContext = createContext<UiStateContextType | null>(null)

function App() {
  const [newProducts, setNewProducts] = useState<any[]>([])
  const [inBasketProducts, setInBasketProducts] = useState<any[]>([])

  const contextValue: UiStateContextType = {
    newProducts,
    setNewProducts,
    inBasketProducts,
    setInBasketProducts
  };
  
  return (
    <div className='wrapper flex flex-col md:flex-row'>
      <UiStateContext.Provider value={contextValue}>
        <Inventory/>
        <Basket/>
      </UiStateContext.Provider>
    </div>
  )
}

export default App
