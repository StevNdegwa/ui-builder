import { FlexBox, IconButton, Typography } from "@ui/components";
import { FC } from "react";
import { TrashIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import { FormTitle, Wrapper } from "./styles";
import { CopyElement } from "./CopyElement";
import { FormItems } from "./FormItems";
import { useBuilderContext } from "../BuilderContext";
import { BuildableControl } from "../BuildableControl";
import { CopyPage } from "./CopyPage";

export type PropertiesFormProps = {
  elementsControls: Array<BuildableFrameConfig<BuildableControl>>;
  activeElementID?: string;
};

export const PropertiesForm: FC = () => {
  const { buildableConfigs, activeBuildableId, copyDocumentContainer, removeActionsById, setActiveElementId } =
    useBuilderContext();

  return buildableConfigs.map(({ elementControl }, index) => (
    <Wrapper
      $show={elementControl.uniqueId === activeBuildableId}
      direction="column"
      gap="md"
      key={index}
    >
      <FlexBox direction="column" gap="sm">
        <FormTitle align="center">
          <Typography heading="h5">{elementControl.element.TITLE}</Typography>
        </FormTitle>
        <FlexBox gap="sm">
          <CopyElement
            getCopyString={() => elementControl.elementString}
            title={elementControl.element.TITLE}
          />
          <CopyPage container={copyDocumentContainer || null} />
          <IconButton icon={<BookmarkIcon width={24} height={24} />} />
          <IconButton
            icon={<TrashIcon width={24} height={24} />}
            color="danger"
            disabled={elementControl.is.section()}
            title={elementControl.is.section() ? "Cannot delete section elements" : "Delete element"}
            onClick={() => {
              if (!elementControl.is.section()) {
                elementControl.deleteElement();
                removeActionsById(elementControl.uniqueId);
                setActiveElementId(undefined);
              }
            }}
          />
        </FlexBox>
        <FormItems element={elementControl} />
      </FlexBox>
      {/* <FlexBox gap="sm" direction="column">
        <Typography weight="medium">Export</Typography>
        <FlexBox direction="column" gap="xs" align="flex-start" justify="start">
          <CopyButton
            getCopyString={() =>
              `<!DOCTYPE html><html><head><title>Test UI Builder</title><script src="https://unpkg.com/@stevndegwa/ui-builder-components/controls-dist/ui-builder-controls.umd.js" async ></script></head><body>${elementControl.elementString}</body></html>`
            }
            title={elementControl.element.TITLE}
          >
            <Typography size="sm" weight="regular">
              Copy document
            </Typography>
          </CopyButton>
        </FlexBox>
      </FlexBox> */}
    </Wrapper>
  ));
};
