import React, { createContext, useContext, useEffect, useState } from "react";

interface ScreenContextInterface {
  width: number;
  height: number;

  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
}

const ScreenContext = createContext<ScreenContextInterface | undefined>(undefined);

export const useScreenContext = () => {
  const context = useContext(ScreenContext);
  if (context === undefined) {
    throw new Error("useScreenContext must be used within a ScreenProvider");
  }
  return context;
};

export default ScreenContext;

export function ScreenProvider({ children }: React.PropsWithChildren) {
  const [width, setWidth] = useState<number>(process.stdout.columns);
  const [height, setHeight] = useState<number>(process.stdout.rows);

  useEffect(() => {
    const onResize = () => {
      setWidth(process.stdout.columns);
      setHeight(process.stdout.rows);
    };

    process.stdout.on("resize", onResize);

    return () => {
      process.stdout.off("resize", onResize);
    };
  }, []);

  return <ScreenContext.Provider value={{ width, height, setWidth, setHeight }}>{children}</ScreenContext.Provider>;
}
