import { useEffect } from "react";
import { BuilderElementsGeometry } from "@modules/builder/utils/BuilderElementsGeometry";
import {
  icon,
  popupMenu,
  generate,
  iconButton,
} from "@modules/builder/elements";
import { BuildableControl } from "@modules/builder/BuildableControl";

export function useEditActions(
  elements: BuildableFrameConfig<BuildableControl>[],
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
                iconButton({
                  name: "edit-action",
                  classNames: ["edit-action"],
                  attributes: {
                    fill: "none",
                  },
                  events: {
                    mousemove: () => {
                      const resizeGroup = document.querySelector(
                        `g.${elementControl.uniqueIdClassName}-resize-action-group`
                      );

                      if (resizeGroup) {
                        resizeGroup.setAttribute("opacity", "1");
                      }
                    },
                    mouseleave: () => {
                      const resizeGroup = document.querySelector(
                        `g.${elementControl.uniqueIdClassName}-resize-action-group`
                      );

                      if (resizeGroup) {
                        resizeGroup.setAttribute("opacity", "0");
                      }
                    },
                  },
                  children: [
                    icon({
                      attributes: {
                        width: 16,
                        height: 16,
                        x: 2,
                        y: 2,
                      },
                      name: "edit-square",
                    }),
                  ],
                  popupMenu: popupMenu({
                    name: "edit-actions",
                    title: elementControl.element.TITLE,
                    children: [
                      iconButton({
                        name: "settings",
                        closePopupMenu: true,
                        events: {
                          click: () => {
                            setActiveElementId(elementControl.uniqueId);

                            /**
                             * TODO: remove builder actions
                             */
                          },
                        },
                        children: [
                          icon({
                            attributes: {
                              width: 16,
                              height: 16,
                              x: 2,
                              y: 2,
                            },
                            name: "settings",
                          }),
                        ],
                      }),
                      !elementControl.is.section()
                        ? iconButton({
                            name: "delete",
                            attributes: {
                              transform: "translate(24,0)",
                            },
                            events: {
                              click: () => {
                                elementControl.deleteElement();
                              },
                            },
                            children: [
                              icon({
                                attributes: {
                                  width: 16,
                                  height: 16,
                                  x: 2,
                                  y: 2,
                                },
                                name: "bin",
                              }),
                            ],
                          })
                        : ({} as ElementConfigType),
                    ],
                  }),
                }),
              ],
            } as ElementConfigType;

            return configType;
          }
        );

        generate(editActionConfigs).forEach((element) => {
          editActionsEl.append(element);
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
