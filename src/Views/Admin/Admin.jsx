import React from 'react'
import AdminNav from './Components/Nav/AdminNav'
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import TopBar from './Components/TopBar/TopBar';
import "./Admin.css";
import Products from './Views/Products/Products';
import Users from './Views/Users/User';
import DashBoard from './Components/DashBoard/DashBoard';

const Admin = () => {

  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  //Logica de estilos
  const handleToggle = () => {
    (!toggle) ? setToggle(true) : setToggle(false)
  }


  return (
    <div className="App">

      <AdminNav toggleState={toggle} />

      <div className={(toggle) ? 'main active' : 'main'}>

        <TopBar toggle={toggle} handleToggle={handleToggle} />

        {(location.pathname === '/admin')?<DashBoard /> : undefined }

        <Routes>
          <Route path='products' element={<Products />} />
          <Route path='users' element={<Users />} />
        </Routes>
      </div>
    </div>


  )
}

export default Admin