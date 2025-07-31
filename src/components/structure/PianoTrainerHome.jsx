import React, {useContext, useEffect, useState} from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {Link, Outlet, useLocation} from "react-router";
import PianoTrainerNavBar from "./PianoTrainerNavBar.jsx";
import PianoTrainerContext from "../contexts/PianoTrainerContext.js";

function PianoTrainerHome(props) {

    const [settings, setSettings] = useState({})
    const [includeFlats, setIncludeFlats] = useState(true);
    const [includeSharps, setIncludeSharps] = useState(true);
    const [includeNaturals, setIncludeNaturals] = useState(true);

    const toggleIncludeNaturals = () => setIncludeNaturals(prev => !prev);
    const toggleIncludeFlats = () => setIncludeFlats(prev => !prev);
    const toggleIncludeSharps = () => setIncludeSharps(prev => !prev);


    // console.log(props);
    return <Container id={"mainContainer"}>
        <PianoTrainerNavBar></PianoTrainerNavBar>
        {/*<h1>Piano Trainer</h1>*/}
        <div style={{ margin: "0rem" }}>
            <PianoTrainerContext.Provider value={{
                includeFlats,
                toggleIncludeFlats,
                includeSharps,
                toggleIncludeSharps,
                includeNaturals,
                toggleIncludeNaturals
            }}>
                <Outlet />
            </PianoTrainerContext.Provider>
        </div>
    </Container>

    }

export default PianoTrainerHome;