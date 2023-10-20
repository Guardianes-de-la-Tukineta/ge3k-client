import React, { useEffect } from "react";
import AdminNav from "./Components/Nav/AdminNav";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import TopBar from "./Components/TopBar/TopBar";
import "./Admin.css";
import Products from "./Views/Products/Products";
import Users from "./Views/Users/User";
import DashBoard from "./Components/DashBoard/DashBoard";
import Auth from "./Views/Auth/Auth";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [toggle, setToggle] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();


  //Logica de estilos
  const handleToggle = () => {
    !toggle ? setToggle(true) : setToggle(false);
  };

  useEffect(() => {
    // Verifica si el usuario tiene un token de autenticación
    const token = localStorage.getItem("token");
    if (!token) {
      // Si no hay token, redirige al usuario a la página de inicio de sesión
      navigate("/admin/auth");
    } else {
      // Si hay un token, puedes realizar otras acciones aquí, como cargar datos de administración, etc.
    }
  }, []);

  const handleLogOut = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  return (
    <div className="App">
      {location.pathname !== "/admin/auth" ? (
        <AdminNav toggleState={toggle} handleLogOut={handleLogOut} />
      ) : undefined}

      <div className={toggle ? "main active" : "main"}>
        {location.pathname !== "/admin/auth" ? (
          <TopBar toggle={toggle} handleToggle={handleToggle} />
        ) : undefined}

        {location.pathname === "/admin" ? <DashBoard /> : undefined}

        <Routes>
          <Route path="auth" element={<Auth />} />
          <Route path="products/*" element={<Products />}/>
          <Route path="users/*" element={<Users />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
