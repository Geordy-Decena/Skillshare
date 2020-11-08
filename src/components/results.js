import React, { useState, useEffect, Fragment } from 'react';
import '../css/results.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Results() {

    const [isName, setName] = useState({text: ""});
    //console.log(isName.text)

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
        ).then(data => {
            console.log(data.text);
            //setName(data.text);
            //split this string in half? these two names here
        });   
    }, [])

    return (
        <Fragment >
            <div clasName='results-page'>
            <div className='title'>
                {/* How would would you rate {isName.text} skills? */}
                </div>

            <form class='contain-list'>
                <input type="text" pattern="[0-9]*" onChange={(e)=>sendResult(e)} />
                {/* <input type="checkbox" onClick={() => sendResult()}></input>
                <p>Basic</p>

                <input type="checkbox" onClick={() => sendResult()}></input>
                <p>Intermediate</p>

                <input type="checkbox" onClick={() => sendResult()}></input>
                <p>Advance</p>

                <input type="checkbox" />
                <p>Expert</p> */}
            </form>

            <div className='connect-more'>
                <Link to="/components/connection">Connect more</Link>
            </div>
            </div>
        </Fragment>
    )
}

export default Results;