import React, { useState, useEffect, Fragment } from 'react';
import '../css/connection.css';
import LearnList from './learnList'
import TeachList from './teachList'
import Match from './match'
import book from '../imgs/book.png'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Connection(props) {

    const [isLearn, setLearn] = useState(false)
    const [isTeach, setTeach] = useState(false)

    const [isSkill, setSkill] = useState({ skill: "" })
    const [isMatch, setMatch] = useState({ match: false })

    function matchPage() {
        setMatch({ match: true })
        const response = fetch('/computeMatch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(isSkill)
        }).then(res => res.text()).then(data => console.log(data))
        if (response.ok) {
            console.log("it worked")
        }
    }

    function setChange(data) {
        setSkill({ skill: data })
        console.log(isSkill)
        //props.bringLearnSkill(isSkill.data)
    }

    return (
        <Fragment>
            {(isMatch.match == false) && (
                <Fragment>
                    <div className="connection">
                        {isTeach == false && (
                            <div className="learnComp">
                                <LearnList handleClick={() => { setLearn(!isLearn) }} decideLearn={(data) => setChange(data)} />
                            </div>
                        )}
                        {isLearn == false && (
                            <div className="teachComp">
                                <TeachList handleClick={() => { setTeach(!isTeach) }} />
                            </div>
                        )}
                    </div>
                    {(isLearn == false && isTeach == false) && (
                        <div className="connectBtn" onClick={() => matchPage()}>
                            <h1>Connect!</h1>
                            <img src={book} className="bookConnection"></img>
                        </div>
                    )}
                </Fragment>
            )}
            {isMatch.match == true && (
                <Fragment>
                    <Match skill={isSkill.skill} />
                </Fragment>
            )}
        </Fragment>
    );
}

export default Connection;