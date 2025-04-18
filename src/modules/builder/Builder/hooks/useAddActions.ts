import { useEffect } from "react";
import { fromEvent } from "rxjs";
import { BuildableFrameConfig } from "@modules/builder/type";
import { getELement } from "@modules/utils/svg";

const ADD_ACTION_BUTTON_HEIGHT = 32;

export function useAddActions(
  elements: BuildableFrameConfig[],
  addActionsRef: React.RefObject<SVGGElement | null>,
  openAddElementsModal: () => void,
  setActiveElementId: (id: string) => void
) {
  useEffect(() => {
    const addActionsEl = addActionsRef.current;

    if (elements.length) {
      if (addActionsEl) {
        elements
          .filter((element) => element.elementControl.is.section())
          .forEach(({ elementControl }) => {
            const { width, height } =
              elementControl.element.getBoundingClientRect();

            const addActionGroup = getELement({
              name: "g",
              classNames: ["add-action", "action"],
              attributes: {
                transform: `translate(${width / 2}, ${
                  height - ADD_ACTION_BUTTON_HEIGHT / 2
                })`,
              },
              data: {
                buildableRef: elementControl.uniqueId,
                buildableRefType: elementControl.elementName,
              },
              children: [
                {
                  name: "circle",
                  classNames: ["action", "add-action-btn"],
                  attributes: {
                    cx: 0,
                    cy: 0,
                    r: ADD_ACTION_BUTTON_HEIGHT / 2,
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

            addActionsEl.appendChild(addActionGroup);

            const addActionBtn = addActionGroup.querySelector(
              "circle.add-action-btn"
            ) as SVGCircleElement;

            if (addActionBtn) {
              fromEvent(addActionBtn, "mousemove").subscribe(() => {
                const resizeGroup = document.querySelector(
                  `g.${elementControl.uniqueIdClassName}-resize-action-group`
                );

                if (resizeGroup) {
                  resizeGroup.setAttribute("opacity", "1");
                }
              });

              fromEvent(addActionBtn, "mouseleave").subscribe(() => {
                const resizeGroup = document.querySelector(
                  `g.${elementControl.uniqueIdClassName}-resize-action-group`
                );

                if (resizeGroup) {
                  resizeGroup.setAttribute("opacity", "0");
                }
              });

              fromEvent(addActionBtn, "click").subscribe(() => {
                openAddElementsModal();
                setActiveElementId(elementControl.uniqueId);
              });
            }
          });
      }
    }

    return () => {
      if (addActionsEl) {
        addActionsEl.innerHTML = "";
      }
    };
  }, [elements, addActionsRef, openAddElementsModal, setActiveElementId]);
}
