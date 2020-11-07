import React, { useState, useEffect, Fragment } from 'react';
import '../css/homepage.css';
import book from '../imgs/book.png'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Login() {

    const [isUser, setUser] = useState({
        email: "",
        password: ""
    });

    function onChangeEmail(e) {
        setUser({ ...isUser, email: e.target.value })
    }

    function onChangePass(e) {
        setUser({ ...isUser, password: e.target.value })
    }

    function submitd() {
        const response = fetch('/loginData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(isUser)
        }).then(res => res.text()).then(data => console.log(data))
        if (response.ok) {
            console.log("it worked")
        }
    }

    return (
        <Fragment>
            <div className="homepageDiv">
                <div className="form">
                    <h1>SkillShare</h1>
                    <h2>Username</h2>
                    <div className="inputDiv">
                        <input className="input" onChange={(e) => onChangeEmail(e)}></input>
                    </div>
                    <h2>Password</h2>
                    <div className="inputDiv">
                        <input className="input" onChange={(e) => onChangePass(e)}></input>
                    </div>
                </div>
                <div className="bookImgDiv">
                    <img src={book} className="bookImg"></img>
                </div>
                <div className="submit" onClick={() => submitd()}>
                    Login
                </div>
                <div className="register" >
                    <Link to="/register">Don't have an account? Register Here?</Link>
                </div>
            </div>
        </Fragment>
    );
}

export default Login;