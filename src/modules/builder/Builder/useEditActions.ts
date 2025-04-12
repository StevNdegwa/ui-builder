import { useEffect, useState } from "react";
import { finalize, fromEvent, map, Subscription } from "rxjs";
import { BuildableControl } from "@modules/builder/BuildableControl";
import { BuildableFrameConfig } from "@modules/builder/type";
import { generate, getELement } from "@modules/utils/svg";
import { ResizeActionGeometry } from "../utils/ResizeActionGeometry";

export default function useEditActions(
  elements: BuildableFrameConfig[],
  scratchPadRef: React.RefObject<SVGRectElement | null>,
  actionsRef: React.RefObject<SVGGElement | null>
) {
  const [activeElementID, setActiveElementID] = useState<string | undefined>(
    undefined
  );
  const [addElementsModalOpen, setAddElementsModal] = useState(false);

  const closeAddElementsModal = () => setAddElementsModal(false);

  const openAddElementsModal = () => setAddElementsModal(true);

  useEffect(() => {
    const scratchPadEl = scratchPadRef.current;
    const actionsEl = actionsRef.current;

    if (elements.length && scratchPadEl) {
      if (actionsEl) {
        const resizeActionConfigs: ElementConfigType[] = elements.map(
          ({ width, height, x, y, elementControl }) => {
            const configType = {
              name: "g",
              classNames: [],
              attributes: {
                transform: `translate(${x}, ${y})`,
                opacity: "0",
              },
              data: {
                buildableRef: elementControl.uniqueId,
                buildableRefType:
                  elementControl.element.tagName.toLocaleLowerCase(),
              },
              children: [
                {
                  name: "rect",
                  classNames: ["resize-overlay", "action"],
                  attributes: {
                    ...ResizeActionGeometry.overlay({ width, height }),
                  },
                },
                {
                  name: "line",
                  classNames: ["resize-top-thumb", "action"],
                  attributes: {
                    ...ResizeActionGeometry.topThumb({ width, height }),
                  },
                },
                {
                  name: "line",
                  classNames: ["resize-right-thumb", "action"],
                  attributes: {
                    ...ResizeActionGeometry.rightThumb({ width, height }),
                  },
                },
                {
                  name: "line",
                  classNames: ["resize-bottom-thumb", "action"],
                  attributes: {
                    ...ResizeActionGeometry.bottomThumb({ width, height }),
                  },
                },
                {
                  name: "line",
                  classNames: ["resize-left-thumb", "action"],
                  attributes: {
                    ...ResizeActionGeometry.leftThumb({ width, height }),
                  },
                },
                {
                  name: "g",
                  classNames: ["edit-action"],
                  attributes: {
                    transform: `translate(${width - 24}, 8)`,
                  },
                  children: [
                    {
                      name: "circle",
                      classNames: ["action"],
                      attributes: {
                        cx: 8,
                        cy: 8,
                        r: 14,
                        fill: "transparent",
                      },
                    },
                    {
                      name: "path",
                      attributes: {
                        d: "M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z",
                        transform: "scale(0.03)",
                        "pointer-events": "none",
                      },
                    },
                  ],
                },
              ],
            } as ElementConfigType;

            return configType;
          }
        );

        const resizeActionElements = generate(resizeActionConfigs);

        const sectionResizeActionElements = resizeActionElements.filter(
          (element) => element.dataset.buildableRefType === "ui-section"
        );

        resizeActionElements.forEach((element, index) => {
          actionsEl.appendChild(element);

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
          const actionPoints = element.querySelectorAll(
            ".action"
          ) as NodeListOf<SVGGElement>;
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
          ).subscribe(() => {
            console.log("Mouse up", scratchPadMouseMoveEvtSubscription);
            scratchPadMouseMoveEvtSubscription?.unsubscribe();
            console.log("Mouse up", scratchPadMouseMoveEvtSubscription);
          });

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

          if (actionPoints.length) {
            fromEvent(actionPoints, "mouseover").subscribe(() => {
              element.setAttribute("opacity", "1");
            });

            fromEvent(actionPoints, "mouseleave").subscribe(() => {
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

        sectionResizeActionElements.forEach((resizeElement) => {
          const { width, height } = resizeElement.getBoundingClientRect();

          const rectOverlay = resizeElement.querySelector(
            "rect.resize-overlay"
          ) as SVGLineElement;

          const addActionGroup = getELement({
            name: "g",
            classNames: ["add-action"],
            attributes: {
              transform: `translate(${width / 2}, ${height / 2})`,
              opacity: "0",
            },
            children: [
              {
                name: "circle",
                classNames: ["action"],
                attributes: {
                  cx: 0,
                  cy: 0,
                  r: 16,
                },
              },
              {
                name: "line",
                attributes: {
                  x1: 0,
                  y1: -8,
                  x2: 0,
                  y2: 8,
                  "pointer-events": "none",
                },
              },
              {
                name: "line",
                attributes: {
                  x1: -8,
                  y1: 0,
                  x2: 8,
                  y2: 0,
                  "pointer-events": "none",
                },
              },
            ],
          });

          actionsEl.appendChild(addActionGroup);

          fromEvent(rectOverlay, "mouseover").subscribe((event) => {
            if (event.currentTarget) {
              const { width: newW, height: newH } =
                rectOverlay.getBoundingClientRect();

              addActionGroup.setAttribute(
                "transform",
                `translate(${newW / 2}, ${newH / 2})`
              );

              addActionGroup.setAttribute("opacity", "1");
            }
          });

          const addActionBtn = addActionGroup.querySelector(
            "g.add-action > circle"
          ) as SVGCircleElement;

          if (addActionBtn) {
            fromEvent(addActionBtn, "click").subscribe(() => {
              openAddElementsModal();
              setActiveElementID(resizeElement.dataset.buildableRef);
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

  return { activeElementID, addElementsModalOpen, closeAddElementsModal };
}
