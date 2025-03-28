import {
  useLayoutEffect,
  useState,
  useRef,
  forwardRef,
  PropsWithChildren,
  useEffect,
} from "react";
import { ScratchPad } from "../ScratchPad";
import {
  Contents,
  Editor,
  ScratchpadContainer,
  SettingsForm,
  Wrapper,
} from "./styles";
import { Frames } from "../Frames";
import { useForwardRef } from "@modules/utils/hooks";
import { BUILDER_PADDING } from "../constants";
import { useBuildableEditActions } from "../utils/hooks/useBuildableEditActions";
import {
  Button,
  ColorInput,
  FlexBox,
  LengthInputControl,
  Typography,
} from "@ui/components";

export type BuilderProps = PropsWithChildren;
export const Builder = forwardRef<HTMLDivElement, BuilderProps>(
  ({ children }, ref) => {
    const contentsWrapperRef = useForwardRef<HTMLDivElement>(ref);
    const actionsRef = useRef<SVGGElement>(null);
    const scratchPadRef = useRef<SVGRectElement>(null);
    const rectRef = useRef<SVGSVGElement>(null);
    const [scratchPadWidth, setScratchPadWidth] = useState(0);
    const [scratchPadHeight, setScratchPadHeight] = useState(0);
    const uiBuildableElementsLen =
      contentsWrapperRef.current?.querySelectorAll(".ui-buildable").length || 0;

    const [buildableElements, setBuildableElements] = useState<
      BuildableFrameConfig[]
    >([]);

    useBuildableEditActions(buildableElements, scratchPadRef, actionsRef);

    useLayoutEffect(() => {
      if (rectRef.current) {
        const boundingRect = rectRef.current.getBoundingClientRect();
        setScratchPadWidth(boundingRect.width);
        setScratchPadHeight(boundingRect.height);
      }
    }, [rectRef]);

    useEffect(() => {
      // Add setTimeout to allow the DOM to update

      /**
       *  TODO find a better way to wait for element loading
       */
      setTimeout(() => {
        const contentsWrapperEl = contentsWrapperRef.current;

        if (contentsWrapperEl && uiBuildableElementsLen > 0) {
          const contentStart = contentsWrapperEl.getBoundingClientRect();

          setBuildableElements(
            Array.from(
              contentsWrapperRef.current?.querySelectorAll(".ui-buildable") ||
                []
            ).map((element) => {
              const box = element.getBoundingClientRect();

              const config = {
                left: box.left,
                top: box.top,
                width: box.width,
                height: box.height,
                x: box.x - contentStart.x + BUILDER_PADDING,
                y: box.y - contentStart.y + BUILDER_PADDING,
                element,
              };

              return config;
            })
          );
        }
      }, 1);
    }, [contentsWrapperRef, uiBuildableElementsLen]);

    return (
      <Wrapper gap="sm">
        <Editor>
          <Contents ref={contentsWrapperRef}>{children}</Contents>
          <ScratchpadContainer>
            <svg
              width="100%"
              height="100%"
              data-name="Element Frame"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              ref={rectRef}
              strokeWidth={2}
            >
              <ScratchPad
                width={scratchPadWidth}
                height={scratchPadHeight}
                ref={scratchPadRef}
              >
                <Frames ref={actionsRef} />
              </ScratchPad>
            </svg>
          </ScratchpadContainer>
        </Editor>
        <SettingsForm>
          <FlexBox direction="column" gap="md">
            <Typography heading="h4">Settings</Typography>
            <FlexBox direction="column" gap="sm">
              <FlexBox gap="xs">
                <LengthInputControl placeholder="Width" />
                <LengthInputControl placeholder="Height" />
              </FlexBox>
              <ColorInput />
            </FlexBox>
            <FlexBox direction="column" gap="sm">
              <Button color="primary">Save</Button>
            </FlexBox>
          </FlexBox>
        </SettingsForm>
      </Wrapper>
    );
  }
);
