"use client"; // Required for Web Audio API (ensures the code only runs in the browser where the window object and AudioContext are available)
/*

might start writing notes explicitly in txt files or comments of my own code.
I can simply transfer the txt files between my devices. Way better than google accessing all
my data and needing to login to google just to see my notes

web synth tutorial here:
https://youtu.be/uasGsHf7UYA?si=z87uj7leOwClBlRR
LOCAL PATH(DELETE LATER)
"C:\Users\nysee\Downloads\videoplayback.mp4"

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

    Do not initialize your AudioContext globally at the top level of a file.
    Do resume or create the AudioContext inside an event handler triggered by the user (like a "Start Synth" button)

 -----	example: using native web audio api -------------------------------------------------------------
put this in synthesizer.tsx
	"use client"; // Required for Web Audio AP
import { useRef } from "react";

export default function Synthesizer() {
  const audioCtx = useRef(null);

  const startSynth = () => {
    // Initialize only after user interaction
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const osc = audioCtx.current.createOscillator();
    osc.connect(audioCtx.current.destination);
    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.5); // Play for 0.5s
  };

  return <button onClick={startSynth}>Play Sound</button>;
}
  -------------------------------------------------------------------
  can also use tone.js for more complex stuff,
  Event Listeners: Map computer keyboard keys (e.g., 'A', 'S', 'D') or mouse clicks to specific musical notes
  -----------------------------------------------------
  To manage multiple oscillators in a Next.js project without memory leaks, 
  you should use a combination of useRef to store the active audio nodes 
  and a useEffect cleanup function to disconnect them when the component unmounts. 
  Why Use useRef? Unlike useState, updating a useRef does not trigger a re-render. 
  This is perfect for high-frequency audio data that doesn't need to be reflected 
  in the UI immediately.

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



*/

import { Box, Button, Grid, GridCol, Group, Typography } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
// import styles from '../styles/Home.module.css';

export default function HomePage() {
	return (
		<>
			<div id="home-section" />
			{/* <HeaderSimple /> */}

			<Box px={{ base: "sm", md: "xl" }}>
				{/* grouped by rows */}
				<Grid>
					<GridCol span={{ base: 1, md: 5, lg: 5 }} />
					<GridCol span={{ base: 12, md: 2, lg: 2 }}>
						<h2 style={{ textAlign: "center" }}>
							picture
							<br />
							here
						</h2>
						<br />
					</GridCol>
					<GridCol span={{ base: 1, md: 5, lg: 5 }} />

					<GridCol span={{ base: 12, md: 12, lg: 12 }}>
						<h4>
							<i>Online Retail Store</i>
						</h4>
						<h1>Database Design</h1>
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
							<Button
								size="lg"
								component="a"
								href="#project-section"
								color="dark"
							>
								Projects
								<IconExternalLink style={{ paddingLeft: "2px" }} />
							</Button>
						</Group>
					</GridCol>
					<GridCol span={{ base: 12, md: 4, lg: 4 }} />
				</Grid>
				<br />
				<br />
				<br />

				{/* Content of the section */}
				<div id="project-section">
					<Grid>
						<GridCol span={{ base: 10, md: 3, lg: 3 }} />

						<GridCol span={{ base: 10, md: 6, lg: 6 }}>
							<h1>Overview:</h1>
						</GridCol>

						<GridCol span={{ base: 10, md: 3, lg: 3 }} />
						<GridCol span={{ base: 10, md: 3, lg: 3 }} />

						<GridCol span={{ base: 12, md: 4, lg: 4 }}>
							<h2>Online Retailer Database Design</h2>
							<br />
							<br />
							<br />
							<p>
								Database Design for E-commerce online retail website. Lorem
								ipsum dolor sit amet consectetur adipiscing elit. Quisque
								faucibus ex sapien vitae pellentesque sem placerat. In id cursus
								mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
								urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
								egestas. Iaculis massa nisl malesuada lacinia integer nunc
								posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
								Ad litora torquent per conubia nostra inceptos himenaeos.
							</p>
						</GridCol>
						<GridCol span={{ base: 12, md: 3, lg: 3 }}>
							<h1>picture here</h1>
							<br />
							<br />
							<br />
							<Group>
								<Button
									size="md"
									component="a"
									href="/online-retail-database"
									color="lightseagreen"
								>
									Database
								</Button>
								<Button size="md" component="a" href="/projects" color="dark">
									Github
									<IconExternalLink style={{ paddingLeft: "2px" }} />
								</Button>
								<Button
									size="md"
									component="a"
									href="#home-section"
									variant="default"
								>
									Back To Top
								</Button>
							</Group>
						</GridCol>
						{/* button group */}
					</Grid>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>
				{/* Content of the section */}
				<div id="contact-section">
					<br />
					<Grid>
						<GridCol span={{ base: 10, md: 3, lg: 3 }} />

						<GridCol span={{ base: 10, md: 6, lg: 6 }}>
							<h1>Contact</h1>
						</GridCol>

						<GridCol span={{ base: 10, md: 3, lg: 3 }} />
						<GridCol span={{ base: 10, md: 3, lg: 3 }} />

						<GridCol span={{ base: 12, md: 4, lg: 4 }}>
							<h3>Reach out to me here!</h3>
							<Group>
								<Button
									size="xl"
									component="a"
									href="mailto:nyseer.couse@gmail.com"
									color="dark"
								>
									nyseer.couse@gmail.com
								</Button>
								<Button
									size="xl"
									component="a"
									href="tel:347-597-9610"
									color="lightseagreen"
								>
									347-579-9610
								</Button>
							</Group>
							<br />
							<br />
							<br />
							<p>
								hire me hire me hire me hire me hire me hire me hire me hire me
								hire me hire me hire me hire me hire me hire me hire me hire me
								hire me hire me hire me hire me hire me hire me hire me hire me
								hire me hire me hire me hire me hire me hire me hire me hire me
								hire me hire me hire me hire me hire me hire me hire me hire me
								hire me hire me hire me hire me{" "}
							</p>
						</GridCol>
						<GridCol span={{ base: 12, md: 3, lg: 3 }}>
							<h1>picture here</h1>
							<br />
							<br />
							<br />
							<Group>
								<Button
									size="md"
									component="a"
									href="/contact"
									color="lightseagreen"
								>
									Linkedin
								</Button>
								<Button size="md" component="a" href="/projects" color="dark">
									Github
									<IconExternalLink style={{ paddingLeft: "2px" }} />
								</Button>
								<Button
									size="md"
									component="a"
									href="#home-section"
									variant="default"
								>
									Back To Top
								</Button>
							</Group>
						</GridCol>
						{/* button group */}
					</Grid>
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
					<br />
				</div>
			</Box>
		</>
	);
}
