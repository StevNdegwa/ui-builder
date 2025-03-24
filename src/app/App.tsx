/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  FormEventHandler,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Dashboard } from "@ui/components/pages";
import { GlobalStyle, ThemeProvider } from "@ui/styles";

import "@modules/controls";
import BuilderContext from "./context/BuilderContext";
import { BuildableControl, Frame } from "@modules/builder";
import {
  Button,
  ColorInput,
  FlexBox,
  LengthInputControl,
} from "@ui/components";

export default function App() {
  const [, setWidth] = useState("100%");
  const [, setHeight] = useState("100%");
  const buildableControlRef = useRef<BuildableControl | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bc = new BuildableControl();
    const frameRefEl = frameRef.current;

    if (frameRefEl) {
      frameRefEl.appendChild(bc.getElement());

      buildableControlRef.current = bc;
    }

    return () => {
      if (frameRefEl && bc.getElement()) {
        bc.getElement().remove();
      }
    };
  }, []);

  const updateHeightHandler = (newValue: string) => {
    if (buildableControlRef.current) {
      buildableControlRef.current.updateProperties("height", newValue);
    }
  };

  const updateWidthHandler = (newValue: string) => {
    if (buildableControlRef.current) {
      buildableControlRef.current.updateProperties("width", newValue);
    }
  };

  const updateBgHandler: FormEventHandler<HTMLInputElement> = (event) => {
    if (buildableControlRef.current) {
      buildableControlRef.current.updateProperties(
        "background-color",
        event.currentTarget.value
      );
    }
  };

  const saveElement = () => {
    if (buildableControlRef.current) {
      console.log(buildableControlRef.current.getElementString());
    }
  };

  useLayoutEffect(() => {
    import("@modules/controls/Section/Section");
  }, []);

  return (
    <ThemeProvider>
      <BuilderContext value={{ activeBuildable: null }}>
        <GlobalStyle />
        <Dashboard
          settingsForm={
            <>
              <FlexBox direction="column" gap="sm">
                <LengthInputControl
                  onChange={updateWidthHandler}
                  placeholder="Width"
                />
                <LengthInputControl
                  onChange={updateHeightHandler}
                  placeholder="Height"
                />
                <ColorInput onChange={updateBgHandler} />

                <FlexBox justify="end">
                  <Button size="sm" onClick={saveElement}>
                    Save
                  </Button>
                </FlexBox>
              </FlexBox>
            </>
          }
        >
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
