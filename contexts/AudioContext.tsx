import React, { createContext, useContext, useEffect, useState } from "react";

interface AudioContextInterface {
  fftSize: number;
  frequencyData: Float32Array;

  setFftSize: (fftSize: number) => void;
  setFrequencyData: (frequencyData: Float32Array) => void;
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
  const [frequencyData, setFrequencyData] = useState<Float32Array>(new Float32Array(0));

  useEffect(() => {
    frequencyDataUpdater.callbacks.push(setFrequencyData);
    return () => {
      const index = frequencyDataUpdater.callbacks.indexOf(setFrequencyData);
      frequencyDataUpdater.callbacks.splice(index, 1);
    };
  }, []);

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

class FrequencyDataUpdater {
  constructor() {}

  callbacks: ((data: Float32Array) => void)[] = [];

  updateFrequencyData(data: Float32Array) {
    this.callbacks.forEach((cb) => cb(data));
  }
}

export const frequencyDataUpdater = new FrequencyDataUpdater();
