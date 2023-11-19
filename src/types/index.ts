export type UiStateContextType = {
  newProducts: TProduct[]
  setNewProducts: React.Dispatch<React.SetStateAction<any[]>>
  inBasketProducts: TProduct[]
  setInBasketProducts: React.Dispatch<React.SetStateAction<any[]>>
}

type TProductClientData = {
  totalInBasket: number
}
type TProductServerData = {
  brand?: string
  category?: string
  description?: string
  discountPercentage?: number
  id: number
  images?: string[]
  price?: number
  rating?: number
  stock?: number
  thumbnail?: string
  title: string
}
export type TProduct = TProductServerData & TProductClientData

export type QueryProductData = {
  limit: number
  products: TProduct[]
  skip: number
  total: number
}

export type ProductListItemType = {
  product: TProduct
  selectedProducts: number[]
  clickHandler: (id: number) => void
  children?: JSX.Element
}