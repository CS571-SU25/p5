import React, { useEffect, useState } from 'react';
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import {Link, NavLink} from "react-router";

// import logo from '../../assets/bg.png'
import logo from '../../assets/logo.png'


function PianoTrainerNavBar() {

    return <>
        <Navbar id={"mainNav"}>
            <Navbar.Brand as={Link} to="/">
                <img src={logo}
                     width="48"
                     height="24"
                     alt={"Small stylized piano logo. Simple and cute."}
                />
                {/*<span>Piano Trainer</span>*/}
            </Navbar.Brand>
            <ul id={"main-nav-list"}>
                <li className={"main-nav-list-item"}><NavLink   to="/">Home</NavLink></li>
                <li className={"main-nav-list-item"}><NavLink  to="settings">Settings</NavLink></li>
                <li className={"main-nav-list-item"}><NavLink to="about">About</NavLink></li>
            </ul>
    </Navbar>
        </>

}

export default PianoTrainerNavBar