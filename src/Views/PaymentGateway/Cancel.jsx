import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Si deseas agregar un enlace a otra página
import { useEffect } from "react";
import Swal from 'sweetalert2';
import { cartStore } from "../../zustand/cartStore/cartStore";

const PaymentSuccessView = () => {

  const navigate = useNavigate();
  const { deleteCart } = cartStore(); //nos traemos estados de zustand

  useEffect(()=> {
    //shows after .6 second
    const timer = setTimeout(()=> {
     
      Swal.fire({
        title: 'Failed To Purchase',
        text: 'The purchase was not successful, if an error has occurred please try again',
        imageUrl: "https://pic.onlinewebfonts.com/thumbnails/icons_567583.svg", 
        imageWidth: 150, 
        imageHeight: 150, 
        confirmButtonText: 'OK',
        confirmButtonColor: '#ff6824',
      });
    },600);
    return () => clearTimeout(timer);
  },[])

  
  const reloadPage = () => {
    navigate("/");
    window.location.reload();
  }

  const cancelPurchase = () => {
    deleteCart();
    reloadPage();
  }
    
  return (
    <>
    <div  className="text-center my-5">
      <h1>¡The purchase has been canceled!</h1>
      <p className="my-5">Please try again your purchase if was  an error</p>
      
      <Link to="/PurchaseOrder">
        <Button style={{borderRadius:'10px', padding:'10px 5px', margin:'0 3px', backgroundColor:'#ff6824', border:'none', fontWeight:'600'}} onClick={reloadPage} >Try Again Your Purchase</Button>
      </Link>

      <Link to="/PurchaseOrder">
        <Button style={{borderRadius:'10px', padding:'10px 5px', margin:'0 3px', backgroundColor:'#ff6824', border:'none', fontWeight:'600'}} onClick={cancelPurchase} >Cancel the Purchase</Button>
      </Link>

    </div>
    </>
  );
};

export default PaymentSuccessView;


