import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';

import App from './pages/App';

import store from './store/store';
import '@static/style/reset.css';
import s from './index.less';

ReactDOM.render(
  <Provider store={store}>
		<BrowserRouter>
			<div className={s.aa}>
        <App />
      </div>
		</BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
