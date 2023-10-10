import React from 'react'
import style from './DashBoard.module.css'
import { Link } from 'react-router-dom'
import ProductsPanel from '../ProductsPanel/ProductsPanel'
import UsersPanel from '../UsersPanel/UsersPanel'

const DashBoard = () => {
  return (
    <div className='container d-flex flex-column flex-grow-1 justify-content-around' style={{paddingBottom:'1rem'}} >
        <div className='row'>
            <div className='col-md-4 '>
              <div className={style.cardInfoContainer}>
                <span><i className="bi bi-cash-coin"></i></span>
                <span className={style.number}>$20,000</span>
                <span>Total Billed</span>
              </div>
            </div>
            <div className='col-md-4 '>
              <div className={style.cardInfoContainer}>
                <span><i className="bi bi-credit-card-fill"></i></span>
                <span className={style.number}>150</span>
                <span>Total Sales</span>
              </div>
            </div>
            <div className='col-md-4 '>
              <div className={style.cardInfoContainer}>
                <span><i className="bi bi-person-fill-check"></i></span>
                <span className={style.number}>72</span>
                <span>Registered Users</span>
              </div>
            </div>

            
        </div>
       <ProductsPanel/>
       <UsersPanel/>
    </div>
  )
}

export default DashBoard