import React from 'react'
import styles from './TableEditProduct.module.css'





const TableEditProduct = ({data}) => {
  console.log(data)

  return (
    <div className={styles.tableContainer}>
     {(data && data.length > 0)? <table className={styles.table}>
        <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Catgory</th>
          <th>Theme</th>
          <th>Description</th>
          <th>Action</th>
          
          
        </tr>
        </thead>
        <tbody>
          {data.map((product, index) => {

            function cutID(id){
              console.log(id)
                 const cutedID = id.match(/^(.{4}).*?(.{4})$/)
                 return `${cutedID[1]}...${cutedID[2]}`
            }

            return(
              <tr key={index}>
                <td>{cutID(product.id)}</td>
          <td><img src={product.image} /></td>
          <td>{product.name}</td>
          <td>{product.stock}</td>
          <td>{product.price}</td>
          <td>{product.discount || 'No'}</td>
          <td>{product.categoryName}</td>
          <td>{product.themeName}</td>
          <td>{product.description}</td>
          <td><button className={styles.editButton}>Edit <i class="bi bi-pencil-square"></i> </button></td>
              </tr>
            )
          } )}
    
        </tbody>
      </table>
    : ''} </div>
  )
}

export default TableEditProduct
