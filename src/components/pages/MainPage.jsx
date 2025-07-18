import React, {useContext, useEffect, useState} from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {Link, Outlet, useLocation} from "react-router";
import PianoTrainerNavBar from "../structure/PianoTrainerNavBar.jsx";
import PianoTrainerContext from "../contexts/PianoTrainerContext.js";
import Staff from "../../music/Staff.jsx";
import PianoKey from "../../music/PianoKey.jsx";

function MainPage(props) {

    const allNotes = [
        "C",
        "C#/Db",
        "D",
        "D#/Eb",
        "E",
        "F",
        "F#/Gb",
        "G",
        "G#/Ab",
        "A",
        "A#/Bb",
        "B",
    ];
    const [pianoNotes, setPianoNotes] = useState([])

    useEffect(() => {
        setPianoNotes([
            {
                name: "C",
                octave : 3,
                accidental : "natural"
            }
        ])
    },[])
    console.log(props);
    return <>
        <Container>
        <h1>Note Trainer</h1>
        <Staff></Staff>
        <div id = "mainKeyboard">
            {}
        </div>
    </Container>
        <Container>
            <PianoKey></PianoKey>
        </Container>
    </>

    }

export default MainPage;