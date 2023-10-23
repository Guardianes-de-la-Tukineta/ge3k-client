import React, {useState, useEffect} from 'react'
import styles from './OrderDetail.module.css'
import TableOrderDetail from '../../../../Components/TableOrderDetail/TableOrderDetail'
import axios from 'axios'
import Spinner from "react-bootstrap/Spinner";
import { useNavigate, useParams } from 'react-router-dom'

const OrderDetail = () => {

  const [dataOrder, setDataOrder] = useState(false)
  const [loading, setLoading] = useState(false)
  const {ID} = useParams()
  let navigate = useNavigate();

  useEffect(()=>{
    const URL = 'https://ge3k-server.onrender.com/orders/detail/'
    setLoading(true)
    axios.get(URL+ID).then(({data})=>{
       setDataOrder(data);
       setLoading(false)
      }).catch((error)=>{
        console.error(error)
        setLoading(false)
      })
  },[])

  return (
    <div
    className="flex-grow-1 d-flex flex-column"
      style={{ padding: " 1rem 1.65rem " }}>
         <div
        className={`${styles.editProductContainer} container-fluid flex-grow-1`}
      >

<h4>ORDER DETAIL</h4>
<div className='row  justify-content-center w-100'>
        <div className={`col-lg-10 `} >
        
        <div className="d-flex w-100 justify-content-between align-items-center flex-wrap mb-3">
          <div className="d-flex align-items-center flex-wrap">
            <button onClick={()=>navigate(-1)} className={styles.resetButton}>
            <i className="bi bi-arrow-left-circle" style={{marginRight:'5px'}}></i> Back
            </button> 
          </div>
          {/* <SearchBarAdmin
            handleSearch={handleGetSuggestions}
            setResetDropDowns={setResetDropDowns}
            reset={searchBarResetCounter}
          /> */}
        </div>


<div className={styles.spinerContainer} >
       {loading && <Spinner
            animation="border"
            variant="dark"
            style={{ height: "50px", width: "50px", margin: "5rem" }}
          />}
</div>
        {!loading && <TableOrderDetail data={dataOrder} />}
         <p style={{fontSize:'0.85rem', marginTop:'0.5rem'}} >Order: <strong >{ID}</strong> </p> 
    </div>
    </div>
    </div>
    </div>
  )
}

export default OrderDetail
