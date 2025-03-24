import {
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
  forwardRef,
} from "react";
import { ScratchPad } from "../ScratchPad";
import { Resize } from "../Resize";
import { Contents, SvgWrapper, Wrapper } from "./styles";

export type BuilderProps = {
  setElementWidth: (width: string) => void;
  setElementHeight: (height: string) => void;
};

export const Builder = forwardRef<HTMLDivElement, BuilderProps>(
  ({ setElementWidth }, ref) => {
    const rectRef = useRef<SVGSVGElement>(null);
    const [isMoving, setIsMoving] = useState(false);
    const [horizontalPosition, setHorizontalPosition] = useState(0);
    const [scratchPadWidth, setScratchPadWidth] = useState(0);
    const [scratchPadHeight, setScratchPadHeight] = useState(0);

    const stopMoving = useCallback(() => {
      setIsMoving(false);
    }, []);

    const startMoving = useCallback(() => {
      setIsMoving(true);
    }, []);

    const onScratchPadMouseLeave = useCallback(() => {
      stopMoving();
    }, [stopMoving]);

    const updateHorizontalPosition = useCallback(
      (position: Pos) => {
        if (isMoving) {
          setHorizontalPosition(position.x);
          setElementWidth(
            Math.round((position.x / scratchPadWidth) * 100) + "%"
          );
        }
      },
      [scratchPadWidth, setElementWidth, isMoving]
    );

    useLayoutEffect(() => {
      if (rectRef.current) {
        const boundingRect = rectRef.current.getBoundingClientRect();
        setHorizontalPosition(boundingRect.width);
        setScratchPadWidth(boundingRect.width);
        setScratchPadHeight(boundingRect.height);
      }
    }, [rectRef]);

    return (
      <Wrapper>
        <Contents ref={ref} />
        <SvgWrapper>
          <svg
            width="100%"
            height="100%"
            data-name="Element Frame"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            ref={rectRef}
            stroke="red"
            strokeWidth={2}
            onMouseLeave={onScratchPadMouseLeave}
          >
            <ScratchPad
              width={scratchPadWidth}
              height={scratchPadHeight}
              stopMoving={stopMoving}
              setGridPosition={updateHorizontalPosition}
            >
              <Resize
                length={scratchPadHeight}
                isMoving={isMoving}
                startMoving={startMoving}
                stopMoving={startMoving}
                position={{ x: horizontalPosition, y: 5 }}
              />
            </ScratchPad>
          </svg>
        </SvgWrapper>
      </Wrapper>
    );
  }
);
