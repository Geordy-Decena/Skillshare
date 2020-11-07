import React, { useState, useEffect, Fragment } from 'react';
import '../css/match.css';
import user from '../imgs/user.png'

function Match() {

    return (
        <Fragment>
            <div className="matchDiv">
                <div className="match">
                    <h1>We found a match!</h1>
                    <div className="user1">
                        <img src={user}></img>
                    </div>
                    <div className="user2">
                        <img src={user}></img>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Match;