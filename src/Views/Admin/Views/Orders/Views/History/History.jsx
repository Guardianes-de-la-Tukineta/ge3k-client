import React, {useState, useEffect} from 'react'
import TableOrderHistory from '../../../../Components/TableOrderHistory/TableOrderHistory'
import useOrdersFromBack from '../../../../Hooks/useOrdersFromBack'
import PaginationAdminOrders from '../../../../Components/PaginationAdminOrders/PaginationAdminOrders'
import Spinner from "react-bootstrap/Spinner";
import styles from './History.module.css'


const History = () => {

 const {data, loading, pageNum, setPageNum, totalPages, getOrdersFromBack, error} = useOrdersFromBack()


  return (
    <div
    className="flex-grow-1 d-flex flex-column"
      style={{ padding: " 1rem 1.65rem " }}>
         <div
        className={`${styles.editProductContainer} container-fluid flex-grow-1`}
      >
       {loading? <Spinner
            animation="border"
            variant="dark"
            style={{ height: "50px", width: "50px", margin: "5rem" }}
          /> : <TableOrderHistory data={data} />}
       {(totalPages>1 && !loading) && <PaginationAdminOrders page={pageNum} setPage={setPageNum} totalPages={totalPages} />}
    </div>
    </div>
  )
}

export default History
