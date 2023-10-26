import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Si deseas agregar un enlace a otra página
import { useEffect } from "react";
import Swal from 'sweetalert2';
import cart from "../../Images/cart.jpg"


const PaymentSuccessView = () => {

  useEffect(()=> {
    //shows after .6 second
    const timer = setTimeout(()=> {
     
      Swal.fire({
        title: 'Failed To Purchase',
        text: 'The purchase was not successful, if an error has occurred please try again',
        imageUrl: cart, 
        imageWidth: 150, 
        imageHeight: 150, 
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
      
      <Link to="/">
        <Button style={{borderRadius:'10px', padding:'10px 5px', margin:'0 3px', backgroundColor:'#ff6824', border:'none', fontWeight:'600'}} >Volver a la página de inicio</Button>
      </Link>

    </div>
    </>
  );
};

export default PaymentSuccessView;


