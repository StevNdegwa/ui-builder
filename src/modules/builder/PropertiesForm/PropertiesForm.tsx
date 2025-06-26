import { FlexBox, IconButton, Typography } from "@ui/components";
import { FC } from "react";
import { TrashIcon, BookmarkIcon } from "@heroicons/react/24/solid";
import { FormTitle, Wrapper } from "./styles";
import { CopyButton } from "./CopyButton";
import { FormItems } from "./FormItems";
import { useBuilderContext } from "../BuilderContext";
import { BuildableControl } from "../BuildableControl";

export type PropertiesFormProps = {
  elementsControls: Array<BuildableFrameConfig<BuildableControl>>;
  activeElementID?: string;
};

export const PropertiesForm: FC = () => {
  const { buildableConfigs, activeBuildableId } = useBuilderContext();

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
          <IconButton icon={<BookmarkIcon width={24} height={24} />} />
          <IconButton icon={<TrashIcon width={24} height={24} />} />
        </FlexBox>
        <FormItems element={elementControl} />
      </FlexBox>
      <FlexBox gap="sm" direction="column">
        <Typography weight="medium">Export</Typography>
        <CopyButton
          getCopyString={() =>
            `<!DOCTYPE html><html><head><title>Test UI Builder</title><script src="https://unpkg.com/@stevndegwa/ui-builder-components/controls-dist/ui-builder-controls.umd.js" async ></script></head><body>${elementControl.elementString}</body></html>`
          }
          title={elementControl.element.TITLE}
        >
          <Typography size="md" weight="medium">
            Copy document
          </Typography>
        </CopyButton>
        <CopyButton
          getCopyString={() => elementControl.elementString}
          title={elementControl.element.TITLE}
        >
          <Typography size="md" weight="medium">
            Copy {elementControl.element?.TITLE?.toLowerCase()}
          </Typography>
        </CopyButton>
      </FlexBox>
    </Wrapper>
  ));
};
