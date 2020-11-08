import React, { useState, useEffect, Fragment } from 'react';
import '../css/match.css';
import user from '../imgs/user.png'

function Match() {

    const [isMatch, setMatch] = useState({
        user1: "",
        skill1: "",
        user2: "",
        skill2: ""
    })

    useEffect(() => {
        console.log("match")
        const response = fetch('/computeMatch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: "{\"title\":\"Read a boo\"}"
        }).then(res => res.text()).then(data => console.log(data))
        if (response.ok) {
            console.log("it worked")
        }
    }, [])

    return (
        <Fragment>
            <div className="matchDiv">
                <div className="match">
                    <h1>We found a match!</h1>
                    <div className="userP1">
                        <img src={user}></img>
                    </div>
                    <div className="userP2">
                        <img src={user}></img>
                    </div>
                </div>
                <div className="userSkillDiv">
                    <div className="user1">
                        <div className="username">John</div>
                        <div className="skill">C++</div>
                        <div className="skill">Calculus</div>
                    </div>
                    <div className="users">
                        <div className="username">Name</div>
                        <div className="skill">Learn</div>
                        <div className="skill">Teach</div>
                    </div>
                    <div className="user2">
                        <div className="username">Pete</div>
                        <div className="skill">Calculus</div>
                        <div className="skill">C++</div>
                    </div>
                </div>
                <div className="finish">
                    Finish Meet
                </div>
            </div>
        </Fragment >
    );
}

export default Match;