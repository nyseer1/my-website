"use client"; // Required for Web Audio API, (ensures the code runs on the client)
import { Button } from "@mantine/core";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect, PointerEvent } from "react";
import { AudioContext, OfflineAudioContext } from "standardized-audio-context";
import * as Tone from "tone";
Tone.setContext(new Tone.Context({ latencyHint: "interactive" }))
Tone.getContext().lookAhead = 0;// Removes the 100ms scheduling buffer


export function SynthContainer() {
  const [showSynth, setShowSynth] = useState(false);

  // We store the INDEX (0-3) in state
  // const [osc1wave, setosc1wave] = useState(0);



  const A_PENTA = ["C#", "E", "F#", "A", "B",];
  const OCTAVES = [2, 3, 4, 5];

  // Creates: ["A3", "B3", "C#3", "E3", "F#3", "A4", "B4"... "F#5"]
  const SCALE_NOTES = OCTAVES.flatMap(octave =>
    A_PENTA.map(note => `${note}${octave}`)
  );

  //(XY-controller) pad state initialization 
  const [position, setPosition] = useState({ x: 50, y: 50 }); // Center by default (%)
  const padRef = useRef<HTMLDivElement>(null); //tells typescript this will be a reference to a div later (it wants static typing so it can do type related error catching on compilation)
  const [cutoff, setCutoff] = useState(0.8);


  // useref to render a value thats not needed for rendering (rendering mean displaying the visuals) does not re-render itself because the reference is stored in cache so better performance 
  // tell TypeScript it starts as null OR a Tone.Synth to  use useRef for it later (same for others)
  const synth = useRef<Tone.Synth | null>(null);
  const filter = useRef<Tone.Filter | null>(null);
  const filterEnv = useRef<Tone.FrequencyEnvelope | null>(null);
  const seq = useRef<Tone.Sequence | null>(null);

  const [isRecording, setisRecording] = useState(false);

  //store sequencer notes in array, (can be a string of the note and cutoff, or null)
  // defines object parameters, reference the array and fill it with nulls to default. null means no note
  const seqData = useRef<({ note: string | null, cutoff: number, type: string } | null)[]>(
    new Array(16).fill(null)
  );

  //synchronize components (this page) with external system (web audio api). tells react render this once on page load and never again. better performance
  useEffect(() => {
    //THIS section ONLY runs when component mounts(page first load)-----------------------
    //create a synth and connect it to the main output (your speakers)
    filter.current = new Tone.Filter(8000, "lowpass").toDestination();

    synth.current = new Tone.Synth({
      oscillator: {
        type: "sawtooth" // Options: "sine", "square", "triangle", "sawtooth"
      }
    }).connect(filter.current);

    //FILTER ENV
    filterEnv.current = new Tone.FrequencyEnvelope({
      baseFrequency: 200, //starting freq
      octaves: 2,// How far to jump 
      attack: 0.01,
      decay: 0.2,
      sustain: 0.5,
      release: 0.5,
    });

    filterEnv.current.connect(filter.current.frequency);

    seq.current = new Tone.Sequence((time, step) => {
      const data = seqData.current[step];
      if (data && data.note && filterEnv.current) {

        //UPDATE ENVELOPES
        switch (data.type) {

          case 'D': //only on pointer down
            synth.current?.triggerAttack(data.note, time);
            filterEnv.current.triggerAttack(time);
            break;
          case 'U': //only on pointer up
            synth.current?.triggerRelease("+0.1"); //release synth, arg is how many seconds
            filterEnv.current?.triggerRelease();
        }

        //on any pointer event
        //UPDATE X AND Y
        filterEnv.current.baseFrequency = data.cutoff;
        synth.current?.frequency.rampTo(data.note, 0.01); //2nd arg is porta in seconds


      } //step indexes 
    }, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).start(0); //start seq 0

    //config the transport (like a player)
    Tone.getTransport().loop = true;
    Tone.getTransport().loopEnd = "1m";

    return () => {
      //-----THIS section ONLY runs when the component is destroyed----------------------

      //destroys all synth components to prevent memory leaks
      synth.current?.dispose();
      filter.current?.dispose();
      filterEnv.current?.dispose();
      Tone.getTransport().stop(); //TODO might not need check later

    };

  }, []);


  //* EVENT HANDLERS-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  //TODO set the waveforms one by one with a string and switch cases, ALSO OTHER PARAMETERS

  async function handleStartAudio() { //async function means run this function asynchronously so other code can be executed during loading

    try {
      // wait for audio context to start before playing audio
      await Tone.start(); //await says wait here until this calculation is done
      Tone.getTransport().start(); //start transport(player)

    } catch (error) {
      // only runs in the browser where the window object and AudioContext are available
      console.error("web audio api not supported !!! :(", error);
    } finally {
      console.warn("audio is ready");
      setShowSynth(true);
    }
  };


  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => { //just tells typescript its a pointer event so it knows the type to catch errors for

    if (e.buttons !== 1) return; //confirm that user is either left clicking or touching (necessary on pointerMove events to prevent overlapping on pointerDown events)

    if (!padRef.current) return; //end here if we do not have a reference to the pad
    const rect = padRef.current.getBoundingClientRect(); //get the bounds of the pad

    //initialize to 0, calculate x and y position on pad based on input
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const yRaw = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const y = 1 - yRaw; //invert the y so that higher on the pad is higher pitch, vice versa

    // logarithmic frequency mapping to pad: 0.0 - 20Hz and 1.0 - 20,000Hz (rate of hz growth is faster when going to the right of the pad, vice versa)
    // map the x pad val to a freq, then round it to one of the scale notes (use SCALE_NOTES.length - 1 to stay within array bounds)
    const index = Math.floor(x * (SCALE_NOTES.length - 1));
    const freq = Tone.Frequency(SCALE_NOTES[index]).toFrequency();

    const porta = 0.02; //portamento

    synth.current?.frequency.rampTo(freq, porta); //2nd arg how fast in seconds

    //update filter
    const cutoff = 20 * Math.pow(11000 / 40, y); // log: min * (max/min)^exponent
    if (!filterEnv.current) return; //dont need to add ? because i already check if it exists
    filterEnv.current.baseFrequency = cutoff; //set filter cutoff

    //update position (might not be necessary)
    setPosition({ x, y });

    //*RECORDING MODE - (if not recording stop here) ---------
    if (!isRecording) return;
    //get note, quantize it to the nearest time, change value at array[time]
    const transport = Tone.getTransport();
    const step = Math.floor(transport.progress * 16); //round to nearest step (there are 16 steps )
    seqData.current[step] = {
      note: "" + freq,
      cutoff: cutoff,
      type: 'M'
    };


  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => { //just tells typescript its a pointer event so it knows the type to catch errors for

    if (!padRef.current) return; //end here if we do not have a reference to the pad
    const rect = padRef.current.getBoundingClientRect(); //get the bounds of the pad

    //initialize to 0, calculate x and y position on pad based on input
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const yRaw = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    const y = 1 - yRaw; //invert the y so that higher on the pad is higher pitch, vice versa

    // logarithmic frequency mapping to pad: 0.0 - 20Hz and 1.0 - 20,000Hz (rate of hz growth is faster when going to the right of the pad, vice versa)
    // round freq to the closest scale note (SCALE_NOTES.length - 1 to stay within array bounds)
    const index = Math.floor(x * (SCALE_NOTES.length - 1));
    const freq = Tone.Frequency(SCALE_NOTES[index]).toFrequency();

    //filter
    const cutoff = 20 * Math.pow(11000 / 40, y); // Formula: min * (max/min)^exponent
    const filterattack = 0.01;
    const filterrelease = 0.4;
    if (!filter.current) return; //dont need to add ? because i already check if it exists
    filter.current.frequency.value = cutoff;
    if (!filterEnv.current) return; //dont need to add ? because i already check if it exists
    filterEnv.current.baseFrequency = cutoff; //set filter cutoff

    //start envelopes simultaneously
    synth.current?.triggerAttack(freq);
    filterEnv.current.triggerAttack();

    //update position (might not be necessary)
    setPosition({ x, y });

    //*RECORDING MODE - (if not recording stop here) ---------
    if (!isRecording) return;
    //get note, quantize it to the nearest time, change value at array[time]
    const transport = Tone.getTransport();
    const step = Math.floor(transport.progress * 16); //round to nearest step (there are 16 steps )
    seqData.current[step] = {
      note: "" + freq,
      cutoff: cutoff,
      type: 'D'
    };



  };


  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => { //just tells typescript its a pointer event so it knows the type to catch errors for

    //set release
    const release = 0.1;
    let rstring = "+" + release.toString();

    synth.current?.triggerRelease(rstring); //release synth
    filterEnv.current?.triggerRelease();

    const step = Math.floor(Tone.getTransport().progress * 16); //round to nearest step (there are 16 steps )

    //*RECORDING MODE - (if not recording stop here) ---------
    if (!isRecording) return;

    //record release
    seqData.current[step] = {
      note: null,
      cutoff: cutoff,
      type: 'U'
    };

  };


  // -------------------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {/* if this true ? (render this) : else render this */}
      {showSynth ? (


        <>

          {/* sequencer buttons */}
          <Button
            size="lg"
            color="#333333"
          >Stop</Button>

          <Button
            size="lg"
            color="green"
          >Start/Pause</Button>

          {isRecording ? (
            <Button
              size="lg"
              color="#aa0022"
              onPointerDown={async (e) => {
                setisRecording(false); //turn recording mode off
              }}
            >Recording On</Button>
          ) : (
            <Button
              size="lg"
              color="#000000"
              onPointerDown={async (e) => {
                setisRecording(true); //turn recording mode on
              }}
            >Recording Off</Button>
          )}


          {/* render xy pad here */}
          <div className="piano-board">
            <div
              ref={padRef}
              onPointerDown={handlePointerDown} //automatically calls the function on pointer down (when someone touches the pad) same for others
              onPointerUp={handlePointerUp}
              onPointerMove={handlePointerMove}
              className="w-full h-[50vh] bg-slate-800 rounded-xl touch-none "
            >
              {/* visual metronome indicator could go here */}
              <p className="absolute top-3 right-3 text-sm text-slate-500">Pitch-Filter X-Y</p>
            </div>
          </div>


        </>
      ) : (
        //button to activate synth here
        <Button
          onPointerDown={async (e) => {
            handleStartAudio(); //handles asynchronous api call to web audio api
          }}
        >
          Start Synth
        </Button>
      )}
    </>
  );
}
