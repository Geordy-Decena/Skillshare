import React, { useState, useEffect, Fragment } from 'react';
import '../css/match.css';
import user from '../imgs/user.png'
import Connection from '../components/connection'
import LearnList from './learnList'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Match(props) {

    const [isMatch, setMatch] = useState({
        user1: "",
        skill1: "",
        user2: "",
        skill2: ""
    })

    const [isSkill, setSkill] = useState({
        skill: ""
    })


    return (
        <Fragment>
            {console.log(props)}
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
                        <div className="username">{props.userInfo}</div>
                        <div className="skill">{props.userSkillLearn}</div>
                        <div className="skill">{props.userSkillTeach}</div>
                    </div>
                    <div className="users">
                        <div className="username">Name</div>
                        <div className="skill">Learn</div>
                        <div className="skill">Teach</div>
                    </div>
                    <div className="user2">
                        <div className="username">{props.matchedUserInfo}</div>
                        <div className="skill">{props.matchedUserSkillTeach}</div>
                        <div className="skill">{props.matchedUserSkillLearn}</div>
                    </div>
                </div>
                <div className="finish">
                    <Link to="/results">Finish Meet</Link>
                </div>
            </div>
        </Fragment >
    );
}

export default Match;