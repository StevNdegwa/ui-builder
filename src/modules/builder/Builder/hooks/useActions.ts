import { useState } from "react";
import { useAddActions } from "./useAddActions";
import { useEditActions } from "./useEditActions";
import { useResizeActions } from "./useResizeActions";
import { useEditActionsResize } from "./useEditActionsResize";
import { BuildableControl } from "@modules/builder/BuildableControl";

export function useActions(
  elements: BuildableFrameConfig<BuildableControl>[],
  scratchPadRef: React.RefObject<SVGRectElement | null>,
  resizeActionsRef: React.RefObject<SVGGElement | null>,
  editActionsRef: React.RefObject<SVGGElement | null>,
  addActionsRef: React.RefObject<SVGGElement | null>,
  getBuildableConfigById: (
    id: string
  ) => BuildableFrameConfig<BuildableControl> | undefined
) {
  const [activeBuildableId, setActiveElementId] = useState<string | undefined>(
    undefined
  );
  const [addElementsModalOpen, setAddElementsModal] = useState(false);

  const closeAddElementsModal = () => setAddElementsModal(false);

  const openAddElementsModal = () => setAddElementsModal(true);

  useResizeActions(elements, scratchPadRef, resizeActionsRef);
  useEditActions(elements, editActionsRef, setActiveElementId);
  useAddActions(
    elements,
    addActionsRef,
    openAddElementsModal,
    setActiveElementId
  );

  useEditActionsResize(elements, getBuildableConfigById);

  return {
    activeBuildableId,
    setActiveElementId,
    addElementsModalOpen,
    closeAddElementsModal,
    openAddElementsModal,
  };
}
