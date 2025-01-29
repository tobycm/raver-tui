import decodeAudio from "audio-decode";

import { readFileSync } from "fs";
import { parseArgs } from "util";

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

setInterval(() => {}, 5000);

import { render } from "ink";
import App from "./app";

render(<App />);
