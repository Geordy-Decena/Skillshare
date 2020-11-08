import React, { useState, useEffect, Fragment } from 'react';
import '../css/results.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Results() {

    const [isName, setName] = useState(
        {
            user: "",
            macth: ""
        });

    const [isRating, setRating] = useState({
        rating: "",
        skill: ""
    });

    function onChangeRating(e) {
        setRating({ ...isRating, rating: e.target.value })
    }

    function submitRate(e) {
        const response = fetch('/userRatings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(isRating)
        })
        if (response.ok) {
            console.log("pass ratings worked")
        }
        console.log(isRating);
    }

    // function handleName(data) {
    //     var data2 = JSON.parse(data)
    //     setName({ ...isName, user: data2.name })
    // }

    useEffect(() => {
        fetch('/userName').then(
            res => res.text()
        ).then(data => console.log(data));
    }, [])

    //split this string in half? these two names here


    return (
        <Fragment >
            <div className='results-page'>

                <div className='active-user'>show active user</div>
                <div className='title'>
                    How would you rate - skills?
                </div>

                <div className='contain-input' onChange={(e) => onChangeRating(e)}>
                    <input type="text" ></input>
                </div>

                <div className="submitSkillLevel" onClick={() => submitRate()}>
                    <h1>Submit</h1>
                </div>
                <Link to="/connect">
                    <div className='connect-more'>
                        <h1>Connect more</h1>
                    </div>
                </Link>
            </div>
        </Fragment>
    )
}

export default Results;