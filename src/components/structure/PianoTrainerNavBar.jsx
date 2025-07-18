import React, { useEffect, useState } from 'react';
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router";

import crest from '../../assets/uw-crest.svg'
import logo from '../../assets/bg.png'


function PianoTrainerNavBar() {
    return <>
        {/*<Navbar bg="dark" variant="dark">*/}
        <Navbar>
        <Container>
            <Navbar.Brand as={Link} to="/">
                {/*<img src='../../assets/bg.png'></img>*/}
                <img src={logo}
                     width="30"
                     height="30"
                ></img>
                Piano Trainer
            </Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="settings">Settings</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
        </>

}

export default PianoTrainerNavBar