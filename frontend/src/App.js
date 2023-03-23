import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'; // BrowserRouter is a component that wraps the entire app
import { toast, ToastContainer } from 'react-toastify';// ToastContainer is a component that wraps the entire app
import 'react-toastify/dist/ReactToastify.css';// ToastContainer is a component that wraps the entire app
import HomeScreen from './screens/HomeScreen';// HomeScreen is a component
import ProductScreen from './screens/ProductScreen';// ProductScreen is a component
import Navbar from 'react-bootstrap/Navbar';// Navbar is a component
import Badge from 'react-bootstrap/Badge';// Badge is a component
import Nav from 'react-bootstrap/Nav';// Nav is a component
import NavDropdown from 'react-bootstrap/NavDropdown';// NavDropdown is a component
import Container from 'react-bootstrap/Container';// Container is a component
import { LinkContainer } from 'react-router-bootstrap';// LinkContainer is a component
import { useContext, useEffect, useState } from 'react';// useContext, useEffect, useState are hooks
import { Store } from './Store';// Store is a component
import CartScreen from './screens/CartScreen';// CartScreen is a component
import SigninScreen from './screens/SigninScreen';// SigninScreen is a component
import ShippingAddressScreen from './screens/ShippingAddressScreen';// ShippingAddressScreen is a component
import SignupScreen from './screens/SignupScreen';// SignupScreen is a component
import PaymentMethodScreen from './screens/PaymentMethodScreen';// PaymentMethodScreen is a component
import PlaceOrderScreen from './screens/PlaceOrderScreen';// PlaceOrderScreen is a component
import OrderScreen from './screens/OrderScreen';// OrderScreen is a component
import OrderHistoryScreen from './screens/OrderHistoryScreen';// OrderHistoryScreen is a component
import ProfileScreen from './screens/ProfileScreen';// ProfileScreen is a component
import Button from 'react-bootstrap/Button';// Button is a component
import { getError } from './utils';// getError is a function
import axios from 'axios';// axios is a library
import SearchBox from './components/SearchBox';// SearchBox is a component
import SearchScreen from './screens/SearchScreen';// SearchScreen is a component

function App() {// App is a component
  const { state, dispatch: ctxDispatch } = useContext(Store);// state is a variable, dispatch is a function
  const { cart, userInfo } = state;

  const signoutHandler = () => {// signoutHandler is a function
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');// localStorage is a variable
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';// window is a variable
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {// useEffect is a hook
    const fetchCategories = async () => {// fetchCategories is a function
      try {// try is a statement that allows you to define a block of code to be tested for errors while it is being executed
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {// catch is a statement that allows you to define a block of code to be executed, if an error occurs in the try block
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter> 
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header> 
          <Navbar bg="dark" variant="dark" expand="lg"> 
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>

              <LinkContainer to="/">
                <Navbar.Brand>amazona</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
           <LinkContainer
                  to={{
                    pathname: "/search",
                    search: `?category=${category}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
              </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route path="/order/:id" element={<OrderScreen />}></Route>
              <Route
                path="/orderhistory"
                element={<OrderHistoryScreen />}
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;