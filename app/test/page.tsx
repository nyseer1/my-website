"use client";

import { Button } from "@mantine/core";
import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

const NOTES = ["C4", "E4", "G4", "B4", "D5", "E5", "F#5", "A5"];
const divs = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]

const A_PENTA = ["C#", "E", "F#", "A", "B"];
const OCTAVES = [2, 3, 4, 5];

// Creates: ["A3", "B3", "C#3", "E3", "F#3", "A4", "B4"... "F#5"]
const SCALE_NOTES = OCTAVES.flatMap((octave) =>
  A_PENTA.map((note) => `${note}${octave}`),
);


export default function Visualizer() {
  const [isPlaying, setIsPlaying] = useState(false);
  // Track which note is currently active
  const [activeNote, setActiveNote] = useState<string | null>(null);

  // Use a ref for the synth to keep it persistent across renders
  const synthRef = useRef<Tone.Synth | null>(null);
  const sequence = useRef<Tone.Sequence | null>(null);
  const seqData = useRef<
    ({ note: string | null; cutoff: number; type: string } | null)[]
  >(new Array(16).fill(null));


  useEffect(() => {
    // Initialize Synth
    synthRef.current = new Tone.Synth({
      oscillator: {
        type: "fmsine4",
        modulationType: "square",
      },
    }).toDestination();




    sequence.current = new Tone.Sequence(
      (time, step: number) => {
        const data = seqData.current[step];
        // console.log("step: " + step + ", freq is " + data?.note);
        //  //step indexes

        // time visuals to the sequence here (this code runs every step by default)
        Tone.getDraw().schedule(() => {
          // console.log("visuals should be happening now");
          setActiveNote(`${step}`);
        }, time);
      },
      //the array is what step variable reads one by one. so step will have value of 0-15 to play note at step 0-15
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      "16n",
    ).start(0); //start seq 0



    // Initialize seq
    const seq = new Tone.Pattern(
      (time, note) => {
        synthRef.current?.triggerAttackRelease(note, "16n", time);

        // Tone.Draw schedules the visual update to hit exactly with the audio
        Tone.getDraw().schedule(() => {
          setActiveNote(note);

          // Clear the highlight after 100ms
          setTimeout(() => {
            setActiveNote(null);
          }, 100);
        }, time);
      },
      NOTES
    );
    sequence.current.start(0);

    return () => {
      // Cleanup on unmount
      Tone.getTransport().stop();
      seq.dispose();
      synthRef.current?.dispose();
    };
  }, []);

  const handleToggle = async () => {
    if (Tone.getTransport().state === "started") {
      Tone.getTransport().stop();
      setIsPlaying(false);
    } else {
      await Tone.start();
      Tone.getTransport().start();
      setIsPlaying(true);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto font-sans">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold">Synchronizing Visuals</h1>
        <p className="text-gray-600 mt-2">
          Audio scheduling and rendering visuals are kept separate using
          <code className="bg-gray-100 px-1 mx-1">Tone.Draw</code>.
        </p>
      </header>

      <div className="flex w-full h-12 bg-white mb-8 overflow-hidden rounded">
        {divs.map((note) => ( //just maps each note to its own div tag
          <div
            key={note}
            //fill color if note is active note, go back to 0 opacity after set duration.
            className={`flex-1 transition-opacity duration-500 ease-out bg-blue-800 ${activeNote === note ? "opacity-100 duration-75" : "opacity-0"
              }`}
            style={{ borderRight: "1px solid #222" }}
          />
        ))}
      </div>

      <Button
        onClick={handleToggle}
        className={`px-6 py-2 rounded font-bold text-white transition-colors ${isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
      >
        {isPlaying ? "STOP" : "START"}
      </Button>


    </div>
  );
}