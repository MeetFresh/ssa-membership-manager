import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import './App.css';
import Dashboard from './Dashboard'

function App() {
    return (
      <div className="App">
        <Provider store={store}>
          <Dashboard />
        </Provider>
      </div>
    );
}

export default App;
