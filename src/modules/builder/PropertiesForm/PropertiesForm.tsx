import { FlexBox } from "@ui/components";
import { FC } from "react";
import { BuildableFrameConfig } from "../type";
import { Wrapper } from "./styles";
import { CopyButton } from "./CopyButton";
import { FormItems } from "./FormItems";

export type PropertiesFormProps = {
  elementsControls: Array<BuildableFrameConfig>;
  activeElementID?: string;
};

export const PropertiesForm: FC<PropertiesFormProps> = ({
  elementsControls,
  activeElementID,
}) => {
  return elementsControls.map(({ elementControl }, index) => (
    <Wrapper
      $show={elementControl.uniqueId === activeElementID}
      direction="column"
      gap="md"
      key={index}
    >
      <FlexBox direction="column" gap="sm">
        <FormItems element={elementControl} />
      </FlexBox>
      <FlexBox justify="space-between" direction="row" gap="xs">
        <CopyButton
          getCopyString={() => `
              <!DOCTYPE html>
                <html>
                  <head><title>Test UI Builder</title><script src="https://unpkg.com/@stevndegwa/ui-builder-components@0.0.3/controls-dist/ui-builder-controls.umd.js" async ></script></head>
                  <body>${elementControl.elementString}</body>
                </html>
            `}
        >
          Copy Document
        </CopyButton>
        <CopyButton getCopyString={() => elementControl.elementString}>
          Copy Section
        </CopyButton>
      </FlexBox>
    </Wrapper>
  ));
};
