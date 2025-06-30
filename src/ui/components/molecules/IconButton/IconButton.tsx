import React, { forwardRef } from "react";
import { ButtonProps } from "../../atoms/Button";
import { Gap, Wrapper } from "./styles";

export type IconButtonProps = ButtonProps & {
  icon: React.ReactNode;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, children, ...props }, ref) => {
    return (
      <Wrapper color="gray" size="xs" {...props} ref={ref}>
        <div>{icon}</div>
        {children && (
          <>
            <Gap />
            <div>{children}</div>
          </>
        )}
      </Wrapper>
    );
  }
);
