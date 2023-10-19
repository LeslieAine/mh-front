import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import store from './redux/store'
import actionCable from 'actioncable';

const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store={store}>
  //   <App />
  // </Provider>,
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App cable={CableApp.cable} />
      </React.StrictMode>
    </Provider>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
