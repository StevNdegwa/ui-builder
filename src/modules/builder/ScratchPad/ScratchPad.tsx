import {
  FC,
  useRef,
  useState,
  useLayoutEffect,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import range from "lodash/range";
import { GridLabelsX, GridLabelsY, Wrapper, XYIndicator } from "./style";
import { generate } from "@modules/utils/svg";

export type ScratchPadProps = PropsWithChildren<{
  height: number;
  width: number;
  stopMoving: () => void;
  setGridPosition: (position: Pos) => void;
}>;

export const ScratchPad: FC<ScratchPadProps> = ({
  width,
  height,
  stopMoving,
  setGridPosition,
}) => {
  const scratChPadRef = useRef<SVGRectElement>(null);
  const gridXLabelsRef = useRef<SVGGElement>(null);
  const gridYLabelsRef = useRef<SVGGElement>(null);
  const [scratchpadStartPosition, setScratchPadStartPosition] = useState<Pos>({
    x: 0,
    y: 0,
  });
  const [scratchpadPosition, setScratchPadPosition] = useState<Pos>({
    x: 0,
    y: 0,
  });

  const onMouseMove: MouseEventHandler<SVGRectElement> = (event) => {
    const newPos = {
      x: event.clientX - scratchpadStartPosition.x,
      y: event.clientY - scratchpadStartPosition.y,
    };

    setGridPosition(newPos);
    setScratchPadPosition(newPos);
  };

  useLayoutEffect(() => {
    if (scratChPadRef.current) {
      const boundingRect = scratChPadRef.current.getBoundingClientRect();
      setScratchPadStartPosition({ x: boundingRect.x, y: boundingRect.y });
    }
  }, [scratChPadRef]);

  useLayoutEffect(() => {
    const gridLabelXEl = gridXLabelsRef.current;
    const gridLabelYEl = gridYLabelsRef.current;

    const percentageArr = [100];

    percentageArr.unshift(...range(0, 100, 10));

    if (gridLabelXEl && width > 0) {
      const xTextConfigs: ElementConfigType[] = percentageArr.map((data) => ({
        name: "text",
        textContent: data + "%",
        attributes: [
          { name: "x", value: (data * width) / 100 + "px" },
          { name: "font-size", value: "10" },
          { name: "fill", value: "black" },
        ],
      }));

      generate(xTextConfigs).forEach((element) => {
        gridLabelXEl.appendChild(element);
      });
    }

    if (gridLabelYEl && height > 0) {
      const yTextConfigs: ElementConfigType[] = percentageArr.map((data) => ({
        name: "text",
        textContent: data + "%",
        attributes: [
          { name: "y", value: (data * height) / 100 + "px" },
          { name: "font-size", value: "10" },
          { name: "fill", value: "black" },
          {
            name: "writing-mode",
            value: "vertical-lr",
          },
        ],
      }));

      generate(yTextConfigs).forEach((element) => {
        gridLabelYEl.appendChild(element);
      });
    }

    return () => {
      if (gridLabelXEl) {
        gridLabelXEl.innerHTML = "";
      }
    };
  }, [width, gridXLabelsRef, height]);

  return (
    <g>
      <Wrapper
        height={height}
        width={width}
        onMouseMove={onMouseMove}
        onClick={stopMoving}
        ref={scratChPadRef}
      />
      <GridLabelsX ref={gridXLabelsRef} />
      <GridLabelsY ref={gridYLabelsRef} />
      <XYIndicator
        x1={scratchpadPosition.x}
        y1={0}
        x2={scratchpadPosition.x}
        y2={"100%"}
      />
      <XYIndicator
        x1={0}
        y1={scratchpadPosition.y}
        x2={"100%"}
        y2={scratchpadPosition.y}
      />
    </g>
  );
};
