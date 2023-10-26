import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom"; // Si deseas agregar un enlace a otra página
import { useState } from "react";
import { useEffect } from "react";
import cartCanceled from "../../Images/cartCanceled.jpg";
import Swal from 'sweetalert2';


const PaymentSuccessView = () => {

  const [ show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(()=> {
    //shows modal after 1 second
    const timer = setTimeout(()=> {
      // handleShow();
      Swal.fire({
        title: 'Failed To Purchase',
        text: 'The purchase was not successful, if an error has occurred please try again',
        imageUrl: cartCanceled, 
        imageWidth: 150, 
        imageHeight: 150, 
        // icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff6824',
      });
    },600);
    return () => clearTimeout(timer);
  },[])
    
  return (
    <>

    
    <div  className="text-center my-5">
      <h1>¡The purchase has been canceled!</h1>
      <p className="my-5">Please try again your purchase if was  an error</p>
      
      {/* Opcional: Agregar un enlace a otra página */}
      <Link to="/">
        <Button style={{borderRadius:'10px', padding:'10px 5px', margin:'0 3px', backgroundColor:'#ff6824', border:'none', fontWeight:'600'}} >Volver a la página de inicio</Button>
      </Link>

    </div>
    </>
  );
};

export default PaymentSuccessView;


