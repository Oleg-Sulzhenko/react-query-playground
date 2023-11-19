import { FC, ReactElement} from 'react'
import { ProductListItemType, TProduct } from '../../../types/index'
import './style.scss'

export const ProductListItem: FC<ProductListItemType> = 
  ({ product, selectedProducts, clickHandler, children }): ReactElement => {
  const { id, title }: TProduct = product

  return <div 
    className='inventory-list-item mb-1 justify-between' 
    data-checked={selectedProducts.includes(id)}
    onClick={() => clickHandler(id)}
  >
    {title}
    <div>{children}</div>
  </div>
}