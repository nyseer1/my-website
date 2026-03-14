"use client"; // Required for Web Audio API, (ensures the code runs on the client)
import { Button } from "@mantine/core";
import { useCallback, useMemo, useState } from "react";
// only runs in the browser where the window object and AudioContext are available)
import * as Tone from "tone";

// 1. Define our Types
type Note = string;

interface KeyData {
    note: Note;
    isBlack: boolean;
}

// 2. Define the Note Map (C4 to B4)
const PIANO_NOTES: KeyData[] = [
    { note: "C4", isBlack: false },
    { note: "C#4", isBlack: true },
    { note: "D4", isBlack: false },
    { note: "D#4", isBlack: true },
    { note: "E4", isBlack: false },
    { note: "F4", isBlack: false },
    { note: "F#4", isBlack: true },
    { note: "G4", isBlack: false },
    { note: "G#4", isBlack: true },
    { note: "A4", isBlack: false },
    { note: "A#4", isBlack: true },
    { note: "B4", isBlack: false },
];

export function Keyboard() {

    //doesnt actually work yet
    const [sustain, setSustain] = useState(0.5); // Default 50%

    // useMemo ensures the synth is only created once by cache the value, so on re-render the same value is reused without doing the calculation again
    const synth = useMemo(() => {
        return new Tone.Synth().toDestination();
    }, []); // Empty array means "this function has zero dependencies"

    //callback saves cache of function, reuse functions without re-rendering 
    const playNote = useCallback(
        async (note: Note) => {
            await Tone.start(); // Resumes AudioContext on user gesture
            synth.triggerAttack(note, "8n");
        },
        [synth],
    );

    // Update Sustain whenever the slider moves
    const handleSustainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        setSustain(newValue);

        if (synth) {
            // Direct update to the Tone.js audio parameter
            synth.envelope.sustain = newValue;
        }
    };
    // fix later so i can hold notes 
    const stopNote = useCallback(
        (note: Note) => {
            synth.triggerRelease(Tone.now());
        },
        [synth],
    );

    return (
        <>
            <div className="controls" style={{ padding: '20px', border: '1px solid #ccc' }}>
                <h3>Envelope Settings</h3>

                <label htmlFor="sustain-slider">Sustain: {Math.round(sustain * 100)}%</label>
                <label htmlFor="sustain-slider">{synth.envelope.sustain}</label>
                <input
                    id="sustain-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={sustain}
                    onChange={handleSustainChange}
                    style={{ width: '100%', display: 'block', margin: '10px 0' }}
                />
            </div>
            <div className="piano-board">
                {PIANO_NOTES.map((item) => (
                    <Button
                        key={item.note}
                        className={`key ${item.isBlack ? 'black-key' : 'white-key'}`}
                        onMouseDown={() => playNote(item.note)}
                        onMouseUp={() => stopNote(item.note)}
                        onMouseLeave={() => stopNote(item.note)}
                        onTouchStart={(e) => {
                            e.preventDefault();
                            playNote(item.note);
                        }}
                        onTouchEnd={() => stopNote(item.note)}
                    >
                        {/* <span className="key-label">{item.note}</span> */}
                    </Button>
                ))}
            </div>

        </>
    );
}
