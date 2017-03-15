import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory , IndexRoute } from 'react-router';
import Navbar from './Navbar';
import ChefsBoard from './ChefsBoard';
import App from './App';
import './../SassStyle.css';



ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={Navbar}>
        <IndexRoute component={App} />
        <Route path='/ChefsBoard' component={ChefsBoard} />
    </Route>
  </Router>,
  document.getElementById('root')
);
