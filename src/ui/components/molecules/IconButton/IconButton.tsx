import React, { FC } from "react";
import { ButtonProps } from "../../atoms/Button";
import { Gap, Wrapper } from "./styles";

export type IconButtonProps = ButtonProps & {
  icon: React.ReactNode;
};

export const IconButton: FC<IconButtonProps> = ({
  icon,
  children,
  ...props
}) => {
  return (
    <Wrapper color="gray" size="xs" {...props}>
      <div>{icon}</div>
      {children && (
        <>
          <Gap />
          <div>{children}</div>
        </>
      )}
    </Wrapper>
  );
};
