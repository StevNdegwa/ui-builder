import { useRef, forwardRef, PropsWithChildren, useMemo } from "react";
import { ScratchPad } from "../ScratchPad";
import { useForwardRef } from "@modules/utils/hooks";
import { FlexBox, Typography } from "@ui/components";
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

    const { buildableConfigs } = useBuildableConfigsInit(contentsWrapperRef);
    const { activeElementId, addElementsModalOpen, closeAddElementsModal } =
      useActions(
        buildableConfigs,
        scratchPadRef,
        resizeActionsRef,
        editActionsRef,
        addActionsRef
      );

    const activeBuildableControl = useMemo(
      () =>
        buildableConfigs.find(
          (config) => config.elementControl.uniqueId === activeElementId
        ),
      [activeElementId, buildableConfigs]
    );

    return (
      <BuilderContextProvider value={{ notify }}>
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
              <Typography heading="h4">Settings</Typography>
              <PropertiesForm
                elementsControls={buildableConfigs}
                activeElementID={activeElementId}
              />
            </FlexBox>
          </SettingsForm>
          {activeBuildableControl && (
            <AddElementModal
              isOpen={addElementsModalOpen}
              close={closeAddElementsModal}
              buildable={activeBuildableControl.elementControl}
            />
          )}
        </Wrapper>
      </BuilderContextProvider>
    );
  }
);
