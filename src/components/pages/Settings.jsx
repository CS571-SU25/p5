import React, {useContext, useState} from 'react';
import {Col, Container, FormCheck, Row} from "react-bootstrap";
import SettingsSwitch from "../utility/SettingsSwitch.jsx";
import PianoTrainerContext from "../contexts/PianoTrainerContext.js";
import {HexColorPicker} from "react-colorful";

// TODO: Finalize settings including:
// Octaves
// Bass/Treble clef

function Settings(props) {


    const { includeFlats,
        toggleIncludeFlats,
        includeSharps,
        toggleIncludeSharps,
        includeNaturals,
        toggleIncludeNaturals,
        correctColor,
        setCorrectColor,
        incorrectColor,
        setIncorrectColor,
        neutralColor,
        setNeutralColor
    } = useContext(PianoTrainerContext);

    console.log(correctColor);

    return <div id={"settings-root-container"} className={"screen-root-container"}>
        <h1>Settings</h1>
        <Container id={"settings-container"} className={"container-lg"}>
            <h2>Note Types</h2>
            <div>Choose which types of notes new phrases should include:</div>
            <Row className={"mx-2"}>

            </Row>
            <Row className={'settings-input'}>
                <SettingsSwitch
                    id={"include-naturals"}
                    currentValue={includeNaturals}
                    toggle={toggleIncludeNaturals}
                    displayLabel={"Naturals (♮)"}
                />
            </Row>
            <Row className={'settings-input'}>
                <SettingsSwitch
                    id={"include-flats"}
                    currentValue={includeFlats}
                    toggle={toggleIncludeFlats}
                    displayLabel={"Flats (♭)"}
                />
            </Row>
            <Row className={'settings-input'}>
                <SettingsSwitch
                    id={"include-sharps"}
                    currentValue={includeSharps}
                    toggle={toggleIncludeSharps}
                    displayLabel={"Sharps (♯)"}
                />
            </Row>
            {(!includeFlats && !includeSharps && !includeNaturals) ? <Row style={{color:"hsl(0, 100%, 50%)", fontWeight: 700, fontSize: "1.25rem", padding: "1rem"}}>At least 1 note type must be selected</Row>: ''}
            <h2>Customize Note Colors</h2>
            <Row className={"mt-4"}>
                <Col><p>Correct Notes: <span style={{fontSize: "3rem", color:correctColor}}>♩</span></p>
                    <HexColorPicker color={correctColor} onChange={setCorrectColor} />
                </Col>
                <Col><p>Incorrect Notes: <span style={{fontSize: "3rem", color:incorrectColor}}>♩</span></p>
                    <HexColorPicker color={incorrectColor} onChange={setIncorrectColor} />
                </Col>
            </Row>
        </Container>
    </div>

}

export default Settings