import React from 'react'
import style from './DashBoard.module.css'

const DashBoard = () => {
  return (
    <div className='container'>
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
                <span><i className="bi bi-credit-card"></i></span>
                <span className={style.number}>150</span>
                <span>Total Sales</span>
              </div>
            </div>
            <div className='col-md-4 '>
              <div className={style.cardInfoContainer}>
                <span><i className="bi bi-person-check"></i></span>
                <span className={style.number}>72</span>
                <span>Registered Users</span>
              </div>
            </div>

            
        </div>


        <div className='row'>
           
            <div className={`col-md-4 `} style={{padding:'0 '}}>
                <div className={`${style.cardCreateProduct} ` }  style={{margin:'1.5rem 2.5rem',}}>
              <div className={`container-fluid  `}> 
                <div className={`row`}>
                 <div className= {`col-9 ${style.itemCreateProduct} p-4`} >
            
                 <i className="bi bi-bag-plus"></i>
                 <span>Create New Product</span>
                 </div>
                 <div className={`col-3 ${style.arrowContainer} p-4`}>
                 <i class="bi bi-arrow-right"></i>
              </div>


                </div>
                </div>
                </div>
              </div>




        
            <div className={`col-md-4 `} style={{padding:'0 '}}>
                <div className={`${style.cardCreateProduct} ` }  style={{margin:'1.5rem 2.5rem',}}>
              <div className={`container-fluid  `}> 
                <div className={`row`}>
                 <div className= {`col-9 ${style.itemCreateProduct} p-4`} >
            
                 <i className="bi bi-bag-check"></i>
                 <span>Edit Product</span>
                 </div>
                 <div className={`col-3 ${style.arrowContainer} p-4`}>
                 <i class="bi bi-arrow-right"></i>
              </div>


                </div>
                </div>
                </div>
              </div>






            <div className={`col-md-4 `} style={{padding:'0 '}}>
                <div className={`${style.cardCreateProduct} ` }  style={{margin:'1.5rem 2.5rem',}}>
              <div className={`container-fluid  `}> 
                <div className={`row`}>
                 <div className= {`col-9 ${style.itemCreateProduct} p-4`} >
            
             <i className="bi bi-bag-dash"></i>
             <span>Delete Product</span>
                 </div>
                 <div className={`col-3 ${style.arrowContainer} p-4`}>
                 <i class="bi bi-arrow-right"></i>
              </div>


                </div>
                </div>
                </div>
              </div>
        </div>
    </div>
  )
}

export default DashBoard