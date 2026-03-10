"use client"; // Required for Web Audio API, (ensures the code 
// only runs in the browser where the window object and AudioContext are available)
import { AudioContext, OfflineAudioContext } from 'standardized-audio-context';
import * as Tone from "tone";
import { Button } from '@mantine/core';

export function StartSynth() {
    async function handleClick() { 
        //async means something in this code needs to be waited on,
        //so handle it asynchronously, 

        //start synth 
        //tone.start returns a promise
        //await tells program to wait until this operation is complete before moving on
        await Tone.start();
        
        //this is done once Tone.start() finishes the promise
        console.warn("audio is ready");
        const synth = new Tone.Synth().toDestination();
const now = Tone.now();
synth.triggerAttackRelease("C4", "8n", now);
synth.triggerAttackRelease("E4", "8n", now + 0.5);
synth.triggerAttackRelease("G4", "8n", now + 1);
        
    }

    return (
        <Button
                                        size="lg"
                                        component="a"
                                        href="#project-section"
                                        // color="dark"
                                     onClick={handleClick}>
          Click me
        </Button>
      );
}