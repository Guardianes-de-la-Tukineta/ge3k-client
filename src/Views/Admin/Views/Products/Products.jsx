import React from 'react'
import {Routes, Route} from 'react-router-dom'
import AddProduct from './Views/AddProduct/AddProduct'
import ProductManage from './Views/ProductManage/ProductManage'
import ProductsPanel from '../../Components/ProductsPanel/ProductsPanel'

const Products = () => {
  return (
    <div className='container-fluid d-flex flex-column flex-grow-1 justify-content-around w-100' style={{paddingBottom:'1rem'}}>

    <div>
  <ProductsPanel/>
      
    </div>

<Routes>
    <Route path='add'  element={<AddProduct/>} />
    <Route path='manage'  element={<ProductManage/>} />
</Routes>
    </div>
  )
}

export default Products