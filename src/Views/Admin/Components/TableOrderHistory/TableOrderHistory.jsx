import React from 'react'
import styles from './TableOrderHistory.module.css'
import { useNavigate } from 'react-router-dom'

const TableOrderHistory = ({data}) => {

  const navigate = useNavigate()



 const handleMoreDetails = (id)=>{
  navigate(`/admin/orders/id/${id}`);
 }

  return (
    <div className={styles.tableContainer} >
      <table className={styles.table}>
         <thead>
         <tr>
              <th>Order ID</th>
              <th>Customer Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
         </thead>
         <tbody>
            {data && data.map(order =>{

function cutID(id) {
    const cutedID = id.match(/^(.{4}).*?(.{4})$/);
    return `${cutedID[1]}...${cutedID[2]}`;
  }
  let dateBack = new Date(order.createdAt);
  let dateFormated = dateBack.toLocaleDateString();

                return(
                    <tr key={order.id}>
                        
                        <td>{cutID(order.id)}</td>
                        <td>{cutID(order.CustomerId)}</td>
                        <td>{order.name}</td>
                        <td>{order.email}</td>
                        <td>{dateFormated}</td>
                        <td>{order.status}</td>
                        <td><button>Completed</button> <button onClick={()=> handleMoreDetails(order.id)} >Details</button> </td>
                    </tr>
                )
            })}
         </tbody>
      </table>
    </div>
  )
}

export default TableOrderHistory
