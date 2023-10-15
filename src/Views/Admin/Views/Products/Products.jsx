import React from 'react'
import {Routes, Route, useLocation} from 'react-router-dom'
import AddProduct from './Views/AddProduct/AddProduct'
import ProductManage from './Views/ProductManage/ProductManage'
import ProductsPanel from '../../Components/ProductsPanel/ProductsPanel'


const Products = () => {
  const location = useLocation();
  const showProductsPanel = location.pathname === "/admin/products";

  console.log(location)

  return (
    <div className='container-fluid d-flex flex-column flex-grow-1 justify-content-around w-100' style={{paddingBottom:'1rem'}}>

   { showProductsPanel && <div>
  <ProductsPanel/>
      
    </div>}

<Routes>
    <Route path='add'  element={<AddProduct/>} />
    <Route path='manage'  element={<ProductManage/>} />
</Routes>
    </div>
  )
}

export default Products