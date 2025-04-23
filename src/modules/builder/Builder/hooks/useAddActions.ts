import { useEffect } from "react";
import { fromEvent } from "rxjs";
import { BuilderElementsGeometry } from "@modules/builder/utils/BuilderElementsGeometry";
import { BuildableControl } from "@modules/builder/BuildableControl";
import { getELement, iconButton } from "@modules/builder/elements";

export function useAddActions(
  elements: BuildableFrameConfig<BuildableControl>[],
  addActionsRef: React.RefObject<SVGGElement | null>,
  openAddElementsModal: () => void,
  setActiveElementId: (id: string) => void
) {
  const removeAddActionById = (id: string) => {
    addActionsRef.current
      ?.querySelector(`g.add-action[data-buildable-ref="${id}"]`)
      ?.remove();
  };

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
              classNames: ["add-action", "add-action-group", "action"],
              attributes: {
                ...BuilderElementsGeometry.addButton({
                  width,
                  height,
                }),
              },
              data: {
                buildableRef: elementControl.uniqueId,
                buildableRefType: elementControl.elementName,
              },
              children: [
                iconButton({
                  name: "add-element",
                  closePopupMenu: true,
                  events: {
                    click: () => {
                      openAddElementsModal();
                      setActiveElementId(elementControl.uniqueId);
                    },
                  },
                  icon: {
                    name: "add",
                  },
                  title: "Add element",
                }),
              ],
            });

            addActionsEl.appendChild(addActionGroup);

            const addActionBtn = addActionGroup.querySelector(
              "circle.add-action-btn"
            ) as SVGCircleElement;

            if (addActionBtn) {
              fromEvent(addActionBtn, "mousemove").subscribe(() => {
                document
                  .querySelector(
                    `g.${elementControl.uniqueIdClassName}-resize-action-group`
                  )
                  ?.setAttribute("opacity", "1");
              });

              fromEvent(addActionBtn, "mouseleave").subscribe(() => {
                document
                  .querySelector(
                    `g.${elementControl.uniqueIdClassName}-resize-action-group`
                  )
                  ?.setAttribute("opacity", "0");
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

  return { removeAddActionById };
}
