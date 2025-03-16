import { useRef, useState } from "react";
import { Frame } from "@modules/builder";
import { Button } from "@ui/components/atoms";
import { BuilderContainer, Controls, Wrapper } from "./style";
import { UISection } from "@modules/controls";

export const Main = () => {
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("100%");

  const sectionRef = useRef<UISection>(null);

  const handleSave = () => {
    sectionRef.current?.saveElement();
  };

  return (
    <Wrapper element="main" direction="column">
      <BuilderContainer>
        <Frame setElementWidth={setWidth} setElementHeight={setHeight}>
          <ui-section
            ref={sectionRef}
            width={width}
            height={height}
          ></ui-section>
        </Frame>
      </BuilderContainer>
      <Controls>
        <Button onClick={handleSave}>Save Changes</Button>
      </Controls>
    </Wrapper>
  );
};
