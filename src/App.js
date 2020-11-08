import React, { useState, useEffect, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login'
import Register from './components/register'
import Connection from './components/connection'
import Results from './components/results'

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/results" component={Results} />
          <Route exact path="/connection" component={Connection} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
