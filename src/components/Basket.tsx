import { useContext, useState, useEffect } from "react";
import { UiStateContext } from '../App'
import { ProductListItem } from "./UI_components/ProductListItem/ProductListItem"
import { TProduct, UiStateContextType } from '../types/index'

function Basket() {
  const { inBasketProducts, setInBasketProducts } = useContext(UiStateContext) as UiStateContextType;
  const [basket, setBasket] = useState<TProduct[]>([])
  const [selectedProducts, setselectedProducts] = useState<number[]>([])

  useEffect(() => {
    const idCount: any = {}
    const uniqueProducts: TProduct[] = []
    const uniqueIds = new Set()
    
    inBasketProducts.forEach(product => {
      const id = product.id;
      idCount[id] = (idCount[id] || 0) + 1;

      if (!uniqueIds.has(id)) {
        uniqueIds.add(id);
        uniqueProducts.push(product);
      }
    });

    const inBasketProductsUniqueWithCount = uniqueProducts.map((product: TProduct) => {
      product.totalInBasket = idCount[product.id]
      return product
    })

    setBasket(inBasketProductsUniqueWithCount)
    
  }, [inBasketProducts])

  const listItemClickHandler = (productId: number): void => {
    setselectedProducts((prev: number[]) => {
      if(prev.includes(productId)) return prev.filter((i) => i !== productId)
      return [...prev, productId]
    })
  }

  const handleRemoveFromBasket = (): void => {
    setInBasketProducts((prev: TProduct[]) => {
      return prev.filter((item: TProduct) => !selectedProducts.includes(item.id))
    })
    setselectedProducts([])
  }

  return (
    <div className='flex flex-col p-8 w-full md:w-1/2 md:p-5'>
      <div className='flex justify-between mb-6'>
        <h3 className='text-3xl font-bold'>Basket</h3>
      
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
          disabled={selectedProducts?.length > 0 ? false : true}
          onClick={handleRemoveFromBasket}
        >Remove</button>
      </div>

      {basket.length > 0 ? basket?.map((product: TProduct) => 
        <ProductListItem key={product?.id} 
          product={product} 
          selectedProducts={selectedProducts}
          clickHandler={listItemClickHandler}
        >
          <div>Count {product?.totalInBasket}</div>
        </ProductListItem>
      )
      :
      <span>No Items in Basket.</span>
      }

      <div className='text-right mt-2 p-2 px-4 bg-gray-200'>Total: {inBasketProducts?.length}</div>

    </div>
  )
}

export default Basket
