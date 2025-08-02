import React, {useContext, useState} from 'react';
import {FormCheck} from "react-bootstrap";
import PianoTrainerContext from "../contexts/PianoTrainerContext.js";

// TODO: Finalize settings including:
// Octaves
// Sharps/flats/naturals
// Bass/Treble clef


function SettingsSwitch(props) {
    const { includeFlats,
        setIncludeFlats,
        includeSharps,
        setIncludeSharps,
        includeNaturals,
        setIncludeNaturals
    } = useContext(PianoTrainerContext);
    const toggleValue = (value) => {
        // console.log("Toggling:");
        console.log(props.currentValue);
        return props.toggle();
    }

    return <FormCheck // prettier-ignore
        type="switch"
        id={props.id}
        label={props.displayLabel}
        checked={props.currentValue}
        onChange={()=>{toggleValue(props.currentValue)}}
    />

}

export default SettingsSwitch