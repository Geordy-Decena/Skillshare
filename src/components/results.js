import React, { useState, useEffect, Fragment } from 'react';
import '../css/results.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Results() {

    function sendResult(e){
        const response = fetch('/userRating', {  //need to get route from Ben
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(e.target.value, ),   //have to give you the skill
        })
        if (response.ok) {
            console.log("it worked")
        }
        console.log(e.target.value);
    }

    function getName(){
        fetch('/userName')
        .then(response => response.json()).then(data => {
            data.text
        })  //insert port from Ben
        const name = response.json();    //
        return name;
    }

    return (
        <Fragment >
            <div clasName='results-page'>
                <div>{name.map(info => <Text>{info}</Text>)}
                </div>
            <div>
                How would would you rate
            </div>

            <View>
                {name.map(info => <Text>{info}</Text>)}
            </View>

            <div>skills?</div>

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