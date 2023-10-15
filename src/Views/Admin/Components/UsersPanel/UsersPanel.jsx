import React from 'react'
import { Link } from 'react-router-dom'
import style from './UsersPanel.module.css'



const UsersPanel = () => {
  return (
    <div className='row'>
           
            <div className={`col-lg-4 `} style={{padding:'0 '}}>
            <Link to='/admin/users/manage'>
                <div className={`${style.cardForUsers} ` }  style={{margin:'1.5rem 2.5rem',}}>
              <div className={`container-fluid  `}> 
                <div className={`row`}>
                 <div className= {`col-10 ${style.itemCreateProduct}`} >
            
                 <i className={`bi bi-person-fill-gear ${style.edit}`}></i>

                 <span>MANAGE USERS</span>
                 </div>
                 <div className={`col-2 ${style.arrowContainer}`}>
                 <i className="bi bi-arrow-right"></i>
              </div>


                </div>
                </div>
                </div>
                </Link>
              </div>




            <div className={`col-lg-4 `} style={{padding:'0 '}}>
            <Link to='/admin/users/manage-admin'> <div className={`${style.cardForUsers} ` }  style={{margin:'1.5rem 2.5rem',}}>
              <div className={`container-fluid  `}> 
                <div className={`row`}>
                 <div className= {`col-10 ${style.itemCreateProduct}`} >
            
  
                 <i className={`bi bi-person-fill-lock ${style.edit}`}></i>
             <span>MANAGE ADMINISTRATORS</span>
                 </div>
                 <div className={`col-2 ${style.arrowContainer}`}>
                 <i className="bi bi-arrow-right"></i>
              </div>


                </div>
                </div>
                </div>
                </Link>
              </div>

              <div className={`col-lg-4 `} style={{padding:'0 '}}>
              <Link to='/admin/users/add-admin'>  <div className={`${style.cardForUsers} ` }  style={{margin:'1.5rem 2.5rem',}}>
              <div className={`container-fluid  `}> 
                <div className={`row`}>
                 <div className= {`col-10 ${style.itemCreateProduct}`} >
            
          
                 <i className={`bi bi-person-plus-fill ${style.create}`}></i>
             <span>ADD NEW ADMINISTRATOR</span>
                 </div>
                 <div className={`col-2 ${style.arrowContainer}`}>
                 <i className="bi bi-arrow-right"></i>
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
