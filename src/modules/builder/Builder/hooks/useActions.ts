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

  const { removeResizeActionById } = useResizeActions(
    elements,
    scratchPadRef,
    resizeActionsRef
  );

  const { removeAddActionById } = useAddActions(
    elements,
    addActionsRef,
    openAddElementsModal,
    setActiveElementId
  );

  const { removeEditActionById } = useEditActions(
    elements,
    editActionsRef,
    setActiveElementId
  );

  useEditActionsResize(elements, getBuildableConfigById);

  const removeActionsById = (id: string) => {
    removeResizeActionById(id);
    removeEditActionById(id);
    removeAddActionById(id);
  };

  return {
    activeBuildableId,
    setActiveElementId,
    addElementsModalOpen,
    closeAddElementsModal,
    openAddElementsModal,
    removeActionsById,
  };
}
