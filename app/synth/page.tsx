"use client"; // Required for Web Audio API (ensures the code only runs in the browser where the window object and AudioContext are available)
/*
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

  


*/

import { Box, Button, Grid, GridCol, Group, Typography } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
// import styles from '../styles/Home.module.css';
import { HeaderSimple } from "@/components/HeaderSimple";
// import { getUsers } from '@/components/testget';
// import { db } from '../../components/db';
// // SELECT
// pool.query<RowDataPacket[]>('SELECT 1 + 1 AS `test`;', (_err, rows) => {
//   console.log(rows);
//   /**
//    * @rows: [ { test: 2 } ]
//    */
// });

// console.log("bruh")
//
import mysql from "mysql2/promise";

// const connection = await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Darker124@@@',
//     database: 'new_schema',
//     // rowsAsArray: true,
//   });

//   // query database
// const [rows, fields] = await connection.execute(
//   'SELECT * FROM `denormalized_orders` LIMIT 1',
// );
// // console.warn('test the console');

// // const data: string = JSON.stringify(rows[0].order_id);
// // console.warn(data);//

// //try this one
// const temp: string = JSON.parse(JSON.stringify(rows));
// // console.warn(rows[0]);
// // console.warn("test order id's row: " + rows.order_id);
// // const data = [];
// // console.warn(data);

// rows.forEach((user) => {
//     console.log('-----------');
//     console.log('id:  ', user.id);
//     console.log('name:', user.name);
//   });

//   for (let i = 0; i < cars.length; i++) {
//   text += cars[i] + "<br>";
// }

export default function HomePage() {
	return (
		<>
			<div id="home-section" />
			<HeaderSimple />

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
