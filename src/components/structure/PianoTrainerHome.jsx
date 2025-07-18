import React, {useContext, useEffect, useState} from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {Link, Outlet, useLocation} from "react-router";
import PianoTrainerNavBar from "./PianoTrainerNavBar.jsx";
import PianoTrainerContext from "../contexts/PianoTrainerContext.js";

function PianoTrainerHome(props) {

    const [settings, setSettings] = useState({})

    console.log(props);
    return <Container id={"mainContainer"}>
        <PianoTrainerNavBar></PianoTrainerNavBar>
        {/*<h1>Piano Trainer</h1>*/}
        <div style={{ margin: "1rem" }}>
            <PianoTrainerContext.Provider value={props}>
                <Outlet />
            </PianoTrainerContext.Provider>
        </div>
    </Container>

    }

export default PianoTrainerHome;