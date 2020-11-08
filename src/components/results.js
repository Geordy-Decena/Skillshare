import React, { useState, useEffect, Fragment } from 'react';
import '../css/results.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Results() {

    const [isName, setName] = useState({text: ""});

    function sendResult(e){
        const response = fetch('/userRating', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(e.target.value)  
        })
        if (response.ok) {
            console.log("it worked")
        }
        console.log(e.target.value);
    }
   
    useEffect(() => {
        fetch('/userName').then(
            res => res.text()
        ).then(data => console.log(data));
    }, [])
    //setName(data.text);
    //split this string in half? these two names here


    return (
        <Fragment >
            <div className='results-page'>

            <div className='active-user'>show active user</div>
            <div className='title'>
                How would you rate - skills? 
                </div>

            <div className='contain-input'>
                <input type="text" onChange={(e)=>sendResult(e)} />
            </div>
            
            <Link to="/connection">
            <div className='connect-more'>
                <h1>Connect more</h1>
            </div>
            </Link>
            </div>
        </Fragment>
    )
}

export default Results;