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
    console.log(sectionRef.current?.serializeELement());
  };

  return (
    <Wrapper element="main" direction="column">
      <BuilderContainer>
        <Frame setElementWidth={setWidth} setElementHeight={setHeight}>
          <ui-section
            ref={sectionRef}
            props={JSON.stringify({ background: "#f0f0f0" })}
          ></ui-section>
        </Frame>
      </BuilderContainer>
      <Controls>
        <Button onClick={handleSave}>Save Changes</Button>
      </Controls>
    </Wrapper>
  );
};
