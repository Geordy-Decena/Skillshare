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
        rating: ""
    });

    function onChangeRating(e) {
        console.log(e.target.value)
        setRating({ ...isRating, rating: e.target.value })
    }

    function submitRate() {
        const response = fetch('/userRatings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(isRating)
        }).then(res => res.text()).then(data => console.log(data))
        if (response.ok) {
            console.log("it worked")
        }
    }

    function handleName(data) {
        var data2 = JSON.parse(data)
        setName({ ...isName, user: data2.match })
    }

    useEffect(() => {
        fetch('/userName').then(
            res => res.text()
        ).then(data => handleName(data));
    }, [])

    //split this string in half? these two names here


    return (
        <Fragment >
            <div className='results-page'>

                <div className='active-user'>show active user</div>
                <div className='title'>
                    How would you rate {isName.user}'s skills?
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