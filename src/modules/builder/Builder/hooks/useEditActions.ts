import { useCallback, useEffect } from "react";
import { BuilderElementsGeometry } from "@modules/builder/utils/BuilderElementsGeometry";
import { popupMenu, generate, iconButton } from "@modules/builder/elements";
import { BuildableControl } from "@modules/builder/BuildableControl";

export function useEditActions(
  elements: BuildableFrameConfig<BuildableControl>[],
  editActionsRef: React.RefObject<SVGGElement | null>,
  setActiveElementId: (id?: string) => void,
  removeResizeActionById: (id: string) => void,
  removeAddActionById: (id: string) => void
) {
  const removeEditActionById = useCallback(
    (id: string) => {
      editActionsRef.current
        ?.querySelector(`g.edit-actions-group[data-buildable-ref="${id}"]`)
        ?.remove();
    },
    [editActionsRef]
  );

  const getEditActionConfig = useCallback(
    ({
      width,
      height,
      x,
      y,
      elementControl,
    }: BuildableFrameConfig<BuildableControl>) => {
      const configType = {
        name: "g",
        classNames: [
          "edit-actions-group",
          `${elementControl.elementName}-edit-actions-group`,
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
                ? 36
                : 16,
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
                document
                  .querySelector(
                    `g.${elementControl.uniqueIdClassName}-resize-action-group`
                  )
                  ?.setAttribute("opacity", "1");
              },
              mouseleave: () => {
                document
                  .querySelector(
                    `g.${elementControl.uniqueIdClassName}-resize-action-group`
                  )
                  ?.setAttribute("opacity", "0");
              },
            },
            icon: {
              name: "edit",
            },
            popupMenu: popupMenu({
              name: "edit-actions",
              title: elementControl.element.TITLE,
              children: [
                iconButton({
                  name: "settings",
                  closePopupMenu: true,
                  title: "Settings",
                  events: {
                    click: () => {
                      setActiveElementId(elementControl.uniqueId);
                    },
                  },
                  icon: {
                    name: "settings",
                  },
                }),
                !elementControl.is.section()
                  ? iconButton({
                      name: "delete",
                      title: "Delete",
                      attributes: {
                        transform: "translate(24,0)",
                      },
                      events: {
                        click: () => {
                          elementControl.deleteElement();

                          /**
                           * TODO: remove builder actions
                           */

                          removeEditActionById(elementControl.uniqueId);
                          removeResizeActionById(elementControl.uniqueId);
                          removeAddActionById(elementControl.uniqueId);

                          setActiveElementId(undefined);
                        },
                      },
                      icon: {
                        name: "delete",
                      },
                    })
                  : ({} as ElementConfigType),
              ],
            }),
          }),
        ],
      } as ElementConfigType;

      return configType;
    },
    [
      removeAddActionById,
      removeEditActionById,
      removeResizeActionById,
      setActiveElementId,
    ]
  );

  useEffect(() => {
    const editActionsEl = editActionsRef.current;

    if (elements.length) {
      if (editActionsEl) {
        const editActionConfigs: ElementConfigType[] =
          elements.map(getEditActionConfig);

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
  }, [elements, editActionsRef, setActiveElementId, getEditActionConfig]);

  return { removeEditActionById };
}
