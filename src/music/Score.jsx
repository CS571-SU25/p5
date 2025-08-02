import React, {useRef, useEffect, useContext} from 'react'
import VexFlow from 'vexflow'
import PianoTrainerContext from "../components/contexts/PianoTrainerContext.js";

// const VF = VexFlow.Flow
const VF = VexFlow
const { Formatter, Renderer, Stave, StaveNote } = VF

const clefAndTimeWidth = 50

export function Score({
                          staves = [],
                          clef = 'treble',
                          timeSignature = '4/4',
                          width = 400,
                          height = 150,
                      }) {
    const container = useRef()
    const rendererRef = useRef()

    const {correctColor, incorrectColor, neutralColor} = useContext(PianoTrainerContext);

    useEffect(() => {
        if (rendererRef.current == null) {
            rendererRef.current = new Renderer(
                container.current,
                Renderer.Backends.SVG
            )
        }
        const renderer = rendererRef.current
        renderer.resize(width, height)
        const context = renderer.getContext()
        renderer.getContext().clear()
        context.setFont('Futura', 10, '').setBackgroundFillStyle('#eed')
        const staveWidth = (width - clefAndTimeWidth) / staves.length

        let currX = 0
        staves.forEach((notes, i) => {
            const stave = new Stave(currX, 0, staveWidth)
            if (i === 0) {
                stave.setWidth(staveWidth + clefAndTimeWidth)
                stave
                    .addClef(clef)
                    .addTimeSignature(timeSignature)
            }
            currX += stave.getWidth()
            stave.setContext(context).draw()

            // console.log(notes);
            const processedNotes = notes
                .map(note => (typeof note.noteName === 'string' ? { key: note.noteName } : note.noteName))
                .map(note =>
                    // Array.isArray(note) ? { key: note[0], duration: note[1] } : note
                    Array.isArray(note)
                        ? {
                    key: note[0].noteName,
                            duration: note[1]
                } :
                        note
                )
                // .map(({ key, ...rest }) =>
                //     typeof key === 'string'
                //         ? {
                //             key: key.includes('/')
                //                 ? key
                //                 :
                //                 `${key[0]}/${key.slice(1)}`,
                //             ...rest,
                //         }
                //         : rest
                // )
                .map(
                    ({ key, keys, duration = 'q' }) =>
                        new StaveNote({
                            keys: key ? [key] : keys,
                            duration: String(duration),
                        })
                )
            // console.log(processedNotes);
            for(let i = 0; i < notes.length; i++) {
                // console.log(notes[i]);
                switch(notes[i].correct) {
                    case "correct":
                        processedNotes[i].setStyle({
                            // fillStyle: "hsl(200, 100%, 40%",
                            // strokeStyle: "hsl(200, 100%, 40%)",
                            fillStyle: correctColor,
                            strokeStyle: correctColor,
                        })
                        break;
                    case "incorrect":
                        processedNotes[i].setStyle({
                            // fillStyle: "hsla(0, 100%, 50%, .3)",
                            // strokeStyle: "hsla(0, 100%, 50%, .3)",
                            fillStyle: incorrectColor,
                            strokeStyle: incorrectColor,
                            fillOpacity: .2
                        })
                        break;
                    case "neutral":
                        processedNotes[i].setStyle({
                            fillStyle: "black",
                            strokeStyle: "black"
                        })
                        break;
                    default:
                        break;

                }
            }
            let voice = new VF.Voice().addTickables(processedNotes);
            VF.Accidental.applyAccidentals([voice],"C")
            Formatter.FormatAndDraw(context, stave, processedNotes, {
                auto_beam: true,
            })
        })




        // var div = document.getElementById("boo")
        // var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        // renderer.resize(500, 500);
        // var context = renderer.getContext();

        // var stave = new VF.Stave(10, 40, 300);
        // stave
        //     .addClef("treble")
        //     // .addKeySignature('D')
        //     .addTimeSignature('4/4')
        //
        // stave
        //     .setContext(context)
        //     .draw();
        //
        // var notes = [
        //     new VF.StaveNote({ keys: ["c/4"], duration: "h" }),
        //     new VF.StaveNote({ keys: ["c#/4", "f#/4", "a/4", "d#/5"], duration: "h" }),
        // ];
        //
        // var voice = new VF.Voice().addTickables(notes);
        //
        // VF.Accidental.applyAccidentals([voice], `D`);
        //
        // var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 300);
        //
        // voice.draw(context, stave);

    }, [staves])

    return <div id="scoreContainer" ref={container} />
}
