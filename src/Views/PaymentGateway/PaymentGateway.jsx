import React, { useEffect } from "react";
import { loadStripe } from '@stripe/stripe-js';
import image from "../../Images/SLIDER_03.jpg"
import axios from "axios";
import { Button, Row, Col, Modal } from 'react-bootstrap';
import { cartStore } from "../../zustand/cartStore/cartStore";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; //each component will have access to stripe payment
//useStripe its a hook from Stripe directly
import CardTest from "./CardTest";

import { useState } from "react";
import { useContext } from "react";
import { CartTest } from "./CartContext";
import ShowCart from "./showCart";
import { useStore } from "zustand";


 //-----------------------------------------------------------------

 export const products = [        //products for testing of the payment
 {
     id: "abcd3493",  
     title: "Mario T-Shirt",
     price: 20.5,
     stripe: "price_1NzU8BHRnrIZF2AajpUxg184"
 },
 {
     id: "abcd4433",
     title: "Zelda mini pocket",
     price: 31.5,
     stripe: "price_1NzUCRHRnrIZF2AaY5O0HDzV"
 },
 {
     id: "abcd3244",
     title: "Saiyan T-Shirt",
     price: 25.2,
     stripe: "price_1NzUDgHRnrIZF2AaAwkcdu5d"
 },
 {
     id: "abcd34532",  
     title: "Freeza Mug Warrior",
     price: 10.5,
     stripe: "price_1NzUEuHRnrIZF2AaYhpxorTQ"
 },
 {
     id: "abcd34354",  
     title: "KeyPad Game of Thrones",
     price: 12.99,
     stripe: "price_1NzjMaHRnrIZF2Aa92qbsmRi"
 },
];
//-----------------------------------------------------------------

export const getProductData = (stripe) => {
    let productData = products.find(product => product.stripe === stripe);

    if(productData == undefined){
       console.log("Product data does not exist for ID: " + stripe);
       return undefined;
    }
    return productData;
}


const PaymentGateway = () => {

    const { buyCart } = useStore(cartStore);
    console.log(buyCart);
    
    const [ show, setShow] = useState(false);
    
    const cart = useContext(CartTest);
   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() =>{
      checkout
      cartStore
    },[])

    const checkout = async () => {
        try {
          const checkoutResponse = await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items: cart.items })
          });
      
          const checkoutData = await checkoutResponse.json();
      
          if (checkoutData.url) {
            window.location.assign(checkoutData.url);
          }
      
          // const customerResponse = await fetch("http://localhost:4000/customerStripe", {
          //   method: "POST",
          //   headers: {
          //     'Content-Type': 'application/json'
          //   },
          //   body: JSON.stringify({data :{ 
          //     email: "leonardo381@gmail.com", 
          //     metadata: "reg-lvillarraga",
          //      name: "Luis Leonardo Villarraga",
          //     }

                
          //      })
          // });
      
          const customerData = await customerResponse.json();
      
          if (customerData.url) {
            window.location.assign(customerData.url);
          }
        } catch (error) {
          console.error(error);
          // Manejar errores, mostrar mensajes de error, etc.
        }
      };

   
   const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);
   

  

    return(
        <>
              {/* Emulate the Cart Button in this page */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {productsCount > 0 ?
                <>
                   <p>Items in your Cart:</p>
                   { cart.items.map((currentProduct, index) => (
                    
                      <ShowCart key={index} id={currentProduct.id} quantity={currentProduct.quantity}></ShowCart>
                   ))}
                    <h1>Total: {cart.getTotalCost().toFixed(2)}  </h1>
                    <Button variant="success" onClick={checkout}>
                         Purchase items!
                    </Button>
                </>
                   :
                     <h1>There are not items in your Cart!</h1>
                } 
               
            </Modal.Body>
        </Modal>
            <Button onClick={handleShow}>Cart ({productsCount} Items)</Button> 
       


          <h1 align="center" className="p-3">Welcome To Ge3k.Hub Store</h1>
          <Row xs={1} md={3} className="g-4">
             {products.map((product, index) => (
                
                     <Col align="center" key={index}>
                       <CardTest product={product}/>
                  </Col>
             ))}
            
            
          </Row>

         
        </>
    )
}

export default PaymentGateway;


