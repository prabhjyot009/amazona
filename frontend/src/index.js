// This is the entry point for the React app and is the first file that is executed when the app is run. It is responsible for rendering the App component to the DOM. It also imports the reportWebVitals function which is used to measure the performance of the app. The reportWebVitals function is called at the end of the file. The App component is imported from the App.js file in the same folder. The App component is wrapped in the PayPalScriptProvider component from the react-paypal-js library. This component is used to load the PayPal JavaScript SDK. The deferLoading prop is set to true so that the PayPal JavaScript SDK is not loaded until the PayPal buttons are rendered. The PayPalScriptProvider component is wrapped in the HelmetProvider component from the react-helmet-async library. This component is used to manage the document head. The StoreProvider component from the Store.js file in the same folder is used to provide the Redux store to the app. The StoreProvider component is wrapped in the HelmetProvider component. The HelmetProvider component is wrapped in the PayPalScriptProvider component. The PayPalScriptProvider component is wrapped in the StoreProvider component. The StoreProvider component is wrapped in the React.StrictMode component. The React.StrictMode component is wrapped in the ReactDOM.render function. The ReactDOM.render function is used to render the App component to the DOM. The App component is rendered to the element with the id of root. The reportWebVitals function is called at the end of the file.
import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StoreProvider } from './Store';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <PayPalScriptProvider deferLoading={true}>
          <App />
        </PayPalScriptProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();