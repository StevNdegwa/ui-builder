import { FC } from "react";
import { BoxProps } from "@components/atoms/Box";
import { Wrapper } from "./styles";

export type ItemProps = BoxProps & {
  start?: number;
  end?: number;
  area?: string;
};

export const Item: FC<ItemProps> = ({
  children,
  start,
  end,
  element,
  area,
}) => {
  return (
    <Wrapper
      $columnStart={start}
      $columnEnd={end}
      element={element}
      $area={area}
    >
      {children}
    </Wrapper>
  );
};
