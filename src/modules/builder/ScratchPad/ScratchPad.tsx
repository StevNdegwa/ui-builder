import {
  FC,
  useRef,
  useState,
  useLayoutEffect,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import { Wrapper } from "./style";

export type ScratchPadProps = PropsWithChildren<{
  height: number;
  width: number;
  stopMoving: () => void;
  isMoving: boolean;
  setHorizontalPosition: (position: number) => void;
}>;

export const ScratchPad: FC<ScratchPadProps> = ({
  width,
  height,
  isMoving,
  stopMoving,
  setHorizontalPosition,
  children,
}) => {
  const scratChPadRef = useRef<SVGRectElement>(null);
  const [scratchpadXPosition, setScratchPadXPosition] = useState<number>(0);

  const onMouseMove: MouseEventHandler<SVGRectElement> = (event) => {
    if (isMoving) {
      setHorizontalPosition(event.clientX - scratchpadXPosition);
    }
  };

  useLayoutEffect(() => {
    if (scratChPadRef.current) {
      const boundingRect = scratChPadRef.current.getBoundingClientRect();
      setScratchPadXPosition(boundingRect.x);
    }
  }, [scratChPadRef]);

  return (
    <g>
      <Wrapper
        height={height}
        width={width}
        x="5"
        y="5"
        onMouseMove={onMouseMove}
        onClick={stopMoving}
        ref={scratChPadRef}
        fill="red"
      />
      {children}
    </g>
  );
};
