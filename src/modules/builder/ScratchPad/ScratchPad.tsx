import {
  useRef,
  useState,
  useLayoutEffect,
  MouseEventHandler,
  PropsWithChildren,
  forwardRef,
} from "react";
import range from "lodash/range";
import { useForwardRef } from "@modules/utils/hooks";
import { GridLabelsX, GridLabelsY, Wrapper, XYIndicator } from "./style";
import { BUILDER_PADDING } from "../constants";

import { generate } from "../elements";

export type ScratchPadProps = PropsWithChildren<{
  height: number;
  width: number;
}>;

export const ScratchPad = forwardRef<SVGRectElement, ScratchPadProps>(
  ({ children, width, height }, ref) => {
    const scratChPadRef = useForwardRef<SVGRectElement>(ref);
    const gridXLabelsRef = useRef<SVGGElement>(null);
    const gridYLabelsRef = useRef<SVGGElement>(null);
    const [scratchpadStartPosition, setScratchPadStartPosition] = useState<Pos>(
      {
        x: 0,
        y: 0,
      }
    );
    const [scratchpadPosition, setScratchPadPosition] = useState<Pos>({
      x: 0,
      y: 0,
    });

    const onMouseMove: MouseEventHandler<SVGRectElement> = (event) => {
      const newPos = {
        x: event.clientX - scratchpadStartPosition.x,
        y: event.clientY - scratchpadStartPosition.y,
      };

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

      const percentageArr = [100];

      percentageArr.unshift(...range(0, 100, 10));

      if (gridLabelXEl && width > 0) {
        const xTextConfigs: ElementConfigType[] = percentageArr.map((data) => ({
          name: "text",
          textContent: data + "%",
          attributes: {
            x: (data * (width - BUILDER_PADDING * 2)) / 100 + "px",
            "font-size": 10,
            fill: "black",
          },
        }));

        generate(xTextConfigs).forEach((element) => {
          gridLabelXEl.appendChild(element);
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
          ref={scratChPadRef}
        />
        <GridLabelsX transform={`translate(10, 8)`} ref={gridXLabelsRef} />
        <GridLabelsY transform={`translate(4, 10)`} ref={gridYLabelsRef} />
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
        {children}
      </g>
    );
  }
);
