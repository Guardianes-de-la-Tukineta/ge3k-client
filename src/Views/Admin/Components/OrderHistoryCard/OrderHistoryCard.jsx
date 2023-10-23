import React from 'react'
import { Link } from 'react-router-dom'
import style from './OrderHistoryCard.module.css'

const OrderHistoryCard = () => {
  return (
    <div className={`col-lg-4 `} style={{padding:'0 '}}>
    <Link to='/admin/orders/history'>   <div className={`${style.cardCreateProduct} ` }  style={{margin:'1.5rem 2.5rem',}}>
      <div className={`container-fluid  `}> 
        <div className={`row`}>
         <div className= {`col-10 ${style.itemCreateProduct}`} >
    
         <i className={`bi bi-clipboard2-data-fill ${style.order}`}></i>
         <span>ORDER HISTORY</span>
         </div>
         <div className={`col-2 ${style.arrowContainer}`}>
         <i className="bi bi-arrow-right" ></i>
      </div>
        </div>
        </div>
        </div>
        </Link>
      </div>
  )
}

export default OrderHistoryCard
