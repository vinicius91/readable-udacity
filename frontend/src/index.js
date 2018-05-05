import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';
import './index.css';
import store from './store/store';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

// prettier-ignore

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
