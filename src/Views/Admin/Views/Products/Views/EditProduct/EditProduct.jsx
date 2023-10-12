import React from 'react'
import SearchBarAdmin from '../../../../Components/SearchBarAdmin/SearchBarAdmin'
import GetSuggestionFromBack from '../../../Hooks/GetSuggestionFromBAck'
import TableEditProduct from '../../../../Components/TableEditProduct/TableEditProduct'


const EditProduct = () => {
  return (
    <div className='flex-grow-1 m-4 d-flex flex-column justify-content-center align-items-center text-center rounded mt-2' style={{backgroundColor:'#dbdbdb', height:'100%'}}>
      <h4>Here you will can EDIT a product</h4>
      <SearchBarAdmin handleSearch={(r)=>console.log(r)}/>
      <TableEditProduct/>
    </div>
  )
}

export default EditProduct
