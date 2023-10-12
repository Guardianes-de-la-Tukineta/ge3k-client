import React, {useState} from 'react'
import styles from './TableEditProduct.module.css'





const TableEditProduct = ({data, HandleUpdate}) => {

  const [idSelected, setIDSelected] = useState(null)
  const [inputValues, setInputValues] = useState({})
 
  const handleInputChange = (e) => {
    setInputValues((prevState) =>({...prevState, [e.target.name]: e.target.value}))
  };

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
          {data.map(product => {

            function cutID(id){
                 const cutedID = id.match(/^(.{4}).*?(.{4})$/)
                 return `${cutedID[1]}...${cutedID[2]}`
            }

            if(product.id === idSelected){
              return(
                <tr key={product.id}>
                  <td>{cutID(product.id)}</td>
            <td><img src={product.image} /></td>
            <td><input type="text" name='name' value={ (inputValues.hasOwnProperty('name'))? inputValues.name : product.name} onChange={handleInputChange} />  </td>
            <td> <input type="number" name='stock' value={ (inputValues.hasOwnProperty('stock'))? inputValues.stock : (product.stock )} onChange={handleInputChange} /></td>
            <td><input type="number" name='price' step="any" value={ (inputValues.hasOwnProperty('price'))? inputValues.price : product.price} onChange={handleInputChange} /></td>
            <td><input type="number" name='discount'  value={ (inputValues.hasOwnProperty('discount'))? inputValues.discount : product.discount || '0'} onChange={handleInputChange} /> </td>
            <td><input type="text" name='categoryName'  value={ (inputValues.hasOwnProperty('categoryName'))? inputValues.categoryName : product.categoryName} onChange={handleInputChange}/></td>
            <td><input type="text" name='themeName'  value={ (inputValues.hasOwnProperty('themeName'))? inputValues.themeName : product.themeName} onChange={handleInputChange}/></td>
            <td><input type="text" name='description'  value={ (inputValues.hasOwnProperty('description'))? inputValues.description : product.description} onChange={handleInputChange}/></td>
            <td><button className={styles.editButton}>OK</button><button className={styles.editButton}>Cancel</button></td>
                </tr>
              )
            }

            return(
              <tr key={product.id}>
                <td>{cutID(product.id)}</td>
          <td><img src={product.image} /></td>
          <td>{product.name}</td>
          <td>{product.stock}</td>
          <td>{product.price}</td>
          <td>{product.discount || 'No'}</td>
          <td>{product.categoryName}</td>
          <td>{product.themeName}</td>
          <td>{product.description}</td>
          <td><button onClick={()=>setIDSelected(product.id)} className={styles.editButton}>Edit <i className="bi bi-pencil-square"></i> </button></td>
              </tr>
            )
          } )}
    
        </tbody>
      </table>
    : ''} </div>
  )
}

export default TableEditProduct
