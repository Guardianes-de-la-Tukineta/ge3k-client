import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Si deseas agregar un enlace a otra página

const PaymentSuccessView = () => {
  return (
    <div  className="text-center my-5">
      <h1>¡The purchase has been canceled!</h1>
      <p className="my-5">Please try again your purchase if was  an error</p>
      
      {/* Opcional: Agregar un enlace a otra página */}
      <Link to="/">
        <Button style={{borderRadius:'10px', padding:'10px 5px', margin:'0 3px', backgroundColor:'#ff6824', border:'none', fontWeight:'600'}} >Volver a la página de inicio</Button>
      </Link>

    </div>
  );
};

export default PaymentSuccessView;


