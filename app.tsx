import Visualizer from "./components/visualizer";
import { AudioProvider } from "./contexts/AudioContext";
import { ScreenProvider } from "./contexts/ScreenContext";

export default function App() {
  return (
    <AudioProvider>
      <ScreenProvider>
        <Visualizer />
      </ScreenProvider>
    </AudioProvider>
  );
}
