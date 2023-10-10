import React from "react";
import { loadStripe } from '@stripe/stripe-js';
import image from "../../Images/SLIDER_03.jpg"
import axios from "axios";
import { Button, Row, Col, Modal } from 'react-bootstrap';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; //each component will have access to stripe payment
//useStripe its a hook from Stripe directly
import CardTest from "./CardTest";

import { useState } from "react";
import { useContext } from "react";
import { CartTest } from "./CartContext";
import ShowCart from "./showCart";


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
    console.log(productData);
    return productData;
}


const PaymentGateway = () => {

    const [ show, setShow] = useState(false);
    
    const cart = useContext(CartTest);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const checkout = async () => {
        await fetch('http://localhost:4000/checkout', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({items: cart.items})
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if(response.url){
                window.location.assign(response.url);
            }
        })
    }
   
   const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);
   console.log(cart.items);

   console.log(productsCount);

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
                    <button variant="success" onClick={checkout}>
                         Purchase items!
                    </button>
                </>
                   :
                     <h1>There are not items in your Cart!</h1>
                } 
               
            </Modal.Body>
        </Modal>
            <Button onClick={handleShow}>Cart ({productsCount} Items) Items </Button> 
       


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


