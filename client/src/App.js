import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import './App.css';
import Dashboard from './dashboard'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const promise = loadStripe("pk_test_51HKUBkCT0gTsZJ1O7Z5eOtt5HwxFFk1Mh6RDeVer8wxM5ioHdLohr4HovlxrdDW9SBZIQvSeOX3xbqnK3e4cOQVx00F3k0i43R");

function App() {
    return (
      <div className="App">
        {/* <Provider store={store}>
          <Dashboard />
        </Provider> */}
        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
      </div>
    );
}

export default App;
