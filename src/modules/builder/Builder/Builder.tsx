import {
  useLayoutEffect,
  useState,
  useRef,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useMemo,
} from "react";
import { ScratchPad } from "../ScratchPad";
import { useForwardRef } from "@modules/utils/hooks";
import { FlexBox, Typography } from "@ui/components";
import { UIBuildable } from "@modules/controls";
import { Frames } from "../Frames";
import { BUILDER_PADDING } from "../constants";
import { useBuildableEditActions } from "./useBuildableEditActions";
import {
  Contents,
  Editor,
  ScratchpadContainer,
  SettingsForm,
  Wrapper,
} from "./styles";
import { BuildableFrameConfig } from "../type";
import { PropertiesForm } from "../PropertiesForm";
import { BuildableControl } from "../BuildableControl";
import { AddElementModal } from "../AddElementModal";
import { BuilderContextProvider } from "../BuilderContext";
import ShortUniqueId from "short-unique-id";

const shortUniqueID = new ShortUniqueId({
  length: 8,
});

export type BuilderProps = PropsWithChildren<{
  notify: (message: string) => void;
}>;

export const Builder = forwardRef<HTMLDivElement, BuilderProps>(
  ({ children, notify }, ref) => {
    const contentsWrapperRef = useForwardRef<HTMLDivElement>(ref);
    const actionsRef = useRef<SVGGElement>(null);
    const scratchPadRef = useRef<SVGRectElement>(null);
    const rectRef = useRef<SVGSVGElement>(null);
    const [scratchPadWidth, setScratchPadWidth] = useState(0);
    const [scratchPadHeight, setScratchPadHeight] = useState(0);
    const uiBuildableElementsLen =
      contentsWrapperRef.current?.querySelectorAll(".ui-buildable").length || 0;

    const [buildableConfigs, setBuildableConfigs] = useState<
      BuildableFrameConfig[]
    >([]);

    const { activeElementID, addElementsModalOpen, closeAddElementsModal } =
      useBuildableEditActions(buildableConfigs, scratchPadRef, actionsRef);

    const activeBuildableControl = useMemo(
      () =>
        buildableConfigs.find(
          (config) => config.elementControl.uniqueId === activeElementID
        ),
      [activeElementID, buildableConfigs]
    );

    useLayoutEffect(() => {
      if (rectRef.current) {
        const boundingRect = rectRef.current.getBoundingClientRect();
        setScratchPadWidth(boundingRect.width);
        setScratchPadHeight(boundingRect.height);
      }
    }, [rectRef]);

    useEffect(() => {
      // Add setTimeout to allow the DOM to update

      /**
       *  TODO find a better way to wait for element loading
       */
      setTimeout(() => {
        const contentsWrapperEl = contentsWrapperRef.current;

        if (contentsWrapperEl && uiBuildableElementsLen > 0) {
          const contentStart = contentsWrapperEl.getBoundingClientRect();

          setBuildableConfigs(
            Array.from(
              contentsWrapperRef.current?.querySelectorAll(".ui-buildable") ||
                []
            ).map((element) => {
              const box = element.getBoundingClientRect();

              return {
                left: box.left,
                top: box.top,
                width: box.width,
                height: box.height,
                x: box.x - contentStart.x + BUILDER_PADDING,
                y: box.y - contentStart.y + BUILDER_PADDING,
                elementControl: new BuildableControl(
                  element as UIBuildable,
                  shortUniqueID.randomUUID()
                ),
              };
            })
          );
        }
      }, 1);
    }, [contentsWrapperRef, uiBuildableElementsLen]);

    return (
      <BuilderContextProvider value={{ notify }}>
        <Wrapper gap="sm">
          <Editor>
            <Contents ref={contentsWrapperRef}>{children}</Contents>
            <ScratchpadContainer>
              <svg
                width="100%"
                height="100%"
                data-name="Element Frame"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                ref={rectRef}
                strokeWidth={2}
              >
                <ScratchPad
                  width={scratchPadWidth}
                  height={scratchPadHeight}
                  ref={scratchPadRef}
                >
                  <Frames ref={actionsRef} />
                </ScratchPad>
              </svg>
            </ScratchpadContainer>
          </Editor>
          <SettingsForm>
            <FlexBox direction="column" gap="md">
              <Typography heading="h4">Settings</Typography>
              <PropertiesForm
                elementsControls={buildableConfigs}
                activeElementID={activeElementID}
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
