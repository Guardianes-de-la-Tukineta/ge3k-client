import React from 'react'
import { Link } from 'react-router-dom'
import style from './ProductsPanel.module.css'
import OrderHistoryCard from '../OrderHistoryCard/OrderHistoryCard'
import { useLocation } from 'react-router-dom'

const ProductsPanel = () => {

  const {pathname} = useLocation()
 
  return (
    <div className='row justify-content-around'>
           
    <div className={`col-lg-4 `} style={{padding:'0 '}}>
    <Link to='/admin/products/add'>   <div className={`${style.cardCreateProduct} ` }  style={{margin:'1.5rem 2.5rem',}}>
      <div className={`container-fluid  `}> 
        <div className={`row`}>
         <div className= {`col-10 ${style.itemCreateProduct}`} >
    
         <i className={`bi bi-bag-plus-fill ${style.create}`}></i>
         <span>ADD NEW PRODUCT</span>
         </div>
         <div className={`col-2 ${style.arrowContainer}`}>
         <i className="bi bi-arrow-right" ></i>
      </div>


        </div>
        </div>
        </div>
        </Link>
      </div>





    <div className={`col-lg-4 `} style={{padding:'0 '}}>
    <Link to='/admin/products/manage'>    <div className={`${style.cardCreateProduct} ` }  style={{margin:'1.5rem 2.5rem',}}>
      <div className={`container-fluid  `}> 
        <div className={`row`}>
         <div className= {`col-10 ${style.itemCreateProduct}`} >
    
         <i className={`bi bi-bag-dash-fill ${style.edit}`}></i>
         
         <span>
MANAGE PRODUCTS</span>
         </div>
         <div className={`col-2 ${style.arrowContainer}`}>
         <i className="bi bi-arrow-right"></i>
      </div>


        </div>
        </div>
        </div>
        </Link>
      </div>


    
      {(pathname === '/admin')? <OrderHistoryCard/> : undefined} 


  
      
</div>
  )
}

export default ProductsPanel
