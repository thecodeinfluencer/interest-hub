import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { green } from '@material-ui/core/colors';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import thunk from 'redux-thunk';

import rootReducer from './store/reducers/rootReducer.js';
import App from './App';
import './styles/index.css';
import './styles/boot.css';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import colors from './constants/Colors.jsx';

//Use Local Storage Persistance
const saveToLocalStorage = state => {
  try {
    let stringState = JSON.stringify(state);
    localStorage.setItem('@state', stringState);
  } catch (err) {
    console.log(err);
  }
};

const loadFromLocalStorage = () => {
  try {
    let stringState = localStorage.getItem('@state');
    if (stringState === null) return undefined;
    return JSON.parse(stringState);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const persistedStorage = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedStorage,
  applyMiddleware(thunk)
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.theme,
    },
    secondary: {
      main: green[500],
    },
  },
});

store.subscribe(() => saveToLocalStorage(store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
