import React, {useEffect, useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
const axios = require('axios').default;
const APIURL = "http://localhost:5000";

const stripePromise = loadStripe('pk_test_51MG618CkQfuK4spK8INAtRKFQ4W2G4vCyUdl604PaCVTlMqZAq6hgwkPk0VptvlpkWm87Nk8Acg918gyqtbTcjvM00CfQReFtZ');
  
export default function CheckoutIndex() {
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(true);
    
    const createPaymentIntent = async () => {
      const client_secret = await axios.get(APIURL + "/admin/getSecret")
      console.log(client_secret.data)
      setClientSecret(client_secret.data)
      setLoading(false); // eslint-disable-next-line
    }
    
    useEffect(() => {
      createPaymentIntent(); // eslint-disable-next-line
    },[])
    
    const options = {
        // passing the client secret obtained from the server
        clientSecret,
      };

  return (
    <div>{ loading ? <></> :<Elements stripe={stripePromise} options={options}>
    <CheckoutForm />
  </Elements>}</div>
  )
}
