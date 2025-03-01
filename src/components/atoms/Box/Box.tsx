import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";
import { Wrapper } from "./styles";
import { AtomComponentProps } from "../types";

export type BoxProps = PropsWithChildren<
  AtomComponentProps & HTMLAttributes<HTMLDivElement>
>;

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, element, ...props }, ref) => {
    return (
      <Wrapper {...props} as={element} ref={ref}>
        {children}
      </Wrapper>
    );
  }
);
