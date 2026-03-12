"use client"; // Required for Web Audio API, (ensures the code runs on the client)
import { Button } from "@mantine/core";
import dynamic from "next/dynamic";
import { useState } from "react";
// import { AudioContext, OfflineAudioContext } from "standardized-audio-context";
// only runs in the browser where the window object and AudioContext are available)
import * as Tone from "tone";

const Keyboard = dynamic(
  () => import("./Keyboard").then((mod) => mod.Keyboard),
  { ssr: false },
);

export function Synth() {

  const [showKeyboard, setShowKeyboard] = useState(false);
  // initializes synth once.
  // (usememo caches the value so it dosent need to re initialize on re-renders0

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
    setShowKeyboard(true);

    // const now = Tone.now();
    // synth.triggerAttackRelease("C4", "8n", now);
    // synth.triggerAttackRelease("E4", "8n", now + 0.5);
    // synth.triggerAttackRelease("G4", "8n", now + 1);
  }

  return (
    <>


      {showKeyboard ? <Keyboard /> : <Button
        size="lg"
        component="a"
        href="#project-section"
        color="dark"
        onClick={handleClick}
      >
        Activate Piano
      </Button>}

      {/* synth opens up here */}
    </>
  );
}
