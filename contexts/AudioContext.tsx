import React, { createContext, useContext, useState } from "react";

interface AudioContextInterface {
  fftSize: number;
  frequencyData: Uint8Array;

  setFftSize: (fftSize: number) => void;
  setFrequencyData: (frequencyData: Uint8Array) => void;
}

const AudioContext = createContext<AudioContextInterface | undefined>(undefined);

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudioContext must be used within a AudioProvider");
  }
  return context;
};

export default AudioContext;

export function AudioProvider({ children }: React.PropsWithChildren) {
  const [fftSize, setFftSize] = useState<number>(1024);
  const [frequencyData, setFrequencyData] = useState<Uint8Array>(new Uint8Array(0));

  return (
    <AudioContext.Provider
      value={{
        fftSize,
        setFftSize,

        frequencyData,
        setFrequencyData,
      }}>
      {children}
    </AudioContext.Provider>
  );
}
