import React, {useContext, useEffect, useState} from "react";
import * as Tone from "tone";
import * as synth from "tone";
import PianoTrainerContext from "../components/contexts/PianoTrainerContext.js";
import {Button} from "react-bootstrap";

function PianoKey(props) {

    function handlePress(note, isPressed) {
        console.log(note)
        isPressed = true;
        setPressed("piano-key pressed");
        props.playNoteAudio(note.noteValues[0])
        props.doPress(note);
    }

    function handleEnter(note) {
        props.playNoteAudio(note.noteValues[0])
        props.doPress(note);
    }
    function handleUnpress(note, isPressed) {
        // console.log(note)
        isPressed = false;
        setPressed("piano-key")
    }

    const handleKeyDown = (event) => {
        if (event.key === keyboardKey) {
            // console.log('Key pressed:', event.key);
            // console.log("Keyboard key:", keyboardKey);
            handlePress(props, isPressed)
        }
    }
    const handleKeyUp = (event) => {
        if (event.key === keyboardKey) {
            // console.log('Key pressed:', event.key);
            // console.log("Keyboard key:", keyboardKey);
            handleUnpress(props, isPressed)
        }
    }

    useEffect(() => {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('keyup', handleKeyUp);
            return () => {
                console.log("Unmounting");
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('keyup', handleKeyUp);
            }
        },
            []);

    const [pressed, setPressed] = useState("piano-key")
    const accidental = props.accidental;
    const keyboardKey = props.keyboardKey.toLowerCase();

    let isPressed = false;
    let keyClassName = 'piano-key';

    return <>
        <button
            className={pressed}
            // TODO: Figure out best way to enable keyboard nav and use
            // onClick={(e)=> {
            //     handlePress(props, isPressed);
            //     setTimeout(()=>{handleUnpress(props, isPressed)}, 10)
            // }}
             onMouseDown={(e) => {
                handlePress(props, isPressed)
            }}
            onMouseUp={() => {
                handleUnpress(props, isPressed)
            }}
        >{props.showKeyboardKeysOnPianoKeys ?<kbd>{keyboardKey.toUpperCase()}</kbd> :
            <span>{props.children}</span>}</button>
    </>
}


export default PianoKey