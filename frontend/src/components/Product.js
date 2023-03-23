import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {//Product is a function that takes in an object as an argument
  const { product } = props;//product is a variable that is equal to the product property of the props object

  const { state, dispatch: ctxDispatch } = useContext(Store);//state is a variable that is equal to the state property of the Store object and dispatch is a variable that is equal to the dispatch property of the Store object
  const {//cartItems is a variable that is equal to the cartItems property of the
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {//addToCartHandler is a function that takes in an object as an argument
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({//ctxDispatch is a function that takes in an object as an argument
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (//returning the following jsx code to the caller of this function which is equal to the Product object's __proto__ property which is equal to the function's prototype property which is equal to an object that has a constructor property which is equal to the Product function
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;