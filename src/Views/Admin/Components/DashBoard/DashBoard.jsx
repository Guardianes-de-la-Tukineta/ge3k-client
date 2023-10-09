import React from 'react'
import style from './DashBoard.module.css'
import { Link } from 'react-router-dom'

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
                <span><i class="bi bi-credit-card-fill"></i></span>
                <span className={style.number}>150</span>
                <span>Total Sales</span>
              </div>
            </div>
            <div className='col-md-4 '>
              <div className={style.cardInfoContainer}>
                <span><i class="bi bi-person-fill-check"></i></span>
                <span className={style.number}>72</span>
                <span>Registered Users</span>
              </div>
            </div>

            
        </div>


        <div className='row'>
           
            <div className={`col-md-4 `} style={{padding:'0 '}}>
            <Link to='/admin/products'>   <div className={`${style.cardCreateProduct} ` }  style={{margin:'1.5rem 2.5rem',}}>
              <div className={`container-fluid  `}> 
                <div className={`row`}>
                 <div className= {`col-9 ${style.itemCreateProduct}`} >
            
                 <i class="bi bi-bag-plus-fill"></i>
                 <span>CREATE NEW PRODUCT</span>
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
            <Link to='/admin/products'>    <div className={`${style.cardCreateProduct} ` }  style={{margin:'1.5rem 2.5rem',}}>
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
            <Link to='/admin/products'>  <div className={`${style.cardCreateProduct} ` }  style={{margin:'1.5rem 2.5rem',}}>
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


        <div className='row'>
           
            <div className={`col-md-4 `} style={{padding:'0 '}}>
            <Link to='/admin/users'>
                <div className={`${style.cardForUsers} ` }  style={{margin:'1.5rem 2.5rem',}}>
              <div className={`container-fluid  `}> 
                <div className={`row`}>
                 <div className= {`col-9 ${style.itemCreateProduct}`} >
            
                 <i class="bi bi-person-fill-gear"></i>
                 <span>MANAGE USERS</span>
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
            <Link to='/admin/users'> <div className={`${style.cardForUsers} ` }  style={{margin:'1.5rem 2.5rem',}}>
              <div className={`container-fluid  `}> 
                <div className={`row`}>
                 <div className= {`col-9 ${style.itemCreateProduct}`} >
            
                 <i class="bi bi-person-fill-lock"></i>
             <span>MANAGE ADMINISTRATORS</span>
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
              <Link to='/admin/users'>  <div className={`${style.cardForUsers} ` }  style={{margin:'1.5rem 2.5rem',}}>
              <div className={`container-fluid  `}> 
                <div className={`row`}>
                 <div className= {`col-9 ${style.itemCreateProduct}`} >
            
                 <i class="bi bi-person-plus-fill"></i>
             <span>ADD NEW ADMINISTRATOR</span>
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


    </div>
  )
}

export default DashBoard