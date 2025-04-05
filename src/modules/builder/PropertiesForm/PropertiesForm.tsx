import { FlexBox } from "@ui/components";
import { FC } from "react";
import { BuildableFrameConfig } from "../type";
import { Wrapper } from "./styles";
import { CopyButton } from "./CopyButton";
import { FormItems } from "./FormItems";

export type PropertiesFormProps = {
  elementsControls: Array<BuildableFrameConfig>;
  activeElementIndex: number;
};

export const PropertiesForm: FC<PropertiesFormProps> = ({
  elementsControls,
  activeElementIndex,
}) => {
  return elementsControls.map(({ element }, index) => (
    <Wrapper
      $show={index === activeElementIndex}
      direction="column"
      gap="md"
      key={index}
    >
      <FlexBox direction="column" gap="sm">
        <FormItems element={element} />
      </FlexBox>
      <FlexBox justify="space-between" direction="row" gap="xs">
        <CopyButton
          getCopyString={() => `
              <!DOCTYPE html>
                <html>
                  <head><title>Test UI Builder</title><script src="https://unpkg.com/@stevndegwa/ui-builder-components@0.0.3/controls-dist/ui-builder-controls.umd.js" async ></script></head>
                  <body>${element.getElementString()}</body>
                </html>
            `}
        >
          Copy Document
        </CopyButton>
        <CopyButton getCopyString={() => element.getElementString()}>
          Copy Section
        </CopyButton>
      </FlexBox>
    </Wrapper>
  ));
};
