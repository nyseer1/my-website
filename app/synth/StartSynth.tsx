"use client"; // Required for Web Audio API, (ensures the code
import { Button } from "@mantine/core";
import React, { useCallback, useEffect, useMemo } from "react";
import { AudioContext, OfflineAudioContext } from "standardized-audio-context";
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

export function StartSynth() {
  // initializes synth once.
  // (usememo caches the value so it dosent need to re initialize on re-renders0
  const synth = useMemo(() => new Tone.Synth().toDestination(), []);

  //callback saves cache of function, reuse functions without re-rendering 
  const playNote = useCallback(
    async (note: Note) => {
      await Tone.start(); // Resumes AudioContext on user gesture
      const now = Tone.now();
      synth.triggerAttackRelease(note, "8n", now);
    },
    [synth],
  );

  const stopNote = useCallback(
    (note: Note) => {
      synth.triggerRelease(note);
    },
    [synth],
  );

  // may use this to start the synth before pressing notes
  async function handleClick() {
    //async means something in this code needs to be waited on,
    //so handle it asynchronously,

    //start synth
    //tone.start returns a promise
    //await tells program to wait until this operation is complete before moving on
    await Tone.start();

    //this is done once Tone.start() finishes the promise
    console.warn("audio is ready");

    const now = Tone.now();
    // synth.triggerAttackRelease("C4", "8n", now);
    // synth.triggerAttackRelease("E4", "8n", now + 0.5);
    // synth.triggerAttackRelease("G4", "8n", now + 1);
  }

  return (
    <>
      {/* 
        <Button
          size="lg"
          component="a"
          href="#project-section"
          // color="dark"
          onClick={handleClick}
        >
          Click me
        </Button> */}

      <div className="piano-container">

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
      </div>
    </>
  );
}
