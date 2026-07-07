"use client"; // Required for Web Audio API (ensures the code only runs in the browser where the window object and AudioContext are available)
import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
/*
lazy loading client component in Next.js faster initial load time by decreasing 
the amount of JS needed to render a route. 
(It allows you to defer loading of Client Components and imported libraries, 
and only include them in the client bundle when they're needed. For example, you 
might want to defer loading a modal until a user clicks to open it.)
*/
const SynthContainer = dynamic(
	() => import("./SynthContainer").then((mod) => mod.SynthContainer),
	// .then((mod) => mod.functionName) tells it which exported function to get
	{ ssr: false }, //forces server side rendering off so it dosent try to render in server before rendering in the client
);
// import "./synth.css";

export default function SynthPage() {
	return (
		<>
			<Navbar />
			<SynthContainer />

			<h2>Dynamic XY Web-Synth</h2>

			<p>
				Touch the pad to play notes!
				<br />
				Pitch is controlled by the X position of your finger, and filter cutoff
				is controlled by the Y position.
			</p>

			<p>Developed by Nyseer Couse</p>
			<br style={{lineHeight:'30'}}/>
		</>
	);
}
