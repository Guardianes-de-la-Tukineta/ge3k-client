import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"; 

const PaymentSuccessView = () => {
  return (
    <div  className="text-center my-5">
      <h1>¡The purchase has been successful!</h1>
      <p className="my-5">Thank you for your purchase and we hope to have the pleasure of serving you again.</p>
      
      
      <Link to="/bill">
        <Button style={{borderRadius:'10px', padding:'10px 5px', margin:'0 3px', backgroundColor:'#ff6824', border:'none', fontWeight:'600'}}>Please click here for obtain your purchase Bill</Button>
      </Link>

     
      <Link to="/">
        <Button  style={{borderRadius:'10px', padding:'10px 5px', margin:'0 3px', backgroundColor:'#ff6824', border:'none', fontWeight:'600'}}  className="ml-3">
            Back to Home
        </Button>
      </Link>
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