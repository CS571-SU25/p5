import React, {useContext, useState} from 'react';
import {Col, Container, FormCheck, Row} from "react-bootstrap";
import SettingsSwitch from "../utility/SettingsSwitch.jsx";
import PianoTrainerContext from "../contexts/PianoTrainerContext.js";

// TODO: Finalize settings including:
// Octaves
// Sharps/flats/naturals
// Bass/Treble clef

function Settings(props) {


    const { includeFlats,
        toggleIncludeFlats,
        includeSharps,
        toggleIncludeSharps,
        includeNaturals,
        toggleIncludeNaturals
    } = useContext(PianoTrainerContext);

    return <div >
        <h1>Settings</h1>
        <Container id={"settings-container"} className={"container-lg"}>
            <Row><Col className={"settings-label"}>When generating new notes, include the following note types:</Col></Row>
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
            {(!includeFlats && !includeSharps && !includeNaturals) ? <Row style={{color:"hsl(0, 100%, 50%)", fontWeight: 700, fontSize: "1.25rem"}}>At least 1 note type must be selected</Row>: ''}
        </Container>
    </div>

}

export default Settings