import React, { useState, useEffect, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/login'
import Register from './components/register'
import Connection from './components/connection'
import EditProfile from './components/editProfile'


function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/connection" component={Connection} />
          <Route exact path="/editProfile" component={EditProfile} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
