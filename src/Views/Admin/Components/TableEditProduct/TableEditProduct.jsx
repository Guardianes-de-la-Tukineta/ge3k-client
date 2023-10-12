import React from 'react'
import styles from './TableEditProduct.module.css'

const TableEditProduct = () => {
  return (
    <div>
      <table className={styles.table}>
        <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Data 1</td>
          <td>Data 2</td>
          <td>Data 3</td>
          <td><button>Edit</button></td>
        </tr>
        <tr>
          <td>Data 4</td>
          <td>Data 5</td>
          <td>Data 6</td>
          <td><button>Edit</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableEditProduct
