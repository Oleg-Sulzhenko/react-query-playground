import { useContext, useState, FC, ReactElement} from 'react'
import { useQuery } from '@tanstack/react-query'
import { UiStateContext } from '../App'
import { UiStateContextType, TProduct, QueryProductData } from '../types/index'
import { ProductListItem } from './UI_components/ProductListItem/ProductListItem'


const useQueryProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: (): Promise<QueryProductData> => {
      return fetch('https://dummyjson.com/products?limit=7').then(res => res.json())
    },
  })
}

function Inventory(): ReactElement {
  const { data, error, isFetching } = useQueryProducts()

  const [addNewVisible, setAddNewVisible] = useState<boolean>(false)
  const [selectedProducts, setselectedProducts] = useState<number[]>([])
  const { 
    newProducts, 
    setNewProducts,
    setInBasketProducts
  } = useContext(UiStateContext) as UiStateContextType;


  const handleNew = (): void => {
    setAddNewVisible(!addNewVisible)
  }
  const handleAddtoBasket = (): void => {
    const productsToBasket: TProduct[] = data?.products?.filter(item => selectedProducts.includes(item.id)) || [];
    const newProductsToBasket: TProduct[] = newProducts.filter(item => selectedProducts.includes(item.id))
    setInBasketProducts((prev) => [...prev, ...productsToBasket, ...newProductsToBasket])
    setselectedProducts([])
  }

  const listItemClickHandler = (productId: number): void => {
    setselectedProducts((prev: number[]) => {
      if(prev.includes(productId)) return prev.filter((i) => i !== productId)
      return [...prev, productId]
    })
  }

  // Component:
  type newProductInputProps = {
    setAddNewVisible: React.Dispatch<React.SetStateAction<boolean>>
  }
  const NewProductInput: FC<newProductInputProps> = ({ setAddNewVisible }): ReactElement => {
    const [productTitle, setProductTitle] = useState('')

    const handleAddButton = () => {
      const newProduct = {
        id: crypto.randomUUID(),
        title: productTitle
      }
      setNewProducts((prev) => [...prev, newProduct])
      setAddNewVisible(false)
    }

    return <div className='flex flex-row w-full'>
      <input 
        type='text' 
        placeholder='Product title' 
        className='mr-2 p-2 flex-1 border-2'
        value={productTitle}
        onChange={(e) => setProductTitle(e.target.value)}
      />
      <button 
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2' 
        onClick={handleAddButton}
        disabled={productTitle?.length > 0 ? false : true}
      >Add Product</button>
      <button 
        className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' 
        onClick={() => setAddNewVisible(false)}
      >Cancel</button>
    </div>
  }

  if (error) return <span>'Some error occurs...a'</span>;

  return (
    <div className='flex flex-col p-8 w-full md:w-1/2 md:p-5'>
      
      <div className='flex justify-between mb-6'>
        {addNewVisible ? <NewProductInput setAddNewVisible={setAddNewVisible}/> : 
          <>
            <h3 className='text-3xl font-bold'>Inventory</h3>
            <div className='flex'>
              <button 
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4' 
                onClick={handleNew}
              >New</button>
              <button 
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                onClick={handleAddtoBasket}
                disabled={selectedProducts?.length > 0 ? false : true}
              >Add</button>
            </div>
          </>
        }
      </div>

      {isFetching ? 'Loading...' :
        <div>
          {[...data?.products || [], ...newProducts].map((product: TProduct) => 
            <ProductListItem key={product?.id} 
              product={product} 
              selectedProducts={selectedProducts}
              clickHandler={listItemClickHandler}
            />
          )}
        </div>
      }

    </div>
  )
}

export default Inventory
