import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dashboard } from "@ui/components/pages";
import { GlobalStyle, ThemeProvider } from "@ui/styles";

import "@modules/controls";
import BuilderContext from "./context/BuilderContext";
import { Frame } from "@modules/builder";
import { UISection } from "@modules/controls";

export default function App() {
  const [, setWidth] = useState("100%");
  const [, setHeight] = useState("100%");

  const sectionRef = useRef<UISection>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    console.log(sectionRef.current?.serializeELement());
  };

  const createElement = () => {
    const element = document.createElement("ui-section");
    element.setAttribute("props", JSON.stringify({ background: "#f0f0f0" }));
    return element;
  };

  useEffect(() => {
    const element = createElement();
    const frameRefEl = frameRef.current;

    if (frameRefEl) {
      frameRefEl.appendChild(element);
    }

    return () => {
      if (frameRefEl && element) {
        element.remove();
      }
    };
  }, []);

  useLayoutEffect(() => {
    import("@modules/controls/Section/Section");
  }, []);

  return (
    <ThemeProvider>
      <BuilderContext value={{ activeBuildable: null }}>
        <GlobalStyle />
        <Dashboard saveElement={handleSave}>
          <Frame
            setElementWidth={setWidth}
            setElementHeight={setHeight}
            ref={frameRef}
          />
        </Dashboard>
      </BuilderContext>
    </ThemeProvider>
  );
}
