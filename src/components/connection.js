import React, { useState, useEffect, Fragment } from 'react';
import '../css/connection.css';
import LearnList from './learnList'
import TeachList from './teachList'
import book from '../imgs/book.png'

function Connection() {

    const [isLearn, setLearn] = useState(false)
    const [isTeach, setTeach] = useState(false)

    return (
        <Fragment>
            <div className="connection">
                {isTeach == false && (
                    <div className="learnComp">
                        <LearnList handleClick={() => { setLearn(!isLearn) }} />
                    </div>
                )}
                {isLearn == false && (
                    <div className="teachComp">
                        <TeachList handleClick={() => { setTeach(!isTeach) }} />
                    </div>
                )}
            </div>
            {(isLearn == false && isTeach == false) && (
                <div className="connectBtn">
                    <h1>Connect!</h1>
                    <img src={book} className="bookConnection"></img>
                </div>
            )}
        </Fragment>
    );
}

export default Connection;