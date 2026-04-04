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
import confirm

export default function SynthPage() {
  const handleDelete = async (): Promise<void> => {
    // Fully type-safe: message is required, result is boolean
    const result = await confirm({
      message: "Are you sure you want to delete this item?",
    });

    if (result) {
      // User confirmed - proceed with deletion here
    }
  };
  return (
    <>
      <Button onClick={handleDelete}></Button>
    </>
  );
}
