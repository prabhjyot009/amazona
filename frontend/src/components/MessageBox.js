import Alert from 'react-bootstrap/Alert';//importing react-bootstrap components

export default function MessageBox(props) {//MessageBox is a function that takes in an object as an argument
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;//returning the following jsx code to the caller of this function which is equal to the MessageBox object's __proto__ property which is equal to the function's prototype property which is equal to an object that has a constructor property which is equal to the MessageBox function
}