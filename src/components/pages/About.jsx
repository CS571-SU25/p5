import React, {useState} from  'react';
import {Card, Container} from "react-bootstrap";

import pianoImage from '../../assets/piano1.jpg'


function About(props) {
    return <div className={"screen-root-container"}>
        <h1>About This Project</h1>
        <Card id={"about-purpose"} className={"about-card"}>
            <h2>Purpose</h2>
            <p>The purpose of this tool is to provide a simple way for aspiring music-readers to practice basic note recognition. </p>
            <p>While a fairly extensive ecosystem already exists for this type of tool, a survey of the existing options found that current offerings tended to include numerous features outside the main action of the user attemping to correctly identify a note presented on the screen, such as drills, timed sessions, gamification elements like trophies and badges.  </p>
            <p>The intent with this app was to pare the functionality back to the bare essentials: present short phrases of music notes and allow the user to guess them either by directly tapping/clicking an on-screen keyboard or using their computer keyboard to activate notes.</p>

        </Card>
        <Card id={"about-howitworks"} className={"about-card"}>
            <h2>How It Works</h2>
            <p>When the user guesses a note, the chosen note plays, and the on-screen note changes color based on whether their guess was correct. If the user correctly identifies all notes in the phrase, it starts a "hot streak" that continues as long as the user continues to complete correct phrases and resets to zero if the user misses a note.  </p>
            <p>The user can customize the experience in a small number of ways:</p>
            <ul>
                <li>Choose the colors that correct and incorrect guesses appear on screen</li>
                <li>What types of notes are included in the generated phrases (e.g. sharp, flat, natural)</li>
                <li>Whether the note names display on the on-screen piano keyboard</li>
                <li>Whether the corresponding computer keyboard keys display on the on-screen piano keyboard</li>
                <li>A "grader mode" to enable users who can't read music to explore and assess the functionality.</li>
            </ul>
        </Card>
        <Card id={"about-purpose"}  className={"about-card"}>
            <h2>Additional Information</h2>

            <h3>Successes, Challenges, and Future Opportunities</h3>
            <p>Overall, the project was mostly a success. Playback and note-recognition was accomplished reasonably well, and the main functionality is simple but effective.</p>
            <p>The initial design featured more customizable note generation, such as choosing which octaves would be included, bass as well as treble clef, but time constraints forced a narrowing of project scope down to the basic functionality seen in the current app. </p>
            <p>Other ideas included incorporating the MIDI library <a href="https://webmidijs.org/">WebMIDI.js</a> to enable hardware input via MIDI keyboards, as well as pitch recognition to use audio via microphone or other audio input, but again, time constraints prevented that from becoming a possibility.</p>

            <p></p>
            <h3>Development Details</h3>
            <p>The main interface was implemented primarily in the open-source JavaScript library <a href={"https://react.dev/"}>React</a> along with the corresponding design library <a href={"https://react-bootstrap.github.io/"}>React Bootstrap</a>.</p>
            <p>The notation and other score elements were implemented using the open-source project <a href="https://www.vexflow.com/">Vexflow</a>, and the audio playback used the open-source library <a
                href="https://tonejs.github.io/">ToneJS.</a></p>
            <p>Other tools used include the CSS enhancement language <a href="https://sass-lang.com/">Sass</a> and JetBrains' all-purpose web-focused IDE <a
                href="https://www.jetbrains.com/phpstorm/">PhpStorm</a></p>


        </Card>
        <Container>
            <p>Background photo credits:</p>
            <ul>
                <li>Danila Perevoshchikov (<a href="https://www.pexels.com/photo/gray-and-black-piano-keys-734918/">Pexels</a>)</li>
                <li>Bryan Geraldo (<a href="https://www.pexels.com/photo/macro-photography-of-piano-586415/">Pexels</a>)</li>
                <li>Steve Johnson (<a href="https://www.pexels.com/photo/music-sheet-on-black-piano-860662/">Pexels</a>)</li>
            </ul>


        </Container>
    </div>

}

export default About