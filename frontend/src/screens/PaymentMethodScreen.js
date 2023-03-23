import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';//importing react-router-dom
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

export default function PaymentMethodScreen() {//PaymentMethodScreen is a function that takes in no arguments
  const navigate = useNavigate();//navigate is a variable that is equal to the useNavigate function
  const { state, dispatch: ctxDispatch } = useContext(Store);//state is a variable that is equal to the useContext function
  const {
    cart: { shippingAddress, paymentMethod },//cart is an object that has a shippingAddress property that is equal to the shippingAddress variable and a paymentMethod property that is equal to the paymentMethod variable
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(//paymentMethodName is a variable that is equal to the useState function
    paymentMethod || 'PayPal'//paymentMethod is a variable that is equal to the paymentMethod property of the cart object
  );

  useEffect(() => {//useEffect is a function that takes in a function as an argument
    if (!shippingAddress.address) {//if the shippingAddress.address property is falsy
      navigate('/shipping');//navigate to the /shipping route
    }
  }, [shippingAddress, navigate]);//shippingAddress is a variable that is equal to the shippingAddress property of the cart object
  const submitHandler = (e) => {//submitHandler is a function that takes in an object as an argument
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });//ctxDispatch is a variable that is equal to the dispatch property of the Store object
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };
  return (//returning the following jsx code to the caller of this function which is equal to the PaymentMethodScreen object's __proto__ property which is equal to the function's prototype property which is equal to an object that has a constructor property which is equal to the PaymentMethodScreen function
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodName === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}