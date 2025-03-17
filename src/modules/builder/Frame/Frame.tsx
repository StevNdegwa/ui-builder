import {
  FC,
  PropsWithChildren,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { ScratchPad } from "../ScratchPad";
import { Resize } from "../Resize";
import { Contents, SvgWrapper, Wrapper } from "./styles";

export type FrameProps = PropsWithChildren<{
  setElementWidth: (width: string) => void;
  setElementHeight: (height: string) => void;
}>;

export const Frame: FC<FrameProps> = ({ children, setElementWidth }) => {
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
    (position: number) => {
      setHorizontalPosition(position);
      setElementWidth(Math.round((position / scratchPadWidth) * 100) + "%");
    },
    [scratchPadWidth, setElementWidth]
  );

  useLayoutEffect(() => {
    if (rectRef.current) {
      const boundingRect = rectRef.current.getBoundingClientRect();
      setHorizontalPosition(boundingRect.width - 10);
      setScratchPadWidth(boundingRect.width - 10);
      setScratchPadHeight(boundingRect.height - 10);
    }
  }, [rectRef]);

  return (
    <Wrapper>
      <Contents>{children}</Contents>
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
            isMoving={isMoving}
            stopMoving={stopMoving}
            setHorizontalPosition={updateHorizontalPosition}
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
};
