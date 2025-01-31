import { Box, Text } from "ink";
import { type ComponentProps } from "react";
import { useAudioContext } from "../contexts/AudioContext";

export default function AudioInfo(props: ComponentProps<typeof Box>) {
  const { fftSize, frequencyData } = useAudioContext();

  return (
    <Box flexDirection="column" {...props}>
      <Text>FFT Size: {fftSize}</Text>
      <Text>Frequency Data: {frequencyData}</Text>
    </Box>
  );
}
