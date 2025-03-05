import { FC, PropsWithChildren } from "react";
import { Contents, SvgWrapper, Wrapper } from "./styles";

export type FrameProps = PropsWithChildren;

export const Frame: FC<FrameProps> = ({ children }) => {
  return (
    <Wrapper>
      <Contents>{children}</Contents>
      <SvgWrapper>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100% 100%"
          data-name="Element Frame"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            height="100%"
            width="100%"
            x="0"
            y="0"
            strokeWidth={4}
            stroke="orange"
            fill="none"
          />
        </svg>
      </SvgWrapper>
    </Wrapper>
  );
};
