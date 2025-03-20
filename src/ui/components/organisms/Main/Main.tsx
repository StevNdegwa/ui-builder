import { FC, PropsWithChildren } from "react";
import { BuilderContainer, Wrapper } from "./style";

export type MainProps = PropsWithChildren;

export const Main: FC<MainProps> = ({ children }) => {
  return (
    <Wrapper element="main" direction="column">
      <BuilderContainer>{children}</BuilderContainer>
    </Wrapper>
  );
};
