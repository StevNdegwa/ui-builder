import { forwardRef, HTMLAttributes, PropsWithChildren } from "react";
import { Wrapper } from "./styles";

export type ButtonProps = PropsWithChildren<
  HTMLAttributes<HTMLButtonElement> & {
    /**
     * The variant of the button.
     * @default "primary"
     */
    variant?: "primary" | "secondary" | "tertiary";
    /**
     * The size of the button.
     * @default "medium"
     * */
    size?: "small" | "medium" | "large";
    /**
     * The loading state of the button.
     */
    loading?: boolean;
  }
>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <Wrapper {...props} ref={ref}>
        {children}
      </Wrapper>
    );
  }
);
