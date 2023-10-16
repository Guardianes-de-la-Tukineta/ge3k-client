
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Bill = () => {
  const [url, setUrl] = useState('');

  const getBill = async () => {
    try {
      const response = await fetch('http://localhost:4000/bill');
      if (response.ok) {
        const data = await response.json();
        setUrl(data);
        console.log(url.data);
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
