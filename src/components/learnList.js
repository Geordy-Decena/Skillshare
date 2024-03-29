import React, { useState, useEffect, Fragment } from 'react';
import '../css/learnList.css';
import book from '../imgs/book.png'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function LearnList(props) {

    const [isUserList, setUserList] = useState({
        list: [],
        rate: []
    })

    const [isList, setList] = useState({
        active: false,
        list: ["Advanced Functions", "Calculus", "Linear Systems", "Geography", "History", "Chemistry", "Physics", "Biology", "Python", "JavaScript", "C++", "MySQL", "NoSQL", "Machine Learning", "Artificial Intelligence", "OOP", "React", "Angular", "HTML", "CSS", "MATLAB", "EXCEL"]
    })

    const [isNewSkill, setNewSkill] = useState({
        skill: "",
        level: "",
    })

    useEffect(() => {
        fetch('/sendLearnData').then(
            res => res.text()
        ).then(data => prepareData(data));
    }, [])

    function prepareData(data) {
        var data2 = JSON.parse(data)
        setUserList({ ...isUserList, list: data2.skills, rate: data2.levels })
    }

    function submitSkill() {
        if (isNewSkill.skill != "") {
            listActivate()
            console.log(isNewSkill)
            var query = [`${isNewSkill.skill}`]
            var query2 = [`${isNewSkill.level}`]
            setUserList({ ...isUserList, list: isUserList.list.concat(query), rate: isUserList.rate.concat(query2) })
            console.log(isUserList)
        }
        else {
            setNewSkill({
                skill: "",
                level: 1
            })
        }
        const response = fetch('/userDataLearn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(isNewSkill)
        }).then(res => res.text()).then(data => console.log(data))
        if (response.ok) {
            console.log("it worked")
        }
    }



    function listActivate() {
        props.handleClick()
        setList({ ...isList, active: !isList.active })
    }

    function selectRadioButton(e) {
        setNewSkill({ ...isNewSkill, skill: e.target.value })
        console.log(isNewSkill.skill)
    }

    function onChangeValue(e) {
        setNewSkill({ ...isNewSkill, level: e.target.value })
        console.log(isNewSkill.level)
    }

    function selectRadioButtonLearn(e) {
        props.decideLearn(e.target.value)
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
                        <div className="skillLearn" onChange={(e) => selectRadioButtonLearn(e)}>
                            <h1>{skill}</h1>
                            <input type="radio" value={skill} name="skill" />
                        </div>
                    )
                })}
                <div className="rateLearnDiv">
                    {isUserList.rate.map((rate) => {
                        return (
                            <div className="rateLearn">
                                <h1>{rate}</h1>
                            </div>
                        )
                    })}
                </div>
                <div className="addSkillBtn" onClick={() => listActivate()}>Add Skill</div>
            </div>
            {(isList.active == true) && (
                <Fragment>
                    <div className="listOfSkillsDiv">
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
                                <input className="inputSkill" type="number" max="10" min="1" onChange={(e) => onChangeValue(e)}></input>
                            </div>
                            <div className="addSkill" onClick={() => submitSkill()}>Add Skill</div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment >
    );
}

export default LearnList;