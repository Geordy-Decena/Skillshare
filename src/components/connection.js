import React, { useState, useEffect, Fragment } from 'react';
import '../css/connection.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Connection(){

    function activateConnection(){

    }

    return(
        <Fragment>
            <div class='banner' >
                Logout
            </div>
        <div class = "connect" onClick={activateConnection}>
            <p>Connect</p>
        </div>
        </Fragment> 
    );
}

export default Connection;