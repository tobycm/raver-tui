import convert from "color-convert";
import { Box, Text } from "ink";
import { useEffect, useState, type ComponentProps } from "react";
import { useScreenContext } from "../contexts/ScreenContext";

export default function ScreenInfo(props: ComponentProps<typeof Box>) {
  const { width, height } = useScreenContext();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % width);
    }, 1000 / 4);

    return () => clearInterval(interval);
  }, [width]);

  const ele = new Array(width).fill(0).map((_, i) => {
    const color = convert.hsl.rgb([(((i + offset) % width) / width) * 360, 100, 50]);

    return (
      <Text key={i} backgroundColor={`rgb(${color.join(", ")})`}>
        &nbsp;
      </Text>
    );
  });

  return (
    <Box flexDirection="column" {...props}>
      <Text>Width: {width}</Text>
      <Text>Height: {height}</Text>

      {...new Array(height - 4).fill(<Box>{...ele}</Box>)}
    </Box>
  );
}
