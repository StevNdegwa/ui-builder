import { generate } from "@modules/utils/svg";
import { FC, useEffect, useRef } from "react";
import { AddActions, ResizeActions } from "./styles";

export type FramesProps = {
  elements: BuildableFrameConfig[];
};

export const Frames: FC<FramesProps> = ({ elements }) => {
  const addActionsRef = useRef<SVGGElement>(null);
  const resizeActionsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const addActionsEl = addActionsRef.current;
    const resizeActionsEl = resizeActionsRef.current;

    if (elements.length) {
      if (resizeActionsEl) {
        const resizeActionConfigs: ElementConfigType[] = elements.map(
          ({ width, height, x, y }) => ({
            name: "g",
            attributes: [
              {
                name: "transform",
                value: `translate(${x}, ${y})`,
              },
            ],
            children: [
              {
                name: "rect",
                classNames: ["resize-overlay"],
                attributes: [
                  { name: "width", value: width },
                  { name: "height", value: height },
                  { name: "x", value: 0 },
                  { name: "y", value: 0 },
                ],
              },
              {
                name: "line",
                classNames: ["resize-top-thumb"],
                attributes: [
                  { name: "x1", value: 0 },
                  { name: "y1", value: 0 },
                  { name: "x2", value: width },
                  { name: "y2", value: 0 },
                ],
              },
              {
                name: "line",
                classNames: ["resize-right-thumb"],
                attributes: [
                  { name: "x1", value: width },
                  { name: "y1", value: 0 },
                  { name: "x2", value: width },
                  { name: "y2", value: height },
                ],
              },
              {
                name: "line",
                classNames: ["resize-bottom-thumb"],
                attributes: [
                  { name: "x1", value: 0 },
                  { name: "y1", value: height },
                  { name: "x2", value: width },
                  { name: "y2", value: height },
                ],
              },
              {
                name: "line",
                classNames: ["resize-left-thumb"],
                attributes: [
                  { name: "x1", value: 0 },
                  { name: "y1", value: 0 },
                  { name: "x2", value: 0 },
                  { name: "y2", value: height },
                ],
              },
            ],
          })
        );

        generate(resizeActionConfigs).forEach((element) => {
          resizeActionsEl.appendChild(element);

          const resizeOverlay = element.querySelector(".resize-overlay");
          const resizeLine = element.querySelector(".resize-right-thumb");
          const resizeTopThumb = element.querySelector(".resize-top-thumb");
          const resizeBottomThumb = element.querySelector(
            ".resize-bottom-thumb"
          );
          const resizeLeftThumb = element.querySelector(".resize-left-thumb");

          const { x, width } = element.getBoundingClientRect();

          const mouseMoveHandler = (e: MouseEvent) => {
            e.stopPropagation();

            const newPos = Math.min(e.clientX - x, width);

            resizeLine?.setAttribute("x1", `${newPos}`);
            resizeLine?.setAttribute("x2", `${newPos}`);

            resizeTopThumb?.setAttribute("x2", `${newPos}`);
            resizeBottomThumb?.setAttribute("x2", `${newPos}`);

            resizeOverlay?.setAttribute("width", `${newPos}`);
          };

          if (resizeLine) {
            resizeLine.addEventListener("mousedown", (e) => {
              e.stopPropagation();

              element.addEventListener("mousemove", mouseMoveHandler);

              element.addEventListener("mouseup", (e) => {
                e.stopPropagation();

                element.removeEventListener("mousemove", mouseMoveHandler);
              });

              element.addEventListener("mouseleave", (e) => {
                e.stopPropagation();

                element.removeEventListener("mousemove", mouseMoveHandler);
              });

              element.addEventListener("click", (e) => {
                e.stopPropagation();

                element.removeEventListener("mousemove", mouseMoveHandler);
              });
            });

            resizeLine.addEventListener("mouseup", (e) => {
              e.stopPropagation();

              element.removeEventListener("mousemove", mouseMoveHandler);
            });

            resizeLine.addEventListener("click", (e) => {
              e.stopPropagation();

              element.removeEventListener("mousemove", mouseMoveHandler);
            });
          }
        });
      }

      if (addActionsEl) {
        const addActionConfigs: ElementConfigType[] = elements.map(
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

        generate(addActionConfigs).forEach((element) => {
          addActionsEl.appendChild(element);
        });
      }
    }

    return () => {
      if (resizeActionsEl) {
        resizeActionsEl.innerHTML = "";
      }
      if (addActionsEl) {
        addActionsEl.innerHTML = "";
      }
    };
  }, [elements, addActionsRef]);

  return (
    <>
      <ResizeActions ref={resizeActionsRef} />
      <AddActions ref={addActionsRef} />
    </>
  );
};
