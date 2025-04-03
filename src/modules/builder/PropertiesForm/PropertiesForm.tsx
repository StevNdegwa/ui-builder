import { FlexBox } from "@ui/components";
import { FC } from "react";
import { BuildableFrameConfig } from "../type";
import { FormButton, Wrapper } from "./styles";
import { Clipboard } from "@modules/system/Clipboard";

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
        {element.getElementPropertiesConfigs().map((config, index) => (
          <div key={index}>{config}</div>
        ))}
      </FlexBox>
      <FlexBox justify="space-between" direction="row" gap="xs">
        <FormButton
          color="primary"
          onClick={() => {
            const documentString = `
              <!DOCTYPE html>
                <html>
                  <head><title>Test UI Builder</title><script src="https://unpkg.com/@stevndegwa/ui-builder-components@0.0.3/controls-dist/ui-builder-controls.umd.js" async ></script></head>
                  <body>${element.getElementString()}</body>
                </html>
            `;

            Clipboard.copyText(documentString).then(() => {
              console.log("Copied document::", documentString);
            });
          }}
        >
          Copy Document
        </FormButton>
        <FormButton
          color="primary"
          onClick={() => {
            const sectionString = element.getElementString();
            Clipboard.copyText(sectionString).then(() => {
              console.log("Copied section::", sectionString);
            });
          }}
        >
          Copy Section
        </FormButton>
      </FlexBox>
    </Wrapper>
  ));
};
