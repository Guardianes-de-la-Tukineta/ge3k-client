import React, {useState, useEffect} from 'react'
import style from './DashBoard.module.css'
import ProductsPanel from '../ProductsPanel/ProductsPanel'
import UsersPanel from '../UsersPanel/UsersPanel'
import Spinner from "react-bootstrap/Spinner";
import { useAdminStore } from '../../ZustandAdmin/AdminStore';

const DashBoard = () => {

const [loading,setLoading] = useState(true)
const{getStadisticData, totalBilled, totalSales, registeredUsers}= useAdminStore()

  useEffect(()=>{

    const getStadistic = async ()=>{
      try {
        setLoading(true)
        await getStadisticData()
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

  if(!totalBilled){
   getStadistic()
} else{
  setLoading(false)
}
  },[])


  return (
    <div className='container-fluid d-flex flex-column flex-grow-1 justify-content-around' style={{paddingBottom:'1rem'}} >
        <div className='row'>
            <div className='col-md-4 '>
              <div className={style.cardInfoContainer}>
               
                <span><i className="bi bi-cash-coin"></i></span>

            {loading ? <Spinner
            animation="border"
            variant="ligth"
            style={{ height: "30px", width: "30px", margin: "0.45rem" }}
            />:<span className={style.number}>${totalSales}</span>}

              <span>Total Billed</span>
            </div>
            </div>
            <div className='col-md-4 '>
              <div className={style.cardInfoContainer}>
                <span><i className="bi bi-credit-card-fill"></i></span>
                
                {loading ? <Spinner
            animation="border"
            variant="ligth"
            style={{ height: "30px", width: "30px", margin: "0.45rem" }}
          />:<span className={style.number}>{totalBilled} </span>}
                <span>Total Sales</span>
              </div>
            </div>
            <div className='col-md-4 '>
              <div className={style.cardInfoContainer}>
                <span><i className="bi bi-person-fill-check"></i></span>
                {loading ? <Spinner
            animation="border"
            variant="ligth"
            style={{ height: "30px", width: "30px", margin: "0.45rem" }}
          />:<span className={style.number}>{registeredUsers} </span>}
                <span>Registered Users</span>
              </div>
            </div>

            
        </div>
        <UsersPanel/>
       <ProductsPanel/>
       
    </div>
  )
}

export default DashBoard