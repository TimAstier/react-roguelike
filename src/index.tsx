import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { App } from './App';
import rootReducer from './rootReducer';

ReactDOM.render(
  <Provider store={createStore(rootReducer)}>
    <App />
  </Provider>,
  document.getElementById('root')
);
