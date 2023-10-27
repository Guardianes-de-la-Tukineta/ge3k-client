import React from 'react'

import styles from './TableOrderDetail.module.css'

const TableOrderDetail = ({data}) => {


  function limitarADosDecimales(numero) {
    return Number(numero).toFixed(2)
  }

  
  return (
    <div>
        <div className={styles.tableContainer} >
      <table className={styles.table}>
         <thead>
         <tr>
              <th>Product ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
         </thead>
         <tbody>
            {data && data.products.map(product =>{

function cutID(id) {
    const cutedID = id.match(/^(.{4}).*?(.{4})$/);
    return `${cutedID[1]}...${cutedID[2]}`;
  }
                return(
                    <tr key={product.id}>
                        <td>{cutID(product.id)}</td>
                        <td><img src={product.image} /></td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.quantity}</td>
                        <td>{product.subtotal}</td>
                    </tr>
                )
            })}
            <tr>
            <td colSpan="5" style={{textAlign:'right'}}></td>
             <td > <strong>${limitarADosDecimales(data.total)}</strong></td>
            </tr>
         </tbody>
      </table>
    </div>
    </div>
  )
}

export default TableOrderDetail
