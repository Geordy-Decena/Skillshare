import React, { useState, useEffect, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login'
import Register from './components/register'
import Playground from './components/playground'
import Connect from './components/connection'
import Match from './components/match'

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/playground" component={Playground} />
          <Route exact path="/connect" component={Connect} />
          <Route exact path="/match" component={Match} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
