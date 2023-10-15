import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Si deseas agregar un enlace a otra página

const PaymentSuccessView = () => {
  return (
    <div  className="text-center my-5">
      <h1>¡The purchase has been successful!</h1>
      <p className="my-5">Thank you for your purchase and we hope to have the pleasure of serving you again.</p>
      
      {/* Opcional: Agregar un enlace a otra página */}
      <Link to="/">
        <Button style={{borderRadius:'10px', padding:'10px 5px', margin:'0 3px', backgroundColor:'#ff6824', border:'none', fontWeight:'600'}}>Volver a la página de inicio</Button>
      </Link>

      {/* Opcional: Agregar un botón para imprimir el comprobante */}
      <Button style={{borderRadius:'10px', padding:'10px 5px', margin:'0 3px', backgroundColor:'#ff6824', border:'none', fontWeight:'600'}}  className="ml-3" onClick={() => window.print()}>
        Imprimir comprobante
      </Button>
    </div>
  );
};

export default PaymentSuccessView;













// const Success = () => {

//     return(
//         <h1> Thank you for your purchase! </h1>
//     )

// }

// export default Success;