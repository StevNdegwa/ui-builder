import { useEffect } from "react";
import { finalize, fromEvent, map, Subscription } from "rxjs";
import { BuildableControl } from "@modules/builder/BuildableControl";
import { BuilderElementsGeometry } from "../../utils/BuilderElementsGeometry";
import { generate } from "@modules/builder/elements";

export function useResizeActions(
  elements: BuildableFrameConfig<BuildableControl>[],
  scratchPadRef: React.RefObject<SVGRectElement | null>,
  resizeActionsRef: React.RefObject<SVGGElement | null>
) {
  useEffect(() => {
    const scratchPadEl = scratchPadRef.current;
    const resizeActionsEL = resizeActionsRef.current;

    if (elements.length && scratchPadEl) {
      if (resizeActionsEL) {
        const resizeActionConfigs: ElementConfigType[] = elements.map(
          ({ width, height, x, y, elementControl }) => {
            const configType = {
              name: "g",
              classNames: [
                "resize-actions-group",
                `${elementControl.elementName}-resize-action-group`,
                `${elementControl.uniqueIdClassName}-resize-action-group`,
              ],
              attributes: {
                transform: `translate(${x}, ${y})`,
                opacity: "0",
              },
              data: {
                buildableRef: elementControl.uniqueId,
                buildableRefType: elementControl.elementName,
              },
              children: [
                {
                  name: "rect",
                  classNames: [
                    "resize-overlay",
                    `${elementControl.elementName}-resize-overlay`,
                  ],
                  attributes: {
                    ...BuilderElementsGeometry.overlay({ width, height }),
                  },
                },
                {
                  name: "line",
                  classNames: [
                    "resize-thumb",
                    "resize-top-thumb",
                    `${elementControl.elementName}-resize-thumb`,
                    `${elementControl.elementName}-resize-top-thumb`,
                  ],
                  attributes: {
                    ...BuilderElementsGeometry.topThumb({ width, height }),
                  },
                },
                {
                  name: "line",
                  classNames: [
                    "resize-thumb",
                    "resize-right-thumb",
                    `${elementControl.elementName}-resize-thumb`,
                    `${elementControl.elementName}-resize-right-thumb`,
                  ],
                  attributes: {
                    ...BuilderElementsGeometry.rightThumb({ width, height }),
                  },
                },
                {
                  name: "line",
                  classNames: [
                    "resize-thumb",
                    "resize-bottom-thumb",
                    `${elementControl.elementName}-resize-thumb`,
                    `${elementControl.elementName}-resize-bottom-thumb`,
                  ],
                  attributes: {
                    ...BuilderElementsGeometry.bottomThumb({ width, height }),
                  },
                },
                {
                  name: "line",
                  classNames: [
                    "resize-thumb",
                    "resize-left-thumb",
                    `${elementControl.elementName}-resize-thumb`,
                    `${elementControl.elementName}-resize-left-thumb`,
                  ],
                  attributes: {
                    ...BuilderElementsGeometry.leftThumb({ width, height }),
                  },
                },
              ],
            } as ElementConfigType;

            return configType;
          }
        );

        const resizeActionElements = generate(resizeActionConfigs);

        resizeActionElements.forEach((element, index) => {
          resizeActionsEL.appendChild(element);

          const control: BuildableControl = elements[index].elementControl;

          const resizeOverlay = element.querySelector(
            "rect.resize-overlay"
          ) as SVGLineElement;
          const resizeRightThumb = element.querySelector(
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

          const getRectElementBounds = () =>
            resizeOverlay.getBoundingClientRect();

          let bottomThumbMouseMoveEvtSubscription: Subscription | null = null;
          let rightThumbMouseMoveEvtSubscription: Subscription | null = null;

          let bottomThumbMouseMoveEvtTimeout: ReturnType<typeof setTimeout>;
          let rightThumbMouseMoveEvtTimeout: ReturnType<typeof setTimeout>;

          const scratchPadMouseMoveEvt = fromEvent(
            scratchPadEl,
            "mousemove"
          ).pipe(
            map((event) => () => {
              const { width, height } = scratchPadEl.getBoundingClientRect();
              const { x, y } = getRectElementBounds();

              return [
                Math.min((event as MouseEvent).clientX - x, width),
                Math.min((event as MouseEvent).clientY - y, height),
              ];
            }),
            finalize(() => {
              resizeActionElements.forEach((el) => {
                const elResizeOverlay = el.querySelector(
                  "rect.resize-overlay"
                ) as SVGLineElement;

                elResizeOverlay?.setAttribute("pointer-events", "all");
              });

              rightThumbMouseMoveEvtSubscription = null;
              bottomThumbMouseMoveEvtSubscription = null;

              console.log("Resize action mouse move event unsubscribed");
            })
          );

          fromEvent(
            [resizeBottomThumb, scratchPadEl, resizeOverlay],
            "mouseup"
          ).subscribe(() => bottomThumbMouseMoveEvtSubscription?.unsubscribe());

          fromEvent([resizeRightThumb, scratchPadEl], "mouseup").subscribe(() =>
            rightThumbMouseMoveEvtSubscription?.unsubscribe()
          );

          fromEvent(
            [resizeBottomThumb, scratchPadEl, element],
            "click"
          ).subscribe(() => bottomThumbMouseMoveEvtSubscription?.unsubscribe());

          fromEvent(
            [resizeRightThumb, scratchPadEl, element],
            "click"
          ).subscribe(() => rightThumbMouseMoveEvtSubscription?.unsubscribe());

          fromEvent(
            [
              resizeOverlay,
              resizeRightThumb,
              resizeTopThumb,
              resizeLeftThumb,
              resizeBottomThumb,
            ],
            "mouseover"
          ).subscribe(() => {
            element.setAttribute("opacity", "1");
          });

          fromEvent(resizeOverlay, "mouseleave").subscribe(() => {
            element.setAttribute("opacity", "0");
          });

          fromEvent(resizeRightThumb, "mousedown").subscribe(() => {
            rightThumbMouseMoveEvtSubscription =
              scratchPadMouseMoveEvt.subscribe((getPosition) => {
                clearTimeout(rightThumbMouseMoveEvtTimeout);

                if (rightThumbMouseMoveEvtSubscription) {
                  const [newXPos] = getPosition();

                  resizeRightThumb?.setAttribute("x1", `${newXPos - 2}`);
                  resizeRightThumb?.setAttribute("x2", `${newXPos - 2}`);

                  resizeTopThumb?.setAttribute("x1", `${newXPos * 0.375}`);
                  resizeTopThumb?.setAttribute("x2", `${newXPos * 0.625}`);

                  resizeBottomThumb?.setAttribute("x1", `${newXPos * 0.375}`);
                  resizeBottomThumb?.setAttribute("x2", `${newXPos * 0.625}`);

                  resizeOverlay?.setAttribute("width", `${newXPos}`);

                  control.updateProperty("width", newXPos + "px");
                }

                rightThumbMouseMoveEvtTimeout = setTimeout(() => {
                  rightThumbMouseMoveEvtSubscription?.unsubscribe();
                }, 40);
              });

            resizeActionElements.forEach((el) => {
              const elResizeOverlay = el.querySelector(
                "rect.resize-overlay"
              ) as SVGLineElement;

              elResizeOverlay?.setAttribute("pointer-events", "none");
            });
          });

          fromEvent(resizeBottomThumb, "mousedown").subscribe(() => {
            bottomThumbMouseMoveEvtSubscription =
              scratchPadMouseMoveEvt.subscribe((getPosition) => {
                if (bottomThumbMouseMoveEvtSubscription) {
                  clearTimeout(bottomThumbMouseMoveEvtTimeout);

                  const [, newYPos] = getPosition();
                  resizeBottomThumb?.setAttribute("y1", `${newYPos - 2}`);
                  resizeBottomThumb?.setAttribute("y2", `${newYPos - 2}`);

                  resizeRightThumb?.setAttribute("y1", `${newYPos * 0.375}`);
                  resizeRightThumb?.setAttribute("y2", `${newYPos * 0.625}`);

                  resizeLeftThumb?.setAttribute("y1", `${newYPos * 0.375}`);
                  resizeLeftThumb?.setAttribute("y2", `${newYPos * 0.625}`);

                  resizeOverlay?.setAttribute("height", `${newYPos}`);

                  control.updateProperty("height", newYPos + "px");

                  bottomThumbMouseMoveEvtTimeout = setTimeout(() => {
                    bottomThumbMouseMoveEvtSubscription?.unsubscribe();
                  }, 40);
                }
              });

            resizeOverlay?.setAttribute("pointer-events", "none");
          });
        });
      }
    }

    return () => {
      if (resizeActionsEL) {
        resizeActionsEL.innerHTML = "";
      }
    };
  }, [elements, scratchPadRef, resizeActionsRef]);
}
