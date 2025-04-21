import { useEffect } from "react";
import { BuildableFrameConfig } from "../../type";
import { UIBuildable } from "@modules/controls";
import { BuilderElementsGeometry } from "../../utils/BuilderElementsGeometry";
import { setElementAttributes } from "@modules/utils/svg";

export function useEditActionsResize(
  elements: BuildableFrameConfig[],
  getBuildableConfigById: (id: string) => BuildableFrameConfig | undefined
) {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { target } = entry;

        if (target instanceof UIBuildable && target.dataset.uniqueId) {
          try {
            const { width, height } = target.getBoundingClientRect();

            const uniqueId = target.dataset.uniqueId;

            const elementConfig = getBuildableConfigById(
              uniqueId
            ) as BuildableFrameConfig;

            const resizeActions = document.querySelector(
              `[data-buildable-ref='${uniqueId}'].resize-actions-group`
            ) as SVGGElement;

            const addActions = document.querySelector(
              `[data-buildable-ref='${uniqueId}'].add-action`
            ) as SVGGElement;

            const editActions = document.querySelector(
              `[data-buildable-ref='${uniqueId}'].edit-actions-group`
            ) as SVGGElement;

            if (resizeActions) {
              const overlay = resizeActions.querySelector(
                "rect.resize-overlay"
              ) as SVGRectElement;
              const bottomThumb = resizeActions.querySelector(
                "line.resize-bottom-thumb"
              ) as SVGLineElement;
              const topThumb = resizeActions.querySelector(
                "line.resize-top-thumb"
              ) as SVGLineElement;
              const leftThumb = resizeActions.querySelector(
                "line.resize-left-thumb"
              ) as SVGLineElement;
              const rightThumb = resizeActions.querySelector(
                "line.resize-right-thumb"
              ) as SVGLineElement;

              setElementAttributes(
                rightThumb,
                BuilderElementsGeometry.rightThumb({
                  width,
                  height,
                })
              );

              setElementAttributes(
                leftThumb,
                BuilderElementsGeometry.leftThumb({
                  width,
                  height,
                })
              );

              setElementAttributes(
                topThumb,
                BuilderElementsGeometry.topThumb({
                  height,
                  width,
                })
              );

              setElementAttributes(
                bottomThumb,
                BuilderElementsGeometry.bottomThumb({
                  width,
                  height,
                })
              );

              setElementAttributes(
                overlay,
                BuilderElementsGeometry.overlay({
                  width,
                  height,
                })
              );
            }

            if (addActions) {
              setElementAttributes(
                addActions,
                BuilderElementsGeometry.addButton({ width, height })
              );
            }

            if (editActions) {
              const { y, x, elementControl } = elementConfig;

              setElementAttributes(
                editActions,
                BuilderElementsGeometry.editButton({
                  width,
                  height,
                  x,
                  y,
                  leftPadding:
                    !elementControl.is.empty() && elementControl.is.section()
                      ? 32
                      : 12,
                  topPadding: 2,
                })
              );
            }
          } catch (error) {
            console.error("Error resizing element:", error);
          }
        }
      });
    });

    if (elements.length > 0) {
      elements.forEach(({ elementControl }) => {
        resizeObserver.observe(elementControl.element);
      });
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [elements, getBuildableConfigById]);
}
