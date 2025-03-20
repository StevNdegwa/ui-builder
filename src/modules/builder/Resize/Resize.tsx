import { FC, useState } from "react";
import { Indicator, Thumb } from "./styles";

export type ResizeProps = {
  length: number;
  isMoving: boolean;
  startMoving: () => void;
  stopMoving: () => void;
  position: {
    x: number;
    y: number;
  };
};

export const Resize: FC<ResizeProps> = ({
  length,
  isMoving,
  startMoving,
  stopMoving,
  position: { x: horizontalPosition },
}) => {
  const [showIndicator, setShowIndicator] = useState(false);

  const onMouseEnterThumb = () => {
    setShowIndicator(true);
  };

  const onMouseLeaveThumb = () => {
    setShowIndicator(false);
  };

  return (
    <g>
      <Indicator
        x1={horizontalPosition}
        y1="0"
        x2={horizontalPosition}
        y2={length}
        pointerEvents={"none"}
        $show={showIndicator || isMoving}
      />
      <Thumb
        cx={horizontalPosition}
        cy={"50%"}
        r="5"
        onMouseDown={startMoving}
        onMouseUp={stopMoving}
        onMouseEnter={onMouseEnterThumb}
        onMouseLeave={onMouseLeaveThumb}
      />
    </g>
  );
};
