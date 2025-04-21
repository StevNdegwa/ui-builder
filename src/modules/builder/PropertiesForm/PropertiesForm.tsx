import { Divider, FlexBox, Typography } from "@ui/components";
import { FC } from "react";
import { MdOutlineSettings } from "react-icons/md";
import { BuildableFrameConfig } from "../type";
import { Wrapper } from "./styles";
import { CopyButton } from "./CopyButton";
import { FormItems } from "./FormItems";
import { useBuilderContext } from "../BuilderContext";

export type PropertiesFormProps = {
  elementsControls: Array<BuildableFrameConfig>;
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
        <FlexBox align="center" gap="xs">
          <MdOutlineSettings size={16} />
          <Typography heading="h5">
            {elementControl.element.TITLE} settings
          </Typography>
        </FlexBox>
        <Divider />
        <FormItems element={elementControl} />
      </FlexBox>
      <FlexBox justify="space-between" direction="row" gap="xs">
        <CopyButton
          getCopyString={() =>
            `<!DOCTYPE html><html><head><title>Test UI Builder</title><script src="https://unpkg.com/@stevndegwa/ui-builder-components/controls-dist/ui-builder-controls.umd.js" async ></script></head><body>${elementControl.elementString}</body></html>`
          }
          title={elementControl.element.TITLE}
        >
          Copy Document
        </CopyButton>
        <CopyButton
          getCopyString={() => elementControl.elementString}
          title={elementControl.element.TITLE}
        >
          Copy Section
        </CopyButton>
      </FlexBox>
    </Wrapper>
  ));
};
