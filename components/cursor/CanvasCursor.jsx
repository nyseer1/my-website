import React from 'react';
import useCanvasCursor from '@/components/cursor/useCanvasCursor.jsx';

export default function CanvasCursor({id}) {
    //TODO FIND OUT HOW TO CROP THIS CANVAS INTO A DIV
    
  useCanvasCursor();

  

  return (
    <canvas
      id="canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
