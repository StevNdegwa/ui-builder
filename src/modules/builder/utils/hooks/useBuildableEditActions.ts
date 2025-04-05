import { useEffect, useState } from "react";
import { finalize, fromEvent, map, Subscription } from "rxjs";
import { BuildableControl } from "@modules/builder/BuildableControl";
import { BuildableFrameConfig } from "@modules/builder/type";
import { generate } from "@modules/utils/svg";

export function useBuildableEditActions(
  elements: BuildableFrameConfig[],
  scratchPadRef: React.RefObject<SVGRectElement | null>,
  actionsRef: React.RefObject<SVGGElement | null>
) {
  const [activeElementIndex, setActiveElementIndex] = useState<number>(0);
  const [addElementsModalOpen, setAddElementsModal] = useState(false);

  const closeAddElementsModal = () => setAddElementsModal(false);

  const openAddElementsModal = () => setAddElementsModal(true);

  useEffect(() => {
    const scratchPadEl = scratchPadRef.current;
    const actionsEl = actionsRef.current;

    if (elements.length && scratchPadEl) {
      if (actionsEl) {
        const resizeActionConfigs: ElementConfigType[] = elements.map(
          ({ width, height, x, y, element }) => {
            const configType = {
              name: "g",
              attributes: [
                {
                  name: "transform",
                  value: `translate(${x}, ${y})`,
                },
                {
                  name: "opacity",
                  value: "0",
                },
              ],
              children: [
                {
                  name: "rect",
                  classNames: ["resize-overlay", "action"],
                  attributes: [
                    { name: "width", value: width },
                    { name: "height", value: height },
                    { name: "x", value: 0 },
                    { name: "y", value: 0 },
                  ],
                },
                {
                  name: "line",
                  classNames: ["resize-top-thumb", "action"],
                  attributes: [
                    { name: "x1", value: width * 0.375 },
                    { name: "y1", value: 2 },
                    { name: "x2", value: width * 0.625 },
                    { name: "y2", value: 2 },
                  ],
                },
                {
                  name: "line",
                  classNames: ["resize-right-thumb", "action"],
                  attributes: [
                    { name: "x1", value: width - 2 },
                    { name: "y1", value: height * 0.375 },
                    { name: "x2", value: width - 2 },
                    { name: "y2", value: height * 0.625 },
                  ],
                },
                {
                  name: "line",
                  classNames: ["resize-bottom-thumb", "action"],
                  attributes: [
                    { name: "x1", value: width * 0.375 },
                    { name: "y1", value: height - 2 },
                    { name: "x2", value: width * 0.625 },
                    { name: "y2", value: height - 2 },
                  ],
                },
                {
                  name: "line",
                  classNames: ["resize-left-thumb", "action"],
                  attributes: [
                    { name: "x1", value: 2 },
                    { name: "y1", value: height * 0.375 },
                    { name: "x2", value: 2 },
                    { name: "y2", value: height * 0.625 },
                  ],
                },
                {
                  name: "g",
                  classNames: ["edit-action"],
                  attributes: [
                    {
                      name: "transform",
                      value: `translate(${width - 24}, 8)`,
                    },
                  ],
                  children: [
                    {
                      name: "circle",
                      classNames: ["action"],
                      attributes: [
                        {
                          name: "cx",
                          value: "8",
                        },
                        {
                          name: "cy",
                          value: "8",
                        },
                        {
                          name: "r",
                          value: "14",
                        },
                        {
                          name: "fill",
                          value: "transparent",
                        },
                      ],
                    },
                    {
                      name: "path",
                      attributes: [
                        {
                          name: "d",
                          value:
                            "M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z",
                        },
                        {
                          name: "transform",
                          value: "scale(0.03)",
                        },
                        {
                          name: "pointer-events",
                          value: "none",
                        },
                      ],
                    },
                  ],
                },
              ],
            } as ElementConfigType;

            if (element.element.TAKES_CHILDREN) {
              configType.children?.push({
                name: "g",
                classNames: ["add-action"],
                attributes: [
                  {
                    name: "transform",
                    value: `translate(${width / 2}, ${height / 2})`,
                  },
                ],
                children: [
                  {
                    name: "circle",
                    classNames: ["action"],
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
                      {
                        name: "pointer-events",
                        value: "none",
                      },
                    ],
                  },
                  {
                    name: "line",
                    attributes: [
                      { name: "x1", value: -8 },
                      { name: "y1", value: 0 },
                      { name: "x2", value: 8 },
                      { name: "y2", value: 0 },
                      {
                        name: "pointer-events",
                        value: "none",
                      },
                    ],
                  },
                ],
              });
            }

            return configType;
          }
        );

        generate(resizeActionConfigs).forEach((element, index) => {
          actionsEl.appendChild(element);

          const control: BuildableControl = elements[index].element;

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
              setActiveElementIndex(index);
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

                    const { height } = getRectElementBounds();

                    addActionsGroup?.setAttribute(
                      "transform",
                      `translate(${newXPos / 2}, ${height / 2})`
                    );

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

                    const { width } = getRectElementBounds();

                    addActionsGroup?.setAttribute(
                      "transform",
                      `translate(${width / 2}, ${newYPos / 2})`
                    );

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
      if (actionsEl) {
        actionsEl.innerHTML = "";
      }
    };
  }, [elements, scratchPadRef, actionsRef]);

  return { activeElementIndex, addElementsModalOpen, closeAddElementsModal };
}
