"use client"; // Required for Web Audio API (ensures the code only runs in the browser where the window object and AudioContext are available)
import dynamic from "next/dynamic";

//
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
import "./synth.css";

import { Box, Grid, GridCol, Group } from "@mantine/core";

export default function SynthPage() {
  return (
    <>
      <div id="home-section" />
      {/* <HeaderSimple /> */}

      <Box px={{ base: "sm", md: "xl" }}>
        {/* grouped by rows */}
        <Grid>
          <GridCol span={{ base: 1, md: 1, lg: 1 }} />
          <GridCol span={{ base: 12, md: 12, lg: 12 }}>
            <Group justify="center">
              <SynthContainer />
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
            <p>Touch the pad to play notes!<br />
              Pitch is controlled by your finger's X position and filter cutoff by the y position.
            </p>

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
