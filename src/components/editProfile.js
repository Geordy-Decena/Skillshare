import React, { useState, useEffect, Fragment } from 'react';
import '../css/editProfile.css';
import book from '../imgs/book.png'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function EditProfile() {

    return (
        <Fragment>
            <div className="editProfile">
                <div className="editDiv">
                    <h1>Edit Profile</h1>
                    <h2>What I wish to learn</h2>
                    <div className="learnList">

                    </div>
                    <h3>What I can teach</h3>
                    <div className="teachList">

                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default EditProfile;