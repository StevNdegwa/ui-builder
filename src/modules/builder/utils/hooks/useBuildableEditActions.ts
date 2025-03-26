import { generate } from "@modules/utils/svg";
import { useEffect } from "react";

export function useBuildableEditActions(
  elements: BuildableFrameConfig[],
  scratchPadRef: React.RefObject<SVGRectElement | null>,
  addActionsRef: React.RefObject<SVGGElement | null>,
  resizeActionsRef: React.RefObject<SVGGElement | null>
) {
  useEffect(() => {
    const scratchPadEl = scratchPadRef.current;
    const addActionsEl = addActionsRef.current;
    const resizeActionsEl = resizeActionsRef.current;

    if (elements.length && scratchPadEl) {
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

          const resizeOverlay = element.querySelector("rect.resize-overlay");
          const resizeLine = element.querySelector("line.resize-right-thumb");
          const resizeTopThumb = element.querySelector("line.resize-top-thumb");
          const resizeBottomThumb = element.querySelector(
            ".resize-bottom-thumb"
          );

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

              scratchPadEl.addEventListener("mousemove", mouseMoveHandler);

              scratchPadEl.addEventListener("mouseup", (e) => {
                e.stopPropagation();

                scratchPadEl.removeEventListener("mousemove", mouseMoveHandler);
              });

              element.addEventListener("click", (e) => {
                e.stopPropagation();

                element.removeEventListener("mousemove", mouseMoveHandler);
              });

              resizeOverlay?.setAttribute("pointer-events", "none");
            });

            resizeLine.addEventListener("mouseup", (e) => {
              e.stopPropagation();

              console.log("mouseup");

              scratchPadEl.removeEventListener("mousemove", mouseMoveHandler);
            });

            resizeLine.addEventListener("click", (e) => {
              e.stopPropagation();

              scratchPadEl.removeEventListener("mousemove", mouseMoveHandler);

              console.log("click");
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
  }, [elements, addActionsRef, scratchPadRef, resizeActionsRef]);
}
