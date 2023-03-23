import Spinner from 'react-bootstrap/Spinner';//importing react-bootstrap components

export default function LoadingBox() {//LoadingBox is a function that takes in no arguments
  return (//returning the following jsx code to the caller of this function which is equal to the LoadingBox object's __proto__ property which is equal to the function's prototype property which is equal to an object that has a constructor property which is equal to the LoadingBox function
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}