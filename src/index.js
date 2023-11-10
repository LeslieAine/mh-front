import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import store from './redux/store'
import actionCable from 'actioncable';
import { ThemeProvider, StyleReset } from 'atomize';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

const CableApp = {}
CableApp.cable = actionCable.createConsumer('ws://localhost:3000/cable')

const theme = {
  colors: {
    primary: 'tomato',
    accent: 'yellow',
  },
};

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();
const engine = new Styletron();
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store={store}>
  //   <App />
  // </Provider>,
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <StyletronProvider value={engine} debug={debug} debugAfterHydration>
          <React.StrictMode>
            <StyleReset />
            <App />
          </React.StrictMode>
        </StyletronProvider>
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
