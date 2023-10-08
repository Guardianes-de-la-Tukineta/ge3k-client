import React from "react";
import { loadStripe } from '@stripe/stripe-js';
import image from "../../Images/SLIDER_03.jpg"
import axios from "axios";
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'; //each component will have access to stripe payment
//useStripe its a hook from Stripe directly


const stripePromise = loadStripe("pk_test_51NsYWxEnSXX7HzFz0OA8CHfpXQimIkhh26jAJwCaov0umCbf4GSCO3raRASd0uBwh0D4qPylkEpP76GfM42Er5yb00C2t7JwPu");

const CheckoutForm = () => {

  


    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {

        const compra = {   //hardcodeo
            items : [
                {
                name: "Naruto T-Shirt",    
                amount: 25 * 100, //ammount is in cents
                cantidad: 3
            },
            ]
        }


          event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
           type: "card",
           card: elements.getElement(CardElement)
         })   

         if(!error){
            const { id } = paymentMethod;
            try {
                    
           const { data } = await axios.post('https://ge3k-server.onrender.com/paymentBack', {
            id,
            amount: 25 * 100   //in cents
    
        });

        console.log(data);
            } catch (error) {
            
                window.alert("Se ha producido un error");
            }

         }
    }


    return(
        <form onSubmit={handleSubmit} className="card card-body">
            <img src={image} alt="image"  className="img-fluid"/>
            <div className="form-group">
              <CardElement className="form-control"/>
            </div>
            <button className="btn btn-success">
                Buy 
            </button>
        </form>
    )
}

const PaymentGateWay = () => {




return(
    
       <Elements stripe={ stripePromise}>
           <div className="container p-4">
              <div className="row">
                 <div  className=".col-md-4.offset-md-4">
                   <CheckoutForm />
                 </div>
              </div>
           </div>
       </Elements>

)

}

export default PaymentGateWay;