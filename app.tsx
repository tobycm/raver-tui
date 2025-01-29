import { Box, Text } from "ink";
import ScreenInfo from "./components/screenInfo";
import { ScreenProvider } from "./contexts/ScreenContext";

export default function App() {
  return (
    <ScreenProvider>
      <Box flexDirection="column">
        <Text>xd</Text>

        <ScreenInfo marginTop={1} />
      </Box>
    </ScreenProvider>
  );
}
