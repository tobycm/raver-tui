import { default as util } from "audio-buffer-utils";
import decodeAudio from "audio-decode";
import play from "audio-play";
import { readFileSync } from "fs";
import { render } from "ink";
import { parseArgs } from "util";
import webfft from "webfft";
import App from "./app";
import { frequencyDataUpdater } from "./contexts/AudioContext";

const { values: args, positionals } = parseArgs({
  args: process.argv,
  options: {},
  allowPositionals: true,
});

const file = positionals[2];
if (!file) {
  console.error("No file specified");
  process.exit(1);
}

const fileBuffer = readFileSync(file);
export const audio = await decodeAudio(fileBuffer);

render(<App />);

const channelData = audio.getChannelData(0);
const sampleRate = audio.sampleRate;

const fftSize = 256;
const overlap = fftSize / 2;
const fft = new webfft(fftSize);

console.log(`Playing audio... Sample Rate: ${sampleRate}, FFT Size: ${fftSize}`);

let index = 0;
const interval = setInterval(() => {
  if (index + fftSize >= channelData.length) {
    clearInterval(interval);
    console.log("Audio processing complete.");
    return;
  }

  const inputSignal = channelData.slice(index, index + fftSize);
  const interleaved = new Float32Array(fftSize * 2);
  for (let i = 0; i < fftSize; i++) {
    interleaved[i * 2] = inputSignal[i];
    interleaved[i * 2 + 1] = 0;
  }

  const transformed = fft.fft(interleaved);

  const magnitudes = new Float32Array(fftSize);
  for (let i = 0; i < fftSize; i++) {
    const real = transformed[2 * i];
    const imag = transformed[2 * i + 1];
    magnitudes[i] = Math.sqrt(real ** 2 + imag ** 2);
  }

  frequencyDataUpdater.updateFrequencyData(magnitudes.slice(0, 400));

  index += overlap;
}, (overlap / sampleRate) * 1000);

const player = play(util.create(channelData, {}, sampleRate), {}, () => clearInterval(interval));
