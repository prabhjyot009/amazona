import React from 'react';//importing react
import Row from 'react-bootstrap/Row';//importing react-bootstrap components
import Col from 'react-bootstrap/Col';//importing react-bootstrap components

export default function CheckoutSteps(props) {//CheckoutSteps is a function that takes in props as an argument
  return (//returning the following jsx code to the caller of this function which is equal to the CheckoutSteps object's __proto__ property which is equal to the function's prototype property which is equal to an object that has a constructor property which is equal to the CheckoutSteps function
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>Sign-In</Col>
      <Col className={props.step2 ? 'active' : ''}>Shipping</Col>
      <Col className={props.step3 ? 'active' : ''}>Payment</Col>
      <Col className={props.step4 ? 'active' : ''}>Place Order</Col>
    </Row>
  );
}