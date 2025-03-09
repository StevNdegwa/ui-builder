import { useState } from "react";
import { Wrapper } from "./style";
import { Frame } from "@modules/builder";

export const Main = () => {
  const [width, setWidth] = useState("100%");
  const [height, setHeight] = useState("100%");

  return (
    <Wrapper element="main">
      <Frame setElementWidth={setWidth} setElementHeight={setHeight}>
        <ui-section width={width} height={height}></ui-section>
      </Frame>
    </Wrapper>
  );
};
