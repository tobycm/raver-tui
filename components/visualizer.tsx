import { Box, Text } from "ink";
import type { JSX } from "react";
import { useAudioContext } from "../contexts/AudioContext";
import { useScreenContext } from "../contexts/ScreenContext";

export default function Visualizer() {
  const { width, height } = useScreenContext();
  const { frequencyData } = useAudioContext();

  const bars = new Array<JSX.Element>(width).fill(<Box />).map((_, i) => {
    const barHeight = Math.round(frequencyData[Math.round((i / width / 2) * frequencyData.length)] * height);
    return (
      <Box key={i} flexDirection="column">
        <Box height={height - barHeight} />
        <Text>█</Text>
      </Box>
    );
  });

  return <Box flexDirection="row">{...bars}</Box>;
}
