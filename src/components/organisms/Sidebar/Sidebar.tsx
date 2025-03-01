import { FC } from "react";
import { Wrapper } from "./styles";
import { FaElementor } from "react-icons/fa";
import { Button } from "@components/atoms";

export const Sidebar: FC = () => {
  return (
    <Wrapper element="aside">
      <Button>
        <FaElementor size={32} />
      </Button>
    </Wrapper>
  );
};
