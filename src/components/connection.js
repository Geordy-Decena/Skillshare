import React, { useState, useEffect, Fragment } from 'react';
import '../css/connection.css';
import LearnList from './learnList'
import TeachList from './teachList'
import Match from './match'
import book from '../imgs/book.png'
import loading from '../imgs/loading.png'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Transition } from 'react-transition-group'


function Connection(props) {

    const [isLearn, setLearn] = useState(false)
    const [isTeach, setTeach] = useState(false)

    const [isSkill, setSkill] = useState({ skill: "" })
    const [isMatch, setMatch] = useState({ match: false })

    const [isInfo, setInfo] = useState({
        userInfo: "",
        userSkillLearn: "",
        userSkillTeach: "",
        matchedUserInfo: "",
        matchedUserSkillLearn: "",
        matchedUserSkillTeach: "",
    })

    function matchPage() {
        setMatch({ match: true })
        const response = fetch('/computeMatch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(isSkill)
        }).then(res => res.text()).then(data => { setInfoFunc(data); console.log(data) })
        if (response.ok) {
            console.log("it worked")
        }
    }

    function setInfoFunc(data) {
        var data2 = JSON.parse(data)
        setInfo({ userInfo: data2.user, userSkillLearn: isSkill.skill, userSkillTeach: data2.matchedUserSkill, matchedUserInfo: data2.matchedUser, matchedUserSkillLearn: isSkill.skill, matchedUserSkillTeach: data2.matchedUserSkill })
    }

    function setChange(data) {
        setSkill({ skill: data })
        //props.bringLearnSkill(isSkill.data)
    }

    return (
        <Fragment>
            {isMatch.match == true && (
                <Transition
                    timeout={3000}
                    in={true}
                    appear
                >{(status) => (
                    <Fragment>
                        <div className={`loadingDiv loadingDiv-${status}`}>
                            <div className={`loading loading-${status}`}>
                                <img src={loading}></img>
                            </div>
                        </div>
                    </Fragment>
                )}
                </Transition>
            )}
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
                    <Match userInfo={isInfo.userInfo} userSkillLearn={isInfo.userSkillLearn} userSkillTeach={isInfo.userSkillTeach} matchedUserInfo={isInfo.matchedUserInfo} matchedUserSkillLearn={isInfo.matchedUserSkillLearn} matchedUserSkillTeach={isInfo.matchedUserSkillTeach} />
                </Fragment>
            )}
        </Fragment>
    );
}

export default Connection;