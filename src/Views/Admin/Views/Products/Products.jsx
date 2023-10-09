import React from 'react'
import {Routes, Route} from 'react-router-dom'
import AddProduct from './Views/AddProduct/AddProduct'
import EditProduct from './Views/EditProduct/EditProduct'
import DeleteProduct from './Views/DeleteProduct/DeleteProduct'
import ProductsPanel from '../../Components/ProductsPanel/ProductsPanel'

const Products = () => {
  return (
    <div>

    <div>
  <ProductsPanel/>
      
    </div>

<Routes>
    <Route path='add'  element={<AddProduct/>} />
    <Route path='delete'  element={<DeleteProduct/>} />
    <Route path='edit'  element={<EditProduct/>} />
    </Routes>
    </div>
  )
}

export default Products