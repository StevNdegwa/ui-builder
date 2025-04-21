import { useCallback, useEffect, useState } from "react";
import ShortUniqueId from "short-unique-id";
import { BuildableFrameConfig } from "../../type";
import { UIBuildable } from "@modules/controls";
import { BUILDER_PADDING } from "../../constants";
import { BuildableControl } from "../../BuildableControl";

const shortUniqueID = new ShortUniqueId({
  length: 8,
});

export function useBuildableConfigsInit(
  contentsWrapperRef: React.RefObject<HTMLDivElement | null>
) {
  const [buildableConfigs, setBuildableConfigs] = useState<
    BuildableFrameConfig[]
  >([]);
  const uiBuildableElementsLen =
    contentsWrapperRef.current?.querySelectorAll(".ui-buildable").length || 0;

  const getBuildableConfigById = useCallback(
    (uniqueId: string) => {
      return buildableConfigs.find(
        (config) => config.elementControl.uniqueId === uniqueId
      );
    },
    [buildableConfigs]
  );

  const computeBuildableConfig = useCallback(
    (element: UIBuildable, contentsWrapperEl: HTMLDivElement) => {
      const contentStart = contentsWrapperEl.getBoundingClientRect();

      const box = element.getBoundingClientRect();
      const uniqueId = shortUniqueID.randomUUID();

      return {
        uniqueId,
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
        x: box.x - contentStart.x + BUILDER_PADDING,
        y: box.y - contentStart.y + BUILDER_PADDING,
        elementControl: new BuildableControl(element, uniqueId),
      };
    },
    []
  );

  useEffect(() => {
    // Add setTimeout to allow the DOM to update

    /**
     *  TODO find a better way to wait for element loading
     */
    setTimeout(() => {
      const contentsWrapperEl = contentsWrapperRef.current;

      if (contentsWrapperEl && uiBuildableElementsLen > 0) {
        setBuildableConfigs(
          Array.from(contentsWrapperEl.querySelectorAll(".ui-buildable")).map(
            (element) =>
              computeBuildableConfig(element as UIBuildable, contentsWrapperEl) // Cast to UIBuildable
          )
        );
      }
    }, 1);
  }, [computeBuildableConfig, contentsWrapperRef, uiBuildableElementsLen]);

  return { buildableConfigs, getBuildableConfigById, computeBuildableConfig };
}
