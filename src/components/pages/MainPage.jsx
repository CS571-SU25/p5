import React, {useContext, useEffect, useRef, useState} from "react";
import {Button, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {Link, Outlet, useLocation} from "react-router";
import PianoTrainerNavBar from "../structure/PianoTrainerNavBar.jsx";
import PianoTrainerContext from "../contexts/PianoTrainerContext.js";
import Staff from "../../music/Staff.jsx";
import PianoKey from "../../music/PianoKey.jsx";
// import * as Tone from "../../Tone.js";
import * as Tone from "tone";
import * as synth from "tone";
import VexFlow from "vexflow";

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
    const naturals = ["C", "D", "E", "F", "G", "A", "B"]
    const sharps = ["C#", "D#", "F#", "G#", "A#"]
    const flats = ["Db", "Eb", "Gb", "Ab", "Bb"];

    // const allIncluded = [...naturals, ...sharps, ...flats]
    // console.log(allIncluded);

    const naturalNotes = [
        {name: "C", realNote:true, noteValues: ["C"], accidental: false, keyboardKey:"A"},
        {name: "D", realNote:true, noteValues: ["D"], accidental: false, keyboardKey:"S"},
        {name: "E", realNote:true, noteValues: ["E"], accidental: false, keyboardKey:"D"},
        {name: "F", realNote:true, noteValues: ["F"], accidental: false, keyboardKey:"F"},
        {name: "G", realNote:true, noteValues: ["G"], accidental: false, keyboardKey:"G"},
        {name: "A", realNote:true, noteValues: ["A"], accidental: false, keyboardKey:"H"},
        {name: "B", realNote:true, noteValues: ["B"], accidental: false, keyboardKey:"J"},
    ];
        const accidentalNotes = [
        {name: "C#/Db", realNote:true, noteValues: ["C#","Db"], accidental: true, keyboardKey:"W"},
        {name: "D#/Eb", realNote:true, noteValues: ["D#","Eb"], accidental: true, keyboardKey:"E"},
        {name: "E#/Fb", realNote:false, noteValues: ["",""], accidental: true, keyboardKey:""},
        {name: "F#/Gb", realNote:true, noteValues: ["F#","Gb"], accidental: true, keyboardKey:"T"},
        {name: "G#/Ab", realNote:true, noteValues: ["G#","Ab"], accidental: true, keyboardKey:"Y"},
        {name: "A#/Bb", realNote:true, noteValues: ["A#", "Bb"], accidental: true, keyboardKey:"U"},
        {name: "B#/Cb", realNote:false, noteValues: ["B#"], accidental: true, keyboardKey:""},
    ];

    const [pianoNotes, setPianoNotes] = useState([])
    const [guessedNotes, setGuessedNotes] = useState([]);

    // const [includeFlats, setIncludeFlats] = useState(true);
    // const [includeSharps, setIncludeSharps] = useState(true);
    // const [includeNaturals, setIncludeNaturals] = useState(true);

    const { includeFlats,
            setIncludeFlats,
            includeSharps,
            setIncludeSharps,
            includeNaturals,
            setIncludeNaturals
        } = useContext(PianoTrainerContext);

    const [staves, setStaves] = useState([
        [
            {noteName:"Eb/4", correct:"neutral"},
            {noteName:"F#/4", correct:"neutral"},
            {noteName:"G/4", correct:"neutral"},
            {noteName:"A/4", correct:"neutral"}
        ]
    ])

    const [, forceUpdate] = useState(0);
    const triggerRerender = () => forceUpdate(prev => prev + 1);

    const [showKeyboardKeysOnPianoKeys, setShowKeyboardKeysOnPianoKeys] = useState(true);
    let noteCount = guessedNotes.length;

    useEffect(() => {
    },[])


    const synth = new Tone.Synth().toDestination();

    const sampler = new Tone.Sampler({
        urls: {
            // C4: "c3.wav"
            C5: "c4.wav",
            E8: "metronome.wav"
            // C5: "c4.mp3"
        },
        release: 1,
        baseUrl: "/audio/",
    })
    sampler.volume.value = -12;
    sampler.toDestination();

    const resetStaff = () => {
        let notePool = [];
        console.log("Naturals:", includeNaturals)
        console.log("Flats:", includeFlats)
        console.log("Sharps:", includeSharps)
        notePool = includeNaturals ? [...notePool, naturals] : notePool;
        notePool = includeSharps ? [...notePool, sharps] : notePool;
        notePool = includeFlats ? [...notePool, flats] : notePool;
        console.log("Note pool:")
        console.log(notePool);

    }
    const doPress = (note) => {
        console.log("Doing doPress")
        console.log(note)
        // console.log("GuessCountRef:", guessCountRef.current)
        // let noteCount = guessCountRef.current;
        // if (noteCount >= 4) {
        //     noteCount = 0;
        // }
        // console.log("noteCount:",noteCount);

        console.log("GuessedNotes length: ",guessedNotes.length)

        let currentNotes = staves[0];
        let guesses = guessedNotes;
        if(guessedNotes.length === 4) {
            console.log("GuessNotes == 4")
            guesses = []
            setGuessedNotes(guesses);
        }
        else {
            let noteValues = note.noteValues;
            guesses.push(noteValues)
            let noteIndex = guesses.length-1;
            let noteName = currentNotes[noteIndex].noteName.split('/')[0];
            console.log("Notename:",noteName)
            let correct = noteValues.includes(noteName);
            currentNotes[noteIndex].correct = correct ? 'correct' : 'incorrect';
            console.log("Answer was",correct);
            console.log(currentNotes[noteIndex]);

            console.log("Guesses after pushing");
            console.log(guesses);
            setGuessedNotes(guesses);
        }
        setStaves([currentNotes])
    }

    // TODO:
    // MVP:
    // - Create state variables to track streaks
    // - Note reset and randomizer
    // - Note name reveal?
    //
    //
    //
    //
    //
    // Settings
    // - Color picker for correct/incorrect
    // - Bass vs Treble Clef
    //
    // About Page
    // -
    //
    //
    //


    const handleDoPress = (note) => {
        doPress(note)
    }

    function playNoteAudio(note) {
        console.log(note);
        Tone.start();
        const noteNow = synth.now();
        // synth.triggerAttackRelease(note+"4", "8n");
        Tone.loaded().then(() => {
            sampler.triggerAttackRelease([note+"4"], "8n");
        });
        // synth.triggerAttackRelease(noteCode, "8n", noteNow);

    }

    function checkNote(note) {
        console.log(note);
    }

    function randomizeNotes() {
        setStaves([staves[staves.length-1]])
        console.log("Naturals:", includeNaturals)
        console.log("Flats:", includeFlats)
        console.log("Sharps:", includeSharps)

        let notePool = [];
        notePool = includeNaturals ? notePool.concat(naturals) : notePool;
        notePool = includeSharps ? notePool.concat(sharps) : notePool;
        notePool = includeFlats ? notePool.concat(flats) : notePool;
        console.log("Note pool:")
        console.log(notePool);

        let newNotes = [];
        for(let i = 0; i < 4; i++) {
            newNotes.push({noteName:notePool[Math.floor(Math.random()*notePool.length)]+"/4", correct:"neutral"})

        }
        console.log(newNotes)
        setStaves([newNotes]);
    }

    return <>
        <Container id={"homeContainer"}>
        <h1>Note Trainer</h1>
            <PianoTrainerContext.Provider value={{allNotes, doPress}}>
            <Staff staves={staves}></Staff>
            <div id = "mainKeyboard">
                <div className={'main-keys natural-keys'}>
                        {naturalNotes.map((note)=> {
                            return <div key={note.name} className={'natural-note'}>
                                <PianoKey
                                    noteValues={note.noteValues}
                                    accidental={note.accidental}
                                    guessedNotes={guessedNotes}
                                    doPress={doPress}
                                    playNoteAudio={playNoteAudio}
                                    checkNote={checkNote}
                                    keyboardKey={note.keyboardKey}
                                    showKeyboardKeysOnPianoKeys={showKeyboardKeysOnPianoKeys}
                                >{note.name}</PianoKey>
                            </div>
                            })
                        }
                </div>
                <div className={'main-keys accidental-keys'}>
                        {accidentalNotes.map((note)=> {
                            return <div key={note.name} className={note.realNote ? 'accidental-note' : 'accidental-note dummy-note'}>
                                <PianoKey
                                    noteValues={note.noteValues}
                                    accidental={note.accidental}
                                    guessedNotes={guessedNotes}
                                    doPress={doPress}
                                    playNoteAudio={playNoteAudio}
                                    checkNote={checkNote}
                                    keyboardKey={note.keyboardKey}
                                    showKeyboardKeysOnPianoKeys={showKeyboardKeysOnPianoKeys}
                                >{note.name}</PianoKey>
                            </div>
                            })
                        }
                </div>
            </div>
                <Container>
                    <Row >
                        <Col>
                            <Button className="me-2" title={"Options"}>Options</Button>
                            <Button className="mx-2" title={"Reset"} onClick={randomizeNotes}>Reset</Button>
                            <Button className="mx-2" title={"Toggle Keyboard Keys"} onClick={()=>setShowKeyboardKeysOnPianoKeys(!showKeyboardKeysOnPianoKeys)}>Toggle Keyboard Key Names</Button>
                        </Col>
                    </Row>

                </Container>
                </PianoTrainerContext.Provider>
    </Container>



</>

    }

export default MainPage;