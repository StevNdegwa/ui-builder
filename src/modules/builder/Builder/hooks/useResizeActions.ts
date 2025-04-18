import { useEffect, useState } from "react";
import { finalize, fromEvent, map, Subscription } from "rxjs";
import { BuildableControl } from "@modules/builder/BuildableControl";
import { BuildableFrameConfig } from "@modules/builder/type";
import { generate } from "@modules/utils/svg";
import { ResizeActionGeometry } from "../../utils/ResizeActionGeometry";

export function useResizeActions(
  elements: BuildableFrameConfig[],
  scratchPadRef: React.RefObject<SVGRectElement | null>,
  resizeActionsRef: React.RefObject<SVGGElement | null>
) {
  const [activeElementID, setActiveElementID] = useState<string | undefined>(
    undefined
  );
  const [addElementsModalOpen, setAddElementsModal] = useState(false);

  const closeAddElementsModal = () => setAddElementsModal(false);

  const openAddElementsModal = () => setAddElementsModal(true);

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
                    ...ResizeActionGeometry.overlay({ width, height }),
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
                    ...ResizeActionGeometry.topThumb({ width, height }),
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
                    ...ResizeActionGeometry.rightThumb({ width, height }),
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
                    ...ResizeActionGeometry.bottomThumb({ width, height }),
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
                    ...ResizeActionGeometry.leftThumb({ width, height }),
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
          const editActions = element.querySelector(
            "g.edit-action > circle"
          ) as SVGGElement;
          const editActionGroup = element.querySelector(
            "g.edit-action"
          ) as SVGGElement;
          const addActionBtn = element.querySelector(
            "g.add-action > circle"
          ) as SVGCircleElement;

          const getRectElementBounds = () =>
            resizeOverlay.getBoundingClientRect();

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

          if (addActionBtn) {
            fromEvent(addActionBtn, "click").subscribe(() => {
              openAddElementsModal();
            });
          }

          if (resizeOverlay) {
            fromEvent(resizeOverlay, "mouseover").subscribe(() => {
              element.setAttribute("opacity", "1");
            });

            fromEvent(resizeOverlay, "mouseleave").subscribe(() => {
              element.setAttribute("opacity", "0");
            });
          }

          if (editActions) {
            fromEvent(editActions, "click").subscribe(() => {
              setActiveElementID(control.uniqueId);
            });
          }

          if (resizeRightLine) {
            fromEvent(resizeRightLine, "mousedown").subscribe(() => {
              scratchPadMouseMoveEvtSubscription =
                scratchPadMouseMoveEvt.subscribe((getPosition) => {
                  if (!scratchPadMouseMoveEvtSubscription?.closed) {
                    const [newXPos] = getPosition();

                    resizeRightLine?.setAttribute("x1", `${newXPos - 2}`);
                    resizeRightLine?.setAttribute("x2", `${newXPos - 2}`);

                    resizeTopThumb?.setAttribute("x1", `${newXPos * 0.375}`);
                    resizeTopThumb?.setAttribute("x2", `${newXPos * 0.625}`);

                    resizeBottomThumb?.setAttribute("x1", `${newXPos * 0.375}`);
                    resizeBottomThumb?.setAttribute("x2", `${newXPos * 0.625}`);

                    editActionGroup.setAttribute(
                      "transform",
                      `translate(${newXPos - 24}, 8)`
                    );

                    resizeOverlay?.setAttribute("width", `${newXPos}`);

                    control.updateProperty("width", newXPos + "px");
                  }
                });

              resizeOverlay?.setAttribute("pointer-events", "none");
            });
          }

          if (resizeBottomThumb) {
            fromEvent(resizeBottomThumb, "mousedown").subscribe(() => {
              scratchPadMouseMoveEvtSubscription =
                scratchPadMouseMoveEvt.subscribe((getPosition) => {
                  if (!scratchPadMouseMoveEvtSubscription?.closed) {
                    const [, newYPos] = getPosition();
                    resizeBottomThumb?.setAttribute("y1", `${newYPos - 2}`);
                    resizeBottomThumb?.setAttribute("y2", `${newYPos - 2}`);

                    resizeRightLine?.setAttribute("y1", `${newYPos * 0.375}`);
                    resizeRightLine?.setAttribute("y2", `${newYPos * 0.625}`);

                    resizeLeftThumb?.setAttribute("y1", `${newYPos * 0.375}`);
                    resizeLeftThumb?.setAttribute("y2", `${newYPos * 0.625}`);

                    resizeOverlay?.setAttribute("height", `${newYPos}`);

                    control.updateProperty("height", newYPos + "px");
                  }
                });

              resizeOverlay?.setAttribute("pointer-events", "none");
            });
          }
        });
      }
    }

    return () => {
      if (resizeActionsEL) {
        resizeActionsEL.innerHTML = "";
      }
    };
  }, [elements, scratchPadRef, resizeActionsRef]);

  return { activeElementID, addElementsModalOpen, closeAddElementsModal };
}
