import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory , IndexRoute } from 'react-router';
import Navbar from './Navbar';
import App from './App';
import './index.css';



ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Navbar}>
        <IndexRoute component={App} />
    </Route>
  </Router>,
  document.getElementById('root')
);
