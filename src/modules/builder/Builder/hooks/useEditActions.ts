import { useEffect } from "react";
import { BuildableFrameConfig } from "@modules/builder/type";
import { generate } from "@modules/utils/svg";
import { fromEvent } from "rxjs";
import { BuilderElementsGeometry } from "@modules/builder/utils/BuilderElementsGeometry";

export function useEditActions(
  elements: BuildableFrameConfig[],
  editActionsRef: React.RefObject<SVGGElement | null>,
  setActiveElementId: (id: string) => void
) {
  useEffect(() => {
    const editActionsEl = editActionsRef.current;

    if (elements.length) {
      if (editActionsEl) {
        const editActionConfigs: ElementConfigType[] = elements.map(
          ({ width, height, x, y, elementControl }) => {
            const configType = {
              name: "g",
              classNames: [
                "edit-actions-group",
                `${elementControl.elementName}-edit-actions-group`,
                `${elementControl.uniqueIdClassName}-edit-actions-group`,
              ],
              attributes: {
                ...BuilderElementsGeometry.editButton({
                  x,
                  y,
                  width,
                  height,
                  topPadding: 2,
                  leftPadding:
                    !elementControl.is.empty() && elementControl.is.section()
                      ? 32
                      : 12,
                }),
              },
              data: {
                buildableRef: elementControl.uniqueId,
                buildableRefType: elementControl.elementName,
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
                  classNames: ["edit-action"],
                  attributes: {
                    d: "M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z",
                    transform: "scale(0.03)",
                    "pointer-events": "none",
                  },
                },
                {
                  name: "g",
                  classNames: [
                    "tooltip-group",
                    "tooltip",
                    "edit-actions-tooltip",
                  ],
                  attributes: {
                    fill: "white",
                    transform: "translate(-104, 0)",
                    filter: "url(#shadow-filter)",
                    opacity: "0",
                    "pointer-events": "none",
                  },
                  children: [
                    {
                      name: "path",
                      attributes: {
                        d: "M99 1 L104 5 L99 9",
                        "stroke-linejoin": "round",
                      },
                    },
                    {
                      name: "rect",
                      classNames: ["tooltip"],
                      attributes: {
                        width: 100,
                        height: 44,
                        rx: 4,
                      },
                    },
                    {
                      name: "g",
                      classNames: ["tooltip-content"],
                      attributes: {
                        transform: "translate(4, 4)",
                      },
                      children: [
                        {
                          name: "text",
                          classNames: ["tooltip-text"],
                          attributes: {
                            y: 8,
                            "font-size": 12,
                            fill: "black",
                            "font-weight": 600,
                          },
                          textContent: elementControl.element.TITLE,
                        },
                        {
                          name: "g",
                          classNames: ["settings"],
                          attributes: {
                            transform: "translate(0, 12)",
                            fill: "black",
                          },
                          children: [
                            {
                              name: "circle",
                              classNames: ["settings-button", "button"],
                              attributes: {
                                cx: 12,
                                cy: 12,
                                r: 8,
                                fill: "white",
                                stroke: "black",
                                "stroke-width": 2,
                              },
                            },
                            {
                              name: "path",
                              classNames: ["settings-icon"],
                              attributes: {
                                d: "M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42a.353.353 0 0 1 .08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16a.353.353 0 0 1-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z",
                                fill: "black",
                                "pointer-events": "none",
                              },
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            } as ElementConfigType;

            return configType;
          }
        );

        const editActionElements = generate(editActionConfigs);

        editActionElements.forEach((element) => {
          editActionsEl.append(element);

          const elementId = element.dataset.buildableRef;

          const editActionBtn = element.querySelector(
            "circle"
          ) as SVGCircleElement;

          const editActionTooltip = element.querySelector(
            "g.edit-actions-tooltip"
          ) as SVGGElement;

          const editActionSettingsBtn = element.querySelector(
            "g.settings > circle.settings-button"
          ) as SVGGElement;

          fromEvent(editActionBtn, "click").subscribe(() => {
            if (editActionTooltip) {
              editActionTooltip.setAttribute("opacity", "1");
              editActionTooltip.setAttribute("pointer-events", "all");

              const handleCLick = (e: MouseEvent) => {
                if (
                  !editActionTooltip.contains(e.target as Node) &&
                  !editActionBtn.contains(e.target as Node)
                ) {
                  editActionTooltip.setAttribute("opacity", "0");
                  editActionTooltip.setAttribute("pointer-events", "none");

                  document.removeEventListener("click", handleCLick);
                }
              };

              document.addEventListener("click", handleCLick);
            }
          });

          fromEvent(editActionBtn, "mousemove").subscribe(() => {
            const resizeGroup = document.querySelector(
              `g.c${elementId}-resize-action-group`
            );

            if (resizeGroup) {
              resizeGroup.setAttribute("opacity", "1");
            }
          });

          fromEvent(editActionBtn, "mouseleave").subscribe(() => {
            const resizeGroup = document.querySelector(
              `g.c${elementId}-resize-action-group`
            );

            if (resizeGroup) {
              resizeGroup.setAttribute("opacity", "0");
            }
          });

          fromEvent(editActionSettingsBtn, "click").subscribe(() => {
            setActiveElementId(elementId || "");
            editActionTooltip.setAttribute("opacity", "0");
            editActionTooltip.setAttribute("pointer-events", "none");
          });
        });
      }
    }

    return () => {
      if (editActionsEl) {
        editActionsEl.innerHTML = "";
      }
    };
  }, [elements, editActionsRef, setActiveElementId]);
}
