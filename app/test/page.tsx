"use client"; // Required for Web Audio API (ensures the code only runs in the browser where the window object and AudioContext are available)
//
/*
lazy loading client component in Next.js faster initial load time by decreasing 
the amount of JS needed to render a route. 
(It allows you to defer loading of Client Components and imported libraries, 
and only include them in the client bundle when they're needed. For example, you 
might want to defer loading a modal until a user clicks to open it.)
*/
import { Box, Button, Grid, GridCol, Group } from "@mantine/core";
import dynamic from "next/dynamic";
import confirm from "@/components/ConfirmClear";
import ConfirmClear from "@/components/ConfirmClear";

export default function SynthPage() {

  return (
    <>
      <ConfirmClear />

    </>
  );
}
