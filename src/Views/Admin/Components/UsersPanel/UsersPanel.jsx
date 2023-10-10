import React from 'react'
import { Link } from 'react-router-dom'
import style from './UsersPanel.module.css'



const UsersPanel = () => {
  return (
    <div className='row'>
           
            <div className={`col-md-4 `} style={{padding:'0 '}}>
            <Link to='/admin/users/manage'>
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
            <Link to='/admin/users/manage-admin'> <div className={`${style.cardForUsers} ` }  style={{margin:'1.5rem 2.5rem',}}>
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
              <Link to='/admin/users/add-admin'>  <div className={`${style.cardForUsers} ` }  style={{margin:'1.5rem 2.5rem',}}>
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
  )
}

export default UsersPanel
