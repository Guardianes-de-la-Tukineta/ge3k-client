import React from 'react'
import { Link } from 'react-router-dom'
import style from './ProductsPanel.module.css'

const ProductsPanel = () => {
  return (
    <div className='row'>
           
    <div className={`col-md-4 `} style={{padding:'0 '}}>
    <Link to='/admin/products/add'>   <div className={`${style.cardCreateProduct} ` }  style={{margin:'1.5rem 2.5rem',}}>
      <div className={`container-fluid  `}> 
        <div className={`row`}>
         <div className= {`col-9 ${style.itemCreateProduct}`} >
    
         <i class="bi bi-bag-plus-fill"></i>
         <span>ADD NEW PRODUCT</span>
         </div>
         <div className={`col-3 ${style.arrowContainer}`}>
         <i class="bi bi-arrow-right"></i>
      </div>


        </div>
        </div>
        </div>
        </Link>
      </div>





    <div className={`col-md-4 `} style={{padding:'0 '}}>
    <Link to='/admin/products/edit'>    <div className={`${style.cardCreateProduct} ` }  style={{margin:'1.5rem 2.5rem',}}>
      <div className={`container-fluid  `}> 
        <div className={`row`}>
         <div className= {`col-9 ${style.itemCreateProduct}`} >
    
         <i class="bi bi-bag-dash-fill"></i>
         <span>EDIT PRODUCT</span>
         </div>
         <div className={`col-3 ${style.arrowContainer} p-4`}>
         <i class="bi bi-arrow-right"></i>
      </div>


        </div>
        </div>
        </div>
        </Link>
      </div>






    <div className={`col-md-4 `} style={{padding:'0 '}}>
    <Link to='/admin/products/delete'>  <div className={`${style.cardCreateProduct} ` }  style={{margin:'1.5rem 2.5rem',}}>
      <div className={`container-fluid  `}> 
        <div className={`row`}>
         <div className= {`col-9 ${style.itemCreateProduct}`} >
    
         <i class="bi bi-bag-x-fill"></i>
     <span>DELETE PRODUCT</span>
         </div>
         <div className={`col-3 ${style.arrowContainer} p-4`}>
         <i class="bi bi-arrow-right"></i>
      </div>


        </div>
        </div>
        </div>
        </Link>
      </div>
      
</div>
  )
}

export default ProductsPanel
