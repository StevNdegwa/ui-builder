import { generate } from "@modules/utils/svg";
import { FC, useEffect, useRef } from "react";
import { AddActions, Overlay } from "./styles";

export type FramesProps = {
  elements: BuildableFrameConfig[];
};

export const Frames: FC<FramesProps> = ({ elements }) => {
  const overlayRef = useRef<SVGGElement>(null);
  const addActionsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const overlayEl = overlayRef.current;
    const addActionsEl = addActionsRef.current;

    if (elements.length) {
      if (overlayEl) {
        const frameRectConfigs: ElementConfigType[] = elements.map(
          ({ width, height, x, y }) => ({
            name: "rect",
            attributes: [
              { name: "width", value: width },
              { name: "height", value: height },
              { name: "x", value: x },
              { name: "y", value: y },
            ],
          })
        );

        generate(frameRectConfigs).forEach((element) => {
          overlayEl.appendChild(element);
        });
      }

      if (addActionsEl) {
        const frameActionConfigs: ElementConfigType[] = elements.map(
          ({ width, height, x, y }) => ({
            name: "g",
            attributes: [
              {
                name: "transform",
                value: `translate(${x + width / 2}, ${y + height / 2})`,
              },
            ],
            children: [
              {
                name: "circle",
                attributes: [
                  { name: "cx", value: 0 },
                  { name: "cy", value: 0 },
                  { name: "r", value: 16 },
                ],
              },
              {
                name: "line",
                attributes: [
                  { name: "x1", value: 0 },
                  { name: "y1", value: -8 },
                  { name: "x2", value: 0 },
                  { name: "y2", value: 8 },
                  { name: "stroke", value: "white" },
                  { name: "stroke-width", value: 2 },
                ],
              },
              {
                name: "line",
                attributes: [
                  { name: "x1", value: -8 },
                  { name: "y1", value: 0 },
                  { name: "x2", value: 8 },
                  { name: "y2", value: 0 },
                  { name: "stroke", value: "white" },
                  { name: "stroke-width", value: 2 },
                ],
              },
            ],
          })
        );

        generate(frameActionConfigs).forEach((element) => {
          addActionsEl.appendChild(element);
        });
      }
    }

    return () => {
      if (overlayEl) {
        overlayEl.innerHTML = "";
      }
      if (addActionsEl) {
        addActionsEl.innerHTML = "";
      }
    };
  }, [elements, overlayRef, addActionsRef]);

  return (
    <>
      <Overlay ref={overlayRef} />
      <AddActions ref={addActionsRef} />
    </>
  );
};
