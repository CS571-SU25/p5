
import React from "react";
// import {Vex} from "../vexflow.js";
import { Score } from './Score.jsx'


function Staff(props) {

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

    return <>
        <Score
            // staves={[
            //     // ['g3'],
            //     // ['g3', 'd4', 'e4', 'd4', 'e4'],
            //     // ['a4', 'd4', 'e4', 'd4'],
            //     ['a4', 'a4', 'b4', 'a4'],
            //     // ['d4', 'e4', ['g3', 2]],
            // ]}
            staves={props.staves}
        />
    </>
}
export default Staff;