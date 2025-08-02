import React, {useContext, useEffect, useRef, useState} from "react";
import {Button, Col, Container, FormCheck, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import {Link, Outlet, useLocation} from "react-router";
import PianoTrainerNavBar from "../structure/PianoTrainerNavBar.jsx";
import PianoTrainerContext from "../contexts/PianoTrainerContext.js";
import Staff from "../../music/Staff.jsx";
import PianoKey from "../../music/PianoKey.jsx";
// import * as Tone from "../../Tone.js";
import * as Tone from "tone";
import * as synth from "tone";
import VexFlow from "vexflow";
import SettingsSwitch from "../utility/SettingsSwitch.jsx";
import fire from '../../assets/fire.gif'

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
        {name: "C", realNote:true, noteValues: ["C"], accidental: false, keyboardKey:"A", tabIndex : "1"},
        {name: "D", realNote:true, noteValues: ["D"], accidental: false, keyboardKey:"S", tabIndex : "3"},
        {name: "E", realNote:true, noteValues: ["E"], accidental: false, keyboardKey:"D", tabIndex : "5"},
        {name: "F", realNote:true, noteValues: ["F"], accidental: false, keyboardKey:"F", tabIndex : "6"},
        {name: "G", realNote:true, noteValues: ["G"], accidental: false, keyboardKey:"G", tabIndex : "8"},
        {name: "A", realNote:true, noteValues: ["A"], accidental: false, keyboardKey:"H", tabIndex : "10"},
        {name: "B", realNote:true, noteValues: ["B"], accidental: false, keyboardKey:"J", tabIndex : "12"},
    ];
        const accidentalNotes = [
        {name: "W#/Tb", realNote:false, noteValues: ["C#","Db"], accidental: true, keyboardKey:"W", tabIndex:"-1"},
        {name: "C#/Db", realNote:true, noteValues: ["C#","Db"], accidental: true, keyboardKey:"W", tabIndex:"2"},
        {name: "D#/Eb", realNote:true, noteValues: ["D#","Eb"], accidental: true, keyboardKey:"E", tabIndex:"4"},
        {name: "E#/Fb", realNote:false, noteValues: ["",""], accidental: true, keyboardKey:"", tabIndex:"-1"},
        {name: "F#/Gb", realNote:true, noteValues: ["F#","Gb"], accidental: true, keyboardKey:"T", tabIndex:"7"},
        {name: "G#/Ab", realNote:true, noteValues: ["G#","Ab"], accidental: true, keyboardKey:"Y", tabIndex:"9"},
        {name: "A#/Bb", realNote:true, noteValues: ["A#", "Bb"], accidental: true, keyboardKey:"U", tabIndex:"11"},
        {name: "B#/Cb", realNote:false, noteValues: ["B#"], accidental: true, keyboardKey:"", tabIndex:"-1"},
    ];

    const [pianoNotes, setPianoNotes] = useState([])
    const [guessedNotes, setGuessedNotes] = useState([]);

    const [currentStreak, setCurrentStreak] = useState(0)
    const [maxStreak, setMaxStreak] = useState(0)

    const [cheatMode, setCheatMode] = useState(true)

    const [transitionTime, setTransitionTime] = useState(360);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const [graderMode, setGraderMode] = useState(true);

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


    const [showKeyboardKeysOnPianoKeys, setShowKeyboardKeysOnPianoKeys] = useState(true);
    const [showNoteNamesOnPianoKeys, setShowNoteNamesOnPianoKeys] = useState(true);
    const triggerRerender = () => forceUpdate(prev => prev + 1);

    let noteCount = guessedNotes.length;

    useEffect(() => {

    },[])

    setTimeout(() => {
        if(guessedNotes.length == 4) {
            setIsTransitioning(true)
            setGuessedNotes([])
            let score = document.getElementById("scoreContainer").children[0]
            // document.getElementById("scoreContainer").classList.add('blur');
           score.classList.add('blur');
            // document.getElementById("scoreContainer").style.animationDuration = (transitionTime/1000)+"s";
            score.style.animationDuration = (transitionTime/1000)+"s";
            if (checkPhrase()) {
                setCurrentStreak(currentStreak + 1);
                if(currentStreak>= maxStreak) {
                    setMaxStreak(currentStreak+1)
                }
                Tone.start();
                Tone.loaded().then(() => {
                    sampler.triggerAttackRelease("F7", "300");
                });
            }
            else {
                Tone.start();
                Tone.loaded().then(() => {
                    sampler.triggerAttackRelease("G7", "300");
                });

            }
            // setCurrentStreak(checkPhrase() ? currentStreak + 1 : 0);
            // setMaxStreak((checkPhrase() && currentStreak >= maxStreak) ? currentStreak + 1 : maxStreak )
            setTimeout(() => {
                // document.getElementById("scoreContainer").classList.remove('blur');
                score.classList.remove('blur');
                setIsTransitioning(false)

                randomizeNotes()
            },transitionTime)

        }
    }, 100)



    const synth = new Tone.Synth().toDestination();
    const sampler = new Tone.Sampler({
        urls: {
            // C4: "c3.wav"
            C5: "c4.wav",
            E8: "metronome.wav",
            F7: "correct.wav",
            G7: "error.wav"
            // C5: "c4.mp3"
        },
        release: 1,
        baseUrl: "audio/",
    })
    sampler.volume.value = -12;
    sampler.toDestination();

    const doPress = (note) => {
        console.log("Doing doPress")
        console.log(note)

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
            // if(guesses.length == 4) {
            //     checkPhrase();
            // }
        }
        setStaves([currentNotes])
    }

    // TODO:
    //
    // About Page


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

    function checkPhrase() {
        console.log("Current staves[0]");
        console.log(staves[0]);
        let currentNotes = staves[0];
        for(let note in currentNotes) {
            console.log("Current note: ")
            console.log(currentNotes[note]);
            if(currentNotes[note].correct === 'incorrect') {
                setCurrentStreak(0)
                return false;
            }
        }
        return true;
    }

    function randomizeNotes() {
        setStaves([staves[staves.length-1]])
        // console.log("Naturals:", includeNaturals)
        // console.log("Flats:", includeFlats)
        // console.log("Sharps:", includeSharps)

        let notePool = [];
        notePool = includeNaturals ? notePool.concat(naturals) : notePool;
        notePool = includeSharps ? notePool.concat(sharps) : notePool;
        notePool = includeFlats ? notePool.concat(flats) : notePool;
        // console.log("Note pool:")
        // console.log(notePool);

        let newNotes = [];
        for(let i = 0; i < 4; i++) {
            newNotes.push({noteName:notePool[Math.floor(Math.random()*notePool.length)]+"/4", correct:"neutral"})

        }
        console.log(newNotes)
        setStaves([newNotes]);
        setGuessedNotes([])
    }

    return <>
        <Container id={"homeContainer"}>
        <h1>Note Trainer</h1>
            <Staff staves={staves}></Staff>

            <Container className={"my-2 "} style={{textAlign: "center"}}>
                <Row className ={graderMode ? '' : "hidden"}>
                    <Col>(Grader mode enabled) Current Note: {staves[0][Math.min(guessedNotes.length, staves[0].length-1)].noteName.split('/')[0] }</Col>
                </Row>
                <Row>
                    <Col className={"streak-label"}>Current Streak: <span>{currentStreak}</span> {(currentStreak > 0)&&(currentStreak == maxStreak) ? <span><img
                        src={fire} alt="Hot Streak" style={{height:"20px",marginTop:"-.5rem"}}/></span> : ''}</Col>
                    <Col className={"streak-label"}>Max Streak: <span>{maxStreak}</span> {(currentStreak > 0) && (currentStreak == maxStreak) ? <span><img
                        src={fire} alt="Hot Streak" style={{height:"20px",marginTop:"-.5rem"}}/></span> : ''}</Col>
                </Row>
                <Row className={graderMode ? '' : 'hidden'}>
                    {/*{graderMode ? <Col>(Grader mode: on) Current Note: {staves[0][Math.min(guessedNotes.length, staves[0].length-1)].noteName.split('/')[0] }</Col> : ''}*/}
                </Row>
            </Container>
            <div id = "mainKeyboard">
                <div className={'main-keys natural-keys'}>
                        {naturalNotes.map((note)=> {
                            return <div key={note.name} className={'natural-note'}  tabIndex={note.tabIndex}>
                                <PianoKey
                                    noteValues={note.noteValues}
                                    accidental={note.accidental}
                                    guessedNotes={guessedNotes}
                                    doPress={doPress}
                                    playNoteAudio={playNoteAudio}
                                    isTransitioning={isTransitioning}
                                    keyboardKey={note.keyboardKey}
                                    showKeyboardKeysOnPianoKeys={showKeyboardKeysOnPianoKeys}
                                    showNoteNamesOnPianoKeys={showNoteNamesOnPianoKeys}
                                    tabIndex={note.tabIndex}
                                >{note.name}</PianoKey>
                            </div>
                            })
                        }
                </div>
                <div className={'main-keys accidental-keys'}>
                        {accidentalNotes.map((note)=> {
                            return <div
                                    key={note.name}
                                    className={note.realNote ? 'accidental-note' : 'accidental-note dummy-note'}
                                    tabIndex={note.tabIndex}
                            >
                                <PianoKey
                                    // tabindex={note.realNote ? 1 : -1}
                                    noteValues={note.noteValues}
                                    accidental={note.accidental}
                                    guessedNotes={guessedNotes}
                                    doPress={doPress}
                                    playNoteAudio={playNoteAudio}
                                    isTransitioning={isTransitioning}
                                    keyboardKey={note.keyboardKey}
                                    showKeyboardKeysOnPianoKeys={showKeyboardKeysOnPianoKeys}
                                    showNoteNamesOnPianoKeys={showNoteNamesOnPianoKeys}

                                >{note.name}</PianoKey>
                            </div>
                            })
                        }
                </div>
            </div>
                <Container className={"centered-container switches-container-parent"} style={{textAlign: "center"}}>
                    <Button title={"Reset Notes"} style={{marginBottom: "2rem"}}onClick={randomizeNotes}>Generate New Phrase</Button>
                    <Row>
                        {/*<Col>*/}
                        {/*    <Button className="mx-2" title={"Reset Notes"} onClick={randomizeNotes}>New Notes</Button>*/}
                        {/*    /!*<Button className="mx-2" title={"Toggle Keyboard Keys"} onClick={()=>setShowKeyboardKeysOnPianoKeys(!showKeyboardKeysOnPianoKeys)}>Toggle Keyboard Key Names</Button>*!/*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                    {/*<Row className={"switches-container-parent"}>*/}

                    <div className="switches-container">
                        <FormCheck
                            type="switch"
                            id={props.id}
                            // label={"Note Names"}
                            checked={showNoteNamesOnPianoKeys}
                            onChange={() => {setShowNoteNamesOnPianoKeys(!showNoteNamesOnPianoKeys)}}
                            aria-label={"Toggle note visibility for on-screen piano keyboard"}
                        /><span>Note Names</span>
                    </div>
                    <div className="switches-container">
                        <FormCheck
                            type="switch"
                            id={props.id}
                            // label={"Keyboard Keys"}
                            checked={showKeyboardKeysOnPianoKeys}
                            onChange={() => {setShowKeyboardKeysOnPianoKeys(!showKeyboardKeysOnPianoKeys)}}
                            aria-label={"Toggle visibility of corresponding keyboard keys for on-screen piano keyboard notes"}
                        /><kbd>Keyboard keys</kbd>
                    </div>
                    </Row>
                </Container>
            <Button variant={graderMode ? "secondary" : 'outline-secondary'} className="mx-2" title={"Toggle Grader Mode"} onClick={()=>{console.log("grader mode:",graderMode);setGraderMode(!graderMode)}}>Grader Mode</Button>
    </Container>



</>

    }

export default MainPage;