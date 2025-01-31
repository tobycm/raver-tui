declare module "audio-buffer-utils" {
  export function create(data: Float32Array, options: {}, sampleRate: number): AudioBuffer;
}
