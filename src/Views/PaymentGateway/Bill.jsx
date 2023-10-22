
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useStore } from 'zustand';
import { PurchaseStore } from "../../zustand/PurchaseOrder/PurchaseStore.js";

const Bill = () => {
  const [url, setUrl] = useState('');

 const order = useStore(PurchaseStore, (state) => state.order);
    
  console.log(order);


  const getBill = async () => {
 
   
  try {
    const response = await fetch('https://ge3k-server.onrender.com/stripe-session/bill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stripeOrderId: "cs_test_a1Ynrn9wtlLr9sNAJTcFZHwjx4F8KkrASOjBM60yAaxQd4lZb6KHPXGZap" }),
    });

    if (response.ok) {
      const data = await response.json();
      setUrl(data.url);
      console.log(data.url);
    } else {
      console.error('Error al obtener la factura');
    }
  } catch (error) {
    console.error('Error al obtener la factura:', error);
  }
};

  useEffect(() => {
    getBill();
  }, []);

  return (
    <div className="text-center my-5">
      <h1>Here you can  see/download your bill</h1>
      <p className="my-5">Please click on the left button for download your bill</p>
      
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Button
          style={{borderRadius: '10px', padding: '10px 5px', margin: '0 3px', backgroundColor: '#ff6824', border: 'none', fontWeight: '600'}}
        >
          Click here please for obtain your Bill!!
        </Button>
      </a>
      <Link to="/">
        <Button style={{borderRadius:'10px', padding:'10px 5px', margin:'0 3px', backgroundColor:'#ff6824', border:'none', fontWeight:'600'}}>Go back to Home</Button>
      </Link>
      
     
    </div>
  );
};

export default Bill;
