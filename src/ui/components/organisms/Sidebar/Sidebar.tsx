import { FC } from "react";
import { SquaresPlusIcon } from "@heroicons/react/24/solid";
import { Popup } from "./Popup";
import { Wrapper } from "./styles";

export const Sidebar: FC = () => {
  return (
    <Wrapper element="aside" align="center" direction="column" gap={"xs"}>
      <Popup icon={<SquaresPlusIcon width={24} height={24} />}>
        My Sections
      </Popup>
    </Wrapper>
  );
};
