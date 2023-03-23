import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen() {//ShippingAddressScreen is a function that takes in no arguments
  const navigate = useNavigate();//navigate is a variable that is equal to the useNavigate function
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,//userInfo is a variable that is equal to the userInfo property of the state object
    cart: { shippingAddress },
  } = state;//state is a variable that is equal to the state property of the Store object
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''//shippingAddress is a variable that is equal to the shippingAddress property of the cart object
  );
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || '');
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  };
  return (//return is a statement that takes in an object as an argument and a div statement that takes in an object as an argument and a Helmet statement that takes in an object as an argument and a CheckoutSteps statement that takes in an object as an argument and a div statement that takes in an object as an argument and a h1 statement that takes in an object as an argument and a Form statement that takes in an object as an argument and a Form.Group statement that takes in an object as an argument and a Form.Label statement that takes in an object as an argument and a Form.Control statement that takes in an object as an argument and a Form.Group statement that takes in an object as an argument and a Form.Label statement that takes in an object as an argument and a Form.Control statement that takes in an object as an argument and a Form.Group statement that takes in an object as an argument and a Form.Label statement that takes in an object as an argument and a Form.Control statement that takes in an object as an argument and a Form.Group statement that takes in an object as an argument and a Form.Label statement that takes in an object as an argument and a Form.Control statement that takes in an object as an argument and a Form.Group statement that takes in an object as an argument and a Form.Label statement that takes in an object as an argument and a Form.Control statement that takes in an object as an argument and a Form.Group statement that takes in an object as an argument and a Form.Label statement that takes in an object as an argument and a Form.Control statement that takes in an object as an argument and a Button statement that takes in an object as an argument
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>

      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}