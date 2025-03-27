import { generate } from "@modules/utils/svg";
import { useEffect } from "react";
import { finalize, fromEvent, map, Subscription } from "rxjs";

export function useBuildableEditActions(
  elements: BuildableFrameConfig[],
  scratchPadRef: React.RefObject<SVGRectElement | null>,
  actionsRef: React.RefObject<SVGGElement | null>
) {
  useEffect(() => {
    const scratchPadEl = scratchPadRef.current;
    const actionsEl = actionsRef.current;

    if (elements.length && scratchPadEl) {
      if (actionsEl) {
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
              {
                name: "g",
                classNames: ["add-action"],
                attributes: [
                  {
                    name: "transform",
                    value: `translate(${x + width / 2}, ${y + height / 2})`,
                  },
                  { name: "opacity", value: "0" },
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
                    ],
                  },
                  {
                    name: "line",
                    attributes: [
                      { name: "x1", value: -8 },
                      { name: "y1", value: 0 },
                      { name: "x2", value: 8 },
                      { name: "y2", value: 0 },
                    ],
                  },
                ],
              },
            ],
          })
        );

        generate(resizeActionConfigs).forEach((element) => {
          actionsEl.appendChild(element);

          const resizeOverlay = element.querySelector(
            "rect.resize-overlay"
          ) as SVGLineElement;
          const resizeRightLine = element.querySelector(
            "line.resize-right-thumb"
          ) as SVGLineElement;
          const resizeTopThumb = element.querySelector(
            "line.resize-top-thumb"
          ) as SVGLineElement;
          const resizeBottomThumb = element.querySelector(
            ".resize-bottom-thumb"
          ) as SVGLineElement;
          const resizeLeftThumb = element.querySelector(
            ".resize-left-thumb"
          ) as SVGLineElement;
          const addActionsGroup = element.querySelector(
            "g.add-action"
          ) as SVGGElement;

          const getElementRect = () => element.getBoundingClientRect();

          const scratchPadMouseMoveEvt = fromEvent(
            scratchPadEl,
            "mousemove"
          ).pipe(
            map((event) => () => {
              const { width, height } = scratchPadEl.getBoundingClientRect();
              const { x, y } = getElementRect();

              return [
                Math.min((event as MouseEvent).clientX - x, width),
                Math.min((event as MouseEvent).clientY - y, height),
              ];
            }),
            finalize(() => {
              resizeOverlay?.setAttribute("pointer-events", "all");
            })
          );

          let scratchPadMouseMoveEvtSubscription: Subscription | null = null;

          fromEvent(
            [resizeRightLine, resizeBottomThumb, scratchPadEl],
            "mouseup"
          ).subscribe(() => scratchPadMouseMoveEvtSubscription?.unsubscribe());

          fromEvent(
            [resizeBottomThumb, resizeRightLine, scratchPadEl, element],
            "click"
          ).subscribe(() => {
            scratchPadMouseMoveEvtSubscription?.unsubscribe();
          });

          if (resizeOverlay) {
            fromEvent(resizeOverlay, "mouseover").subscribe(() => {
              addActionsGroup.setAttribute("opacity", "1");
            });
            fromEvent(resizeOverlay, "mouseleave").subscribe(() => {
              addActionsGroup.setAttribute("opacity", "0");
            });
          }

          if (addActionsGroup) {
            fromEvent(addActionsGroup, "mouseover").subscribe(() => {
              addActionsGroup.setAttribute("opacity", "1");
            });
            fromEvent(addActionsGroup, "mouseleave").subscribe(() => {
              addActionsGroup.setAttribute("opacity", "0");
            });
          }

          if (resizeRightLine) {
            fromEvent(resizeRightLine, "mousedown").subscribe(() => {
              scratchPadMouseMoveEvtSubscription =
                scratchPadMouseMoveEvt.subscribe((getPosition) => {
                  const [newXPos] = getPosition();
                  const { height } = getElementRect();

                  resizeRightLine?.setAttribute("x1", `${newXPos}`);
                  resizeRightLine?.setAttribute("x2", `${newXPos}`);

                  resizeTopThumb?.setAttribute("x2", `${newXPos}`);
                  resizeBottomThumb?.setAttribute("x2", `${newXPos}`);

                  resizeOverlay?.setAttribute("width", `${newXPos}`);

                  addActionsGroup.setAttribute(
                    "transform",
                    `translate(${newXPos / 2}, ${height / 2})`
                  );
                });

              resizeOverlay?.setAttribute("pointer-events", "none");
            });
          }

          if (resizeBottomThumb) {
            fromEvent(resizeBottomThumb, "mousedown").subscribe(() => {
              scratchPadMouseMoveEvtSubscription =
                scratchPadMouseMoveEvt.subscribe((getPosition) => {
                  const [, newYPos] = getPosition();
                  const { width } = getElementRect();
                  resizeBottomThumb?.setAttribute("y1", `${newYPos}`);
                  resizeBottomThumb?.setAttribute("y2", `${newYPos}`);

                  resizeRightLine?.setAttribute("y2", `${newYPos}`);

                  resizeLeftThumb?.setAttribute("y2", `${newYPos}`);

                  resizeOverlay?.setAttribute("height", `${newYPos}`);

                  addActionsGroup.setAttribute(
                    "transform",
                    `translate(${width / 2}, ${newYPos / 2})`
                  );
                });

              resizeOverlay?.setAttribute("pointer-events", "none");
            });
          }
        });
      }
    }

    return () => {
      if (actionsEl) {
        actionsEl.innerHTML = "";
      }
    };
  }, [elements, scratchPadRef, actionsRef]);
}
