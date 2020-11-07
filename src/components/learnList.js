import React, { useState, useEffect, Fragment } from 'react';
import '../css/learnList.css';
import book from '../imgs/book.png'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function LearnList() {

    const [isUserList, setUserList] = useState({
        list: [["Basketball", 3], ["Soccer", 3], ["Hockey", 3], ["Baseball", 3]]
    })

    const [isList, setList] = useState({
        active: false,
        list: ["Advanced Functions", "Calculus", "Linear Systems", "Geography", "History", "Chemistry", "Physics", "Biology", "Python", "JavaScript", "C++", "MySQL", "NoSQL", "Machine Learning", "Artificial Intelligence", "OOP", "React", "Angular", "HTML", "CSS", "MATLAB", "EXCEL"]
    })

    const [isNewSkill, setNewSkill] = useState({
        skill: ""
    })

    function listActivate() {
        setList({ ...isList, active: !isList.active })
    }

    function selectRadioButton(e) {
        setNewSkill({ ...isNewSkill, skill: e.target.value })
        console.log(isNewSkill.skill)
    }

    return (
        <Fragment>
            <div className="learnList">
                <h1 className="learnH1">What I want to learn</h1>
                <div className="skillTitle">
                    <h1>Skill</h1>
                    <h2>Rating</h2>
                </div>
                {isUserList.list.map((skill) => {
                    return (
                        <div className="skill">
                            <h1>{skill[0]}</h1>
                            <h2>{skill[1]}</h2>
                        </div>
                    )
                })}
                <div className="addSkill" onClick={() => listActivate()}>Add Skill</div>
            </div>
            {(isList.active == true) && (
                <Fragment>
                    <div className="listOfSkills">
                        {isList.list.map((skill) => {
                            return (
                                <div className="availableSkills" onChange={(e) => selectRadioButton(e)}>
                                    <h1>{skill}
                                    </h1>
                                    <input type="radio" value={skill} name="skill" />
                                </div>
                            )
                        })}
                        <div className="exit" onClick={() => listActivate()}>x</div>
                        <div className="inputSkillDiv">
                            <h1>Set Skill Level</h1>
                            <input className="inputSkill" type="number" max="10" min="1"></input>
                        </div>
                        <div className="addSkill">Add Skill</div>
                    </div>
                </Fragment>
            )}
        </Fragment >
    );
}

export default LearnList;