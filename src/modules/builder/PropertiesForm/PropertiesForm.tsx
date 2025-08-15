import { FlexBox, IconButton, Typography } from "@ui/components";
import { FC } from "react";
import { TrashIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import { FormTitle, Wrapper } from "./styles";
import { CopyElement } from "./CopyElement";
import { CopyDocument } from "./CopyDocument";
import { FormItems } from "./FormItems";
import { useBuilderContext } from "../BuilderContext";
import { BuildableControl } from "../BuildableControl";

export type PropertiesFormProps = {
  elementsControls: Array<BuildableFrameConfig<BuildableControl>>;
  activeElementID?: string;
};

export const PropertiesForm: FC = () => {
  const { buildableConfigs, activeBuildableId, removeActionsById, setActiveElementId } =
    useBuilderContext();

  return (
    <FlexBox direction="column" gap="md">
      <Wrapper $show={true} direction="column" gap="md">
        <FlexBox direction="column" gap="sm">
          <FormTitle align="center" className="document-title">
            <Typography heading="h5" weight="bold">Document</Typography>
          </FormTitle>
          <FlexBox gap="sm">
            <CopyDocument title="Complete HTML Document" />
          </FlexBox>
        </FlexBox>
      </Wrapper>
      {buildableConfigs.map(({ elementControl }, index) => (
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
        </Wrapper>
      ))}
    </FlexBox>
  );
};
