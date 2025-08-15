import { useRef, forwardRef, PropsWithChildren, useMemo } from "react";
import { rgba } from "polished";
import { useForwardRef } from "@modules/utils/hooks";
import { FlexBox } from "@ui/components";
import {
  Contents,
  Editor,
  ScratchpadContainer,
  SettingsForm,
  Wrapper,
} from "./styles";
import { PropertiesForm } from "../PropertiesForm";
import { AddElementModal } from "../AddElementModal";
import { BuilderContextProvider } from "../BuilderContext";
import { useActions, useBuildableConfigsInit, useScratchPad } from "./hooks";
import { Add, Edit, Resize } from "../Actions";
import { ScratchPad } from "../ScratchPad";

export type BuilderProps = PropsWithChildren<{
  notify: (message: string) => void;
}>;

export const Builder = forwardRef<HTMLDivElement, BuilderProps>(
  ({ children, notify }, ref) => {
    const contentsWrapperRef = useForwardRef<HTMLDivElement>(ref);
    const resizeActionsRef = useRef<SVGGElement>(null);
    const editActionsRef = useRef<SVGGElement>(null);
    const addActionsRef = useRef<SVGGElement>(null);
    const scratchPadRef = useRef<SVGRectElement>(null);
    const editorSVGRef = useRef<SVGSVGElement>(null);

    const { width: scratchPadWidth, height: scratchPadHeight } =
      useScratchPad(contentsWrapperRef);

    const { buildableConfigs, getBuildableConfigById, updateBuilderConfig } =
      useBuildableConfigsInit(contentsWrapperRef);
    const {
      activeBuildableId,
      addElementsModalOpen,
      closeAddElementsModal,
      removeActionsById,
      setActiveElementId,
    } = useActions(
      buildableConfigs,
      scratchPadRef,
      resizeActionsRef,
      editActionsRef,
      addActionsRef,
      getBuildableConfigById
    );

    const activeBuildableControl = useMemo(
      () =>
        activeBuildableId
          ? getBuildableConfigById(activeBuildableId)
          : undefined,
      [activeBuildableId, getBuildableConfigById]
    );

    return (
      <BuilderContextProvider
        value={{
          notify,
          buildableConfigs,
          getBuildableConfigById,
          activeBuildableId,
          activeBuildableControl,
          removeActionsById,
          setActiveElementId,
          updateBuilderConfig,
        }}
      >
        <Wrapper gap="sm">
          <Editor>
            <Contents ref={contentsWrapperRef}>{children}</Contents>
            <ScratchpadContainer>
              <svg
                width={scratchPadWidth}
                height={scratchPadHeight}
                data-name="Element Frame"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                ref={editorSVGRef}
                strokeWidth={2}
                display={"block"}
              >
                <defs>
                  <filter id="shadow-filter">
                    <feDropShadow
                      dx="0"
                      dy="0"
                      stdDeviation="1"
                      floodColor={rgba("#848482", 0.5)}
                    />
                  </filter>
                </defs>
                <ScratchPad
                  width={scratchPadWidth}
                  height={scratchPadHeight}
                  ref={scratchPadRef}
                >
                  <Resize ref={resizeActionsRef} />
                  <Edit ref={editActionsRef} />
                  <Add ref={addActionsRef} />
                </ScratchPad>
              </svg>
            </ScratchpadContainer>
          </Editor>
          <SettingsForm>
            <FlexBox direction="column" gap="md">
              <PropertiesForm />
            </FlexBox>
          </SettingsForm>
          <AddElementModal
            isOpen={addElementsModalOpen}
            close={closeAddElementsModal}
          />
        </Wrapper>
      </BuilderContextProvider>
    );
  }
);
