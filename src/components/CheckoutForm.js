import React, {useState, useEffect}from 'react'
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";

export default function CheckoutForm() {

  const stripe = useStripe();
  const elements = useElements();

  const [course, setCourse] = useState([]);
  let {id} = useParams();

  const fetchCourse = async () => {
    const response = await axios.get(APIURL + '/courses/' + id)
    const data = response.data;
    console.log(data); //testing purposes
    setCourse(data);
}

  useEffect(() => {
    fetchCourse();
  },[])

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/course/"+ course._id,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };
  return (
    <Card className="mt-4 w-50 mx-auto my-4">
    <Card.Header><h2>Payment Info</h2></Card.Header>
    <br/>
    <form className="mt-4 w-50 mx-auto my-4" onSubmit={handleSubmit}>
      <PaymentElement /><br/>
      <hr/>
      <div><h4>$<strong>{course.price}</strong> will be deducted from your credit card <strong>monthly</strong>.</h4></div>
      <hr/>
      <Button type="submit" variant="danger">Confirm Payment</Button>
    </form>
    </Card>
  )
}
