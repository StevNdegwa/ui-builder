import { useEffect } from "react";
import { BuildableFrameConfig } from "../type";
import { UIBuildable } from "@modules/controls";
import { ResizeActionGeometry } from "../utils/ResizeActionGeometry";
import { setElementAttributes } from "@modules/utils/svg";

export default function useEditActionsResize(elements: BuildableFrameConfig[]) {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { target } = entry;

        if (target instanceof UIBuildable) {
          const editAction = document.querySelector(
            `[data-buildable-ref='${target.dataset.uniqueId}']`
          );

          if (editAction) {
            const overlay = editAction.querySelector(
              "rect.resize-overlay"
            ) as SVGRectElement;
            const bottomThumb = editAction.querySelector(
              "line.resize-bottom-thumb"
            ) as SVGLineElement;
            const topThumb = editAction.querySelector(
              "line.resize-top-thumb"
            ) as SVGLineElement;
            const leftThumb = editAction.querySelector(
              "line.resize-left-thumb"
            ) as SVGLineElement;
            const rightThumb = editAction.querySelector(
              "line.resize-right-thumb"
            ) as SVGLineElement;

            if (overlay && bottomThumb && topThumb && leftThumb && rightThumb) {
              const { width, height } = target.getBoundingClientRect();

              const newOverlayRect = ResizeActionGeometry.overlay({
                width,
                height,
              });

              const newBottomThumb = ResizeActionGeometry.bottomThumb({
                width,
                height,
              });
              const newTopThumb = ResizeActionGeometry.topThumb({
                height,
                width,
              });
              const newLeftThumb = ResizeActionGeometry.leftThumb({
                width,
                height,
              });
              const newRightThumb = ResizeActionGeometry.rightThumb({
                width,
                height,
              });
              setElementAttributes(topThumb, newTopThumb);
              setElementAttributes(leftThumb, newLeftThumb);
              setElementAttributes(rightThumb, newRightThumb);

              setElementAttributes(overlay, newOverlayRect);
              setElementAttributes(bottomThumb, newBottomThumb);
            }
          }
        }
      });
    });

    if (elements.length > 0) {
      elements.forEach(({ elementControl }) => {
        resizeObserver.observe(elementControl.element);
      });

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [elements]);
}
