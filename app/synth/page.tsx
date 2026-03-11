"use client"; // Required for Web Audio API (ensures the code only runs in the browser where the window object and AudioContext are available)
import { StartSynth } from "./StartSynth";
import "./synth.css";
/*
might start writing notes explicitly in txt files or comments of my own code.
I can simply transfer the txt files between my devices. Way better than google accessing all
my data and needing to login to google just to see my notes

Web Audio API code must exclusively be in Client Components because the AudioContext 
and other web audio features are browser-only APIs, do not exist on server

2. Strategic Placement
For a clean architecture, organize your code into these three areas:

    Custom Hooks (/hooks/useSynth.ts): Store the core audio logic here.
        Initialize the AudioContext and Oscillator inside a useEffect or a useRef to keep the same audio instance across re-renders.
        Expose functions like playNote() or stopNote() to your UI.
    UI Components (/components/Keyboard.tsx): Create the visual buttons and sliders.
        Use event listeners (like onClick) to trigger the functions from your hook.
    Utility Functions (/lib/audioUtils.ts): Put pure math or frequency tables (like mapping "C4" to 261.63Hz) here to keep your components light.
  Browsers block audio from starting automatically to prevent annoying ads.

--------------------------------------------------------------------------
  To manage multiple oscillators in a Next.js project without memory leaks, 
  you should use a combination of useRef to store the active audio nodes 
  and a useEffect cleanup function to disconnect them when the component unmounts. 
  Why Use useRef? Unlike useState, updating a useRef does not trigger a re-render. 
  This is perfect for high-frequency audio data that doesn't need to be reflected 
  in the UI immediately.

ex:
  custom hook usepolysynth

  "use client";
import { useRef, useEffect, useCallback } from 'react';

export function usePolySynth() {
  // 1. Persist the AudioContext and an active oscillators map across renders
  const audioCtx = useRef(null);
  const activeOscillators = useRef({}); // Stores oscillators by note (e.g., "C4")

  const playNote = useCallback((note, frequency) => {
    // 2. Initialize context on first user interaction
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.current.state === 'suspended') audioCtx.current.resume();

    // Prevent duplicate oscillators for the same note
    if (activeOscillators.current[note]) return;

    // 3. Create and connect nodes
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(frequency, audioCtx.current.currentTime);
    
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);

    osc.start();
    
    // Store both to stop and disconnect them later
    activeOscillators.current[note] = { osc, gain };
  }, []);

  const stopNote = useCallback((note) => {
    const active = activeOscillators.current[note];
    if (active) {
      const { osc, gain } = active;
      // Smooth release to prevent "clicking" sounds
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.current.currentTime + 0.1);
      
      osc.stop(audioCtx.current.currentTime + 0.1);
      
      // Cleanup node once sound finishes
      osc.onended = () => {
        osc.disconnect();
        gain.disconnect();
      };
      
      delete activeOscillators.current[note];
    }
  }, []);

  // 4. Memory Leak Protection: Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(activeOscillators.current).forEach(({ osc, gain }) => {
        osc.stop();
        osc.disconnect();
        gain.disconnect();
      });
      if (audioCtx.current) audioCtx.current.close();
    };
  }, []);

  return { playNote, stopNote };
}
notes about code
The onended Callback: In the Web Audio API, an oscillator doesn't automatically disappear when it stops. You must manually call disconnect() after stop() to release it for garbage collection.
The useEffect Return: This acts as a final fail-safe. If the user navigates to a different page in your Next.js app, this function kills all active sounds and closes the AudioContext entirely.
Gain Ramping: Always ramp the volume to nearly zero before stopping an oscillator. Stopping a wave at its peak causes an audible "pop" or "click".

can use a useEffect return function to call synth.dispose(). This prevents memory leaks if the user navigates away from the piano page


*/

import { Box, Button, Grid, GridCol, Group, Typography } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

export default function SynthPage() {

  return (
    <>
      <div id="home-section" />
      {/* <HeaderSimple /> */}

      <Box px={{ base: "sm", md: "xl" }}>
        {/* grouped by rows */}
        <Grid>
          <GridCol span={{ base: 1, md: 5, lg: 5 }} />
          <GridCol span={{ base: 12, md: 2, lg: 2 }}>
            <Group justify="center">
              <StartSynth />
              {/* <div className="piano">
                <div className="key white" data-note="C4"></div>
                <div className="key black" data-note="C#4"></div>
                <div className="key white" data-note="D4"></div>
                <div className="key black" data-note="D#4"></div>
                <div className="key white" data-note="E4"></div>
                <div className="key white" data-note="F4"></div>
                <div className="key black" data-note="F#4"></div>
                <div className="key white" data-note="G4"></div>
                <div className="key black" data-note="G#4"></div>
                <div className="key white" data-note="A4"></div>
                <div className="key black" data-note="A#4"></div>
                <div className="key white" data-note="B4"></div>
                <div className="key white" data-note="C5"></div>
              </div> */}
            </Group>
          </GridCol>
          <GridCol span={{ base: 1, md: 5, lg: 5 }} />

          <GridCol span={{ base: 12, md: 12, lg: 12 }}>
            <h4>
              <i>Synth</i>
            </h4>
          </GridCol>

          <GridCol span={{ base: 12, md: 4, lg: 4 }} />
          <GridCol span={{ base: 12, md: 4, lg: 4 }}>
            <h3>description</h3>
            {/* <Typography>`${rows}`</Typography> */}
          </GridCol>
          <GridCol span={{ base: 12, md: 4, lg: 4 }} />

          <GridCol span={{ base: 12, md: 4, lg: 4 }} />
          <GridCol span={{ base: 10, md: 4, lg: 4 }}>
            <Group justify="center">
              {/* <Button size="lg" component="a" href="#contact-section" color='lightseagreen'>
                Say Hello
              </Button> */}
              {/* <Button
								size="lg"
								component="a"
								href="#project-section"
								color="dark"
							>
								Projects
								<IconExternalLink style={{ paddingLeft: "2px" }} />
							</Button> */}
            </Group>
          </GridCol>
          <GridCol span={{ base: 12, md: 4, lg: 4 }} />
        </Grid>
        <br />
        <br />
        <br />
      </Box>
    </>
  );
}
