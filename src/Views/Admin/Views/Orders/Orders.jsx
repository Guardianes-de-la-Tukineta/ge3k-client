import React from 'react'
import { Routes, Route } from 'react-router-dom'
import History from './Views/History/History'
import OrderDetail from './Views/OrderDetail/OrderDetail'




const Orders = () => {



    return (
    <div className='container-fluid d-flex flex-column flex-grow-1 justify-content-around w-100' style={{paddingBottom:'1rem'}}>


        <Routes>
            <Route path='id/:ID' element={<OrderDetail/>}  />
            <Route path='history' element={<History/>}  />
        </Routes>
      
    </div>
  )
}

export default Orders
