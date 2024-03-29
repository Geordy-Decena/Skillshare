import React, { useState, useEffect, Fragment } from 'react';
import '../css/homepage.css';
import book from '../imgs/book.png'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Register() {

    const [isUser, setUser] = useState({
        email: "",
        password: ""
    });

    const [isAccess, setAccess] = useState({
        access: false
    })

    function onChangeEmail(e) {
        setUser({ ...isUser, email: e.target.value })
    }

    function onChangePass(e) {
        setUser({ ...isUser, password: e.target.value })
    }

    function submit() {
        const response = fetch('/registerData', {
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
                    <h1>Share</h1>
                    <h2>Email</h2>
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
                <div className="submit" onClick={() => submit()}>
                    Register
                </div>
                <div className="register">
                    <Link to="/">Already have an account? Login here!</Link>
                </div>
            </div>
        </Fragment>
    );
}

export default Register;
