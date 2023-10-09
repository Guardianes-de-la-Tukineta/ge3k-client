const express = require('express');
const Stripe= require('stripe');
const cors= require('cors');

const paymentBack = express()


const stripe = new Stripe("sk_test_51NsYWxEnSXX7HzFz3booKr5p1NOS2yb90iqSALOKYRyoRFB6b44k40kozrNL7JTaj4jt3GgUeilwkQMGUeXMJI3l0089UcLhqK")

paymentBack.use(cors({ origin: 'http://127.0.0.1:5173/payment'}));
paymentBack.use(express.json());

paymentBack.post('paymentBack'), async ( req, res) => {
  try {
       
    const { id, amount } = req.body
    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "",
        payment_method:id,
        confirm: true
    });

    console.log(payment);
    res.send({})
  } catch (error) {
    res.json( {message: error.raw.message });
  }
};