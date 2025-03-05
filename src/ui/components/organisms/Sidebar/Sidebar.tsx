import { FC } from "react";
import { MdOutlineControlPoint, MdBackupTable } from "react-icons/md";
import { Popup } from "./Popup";
import { Wrapper } from "./styles";
import { Button } from "@ui/components";

export const Sidebar: FC = () => {
  return (
    <Wrapper element="aside">
      <Popup icon={<MdBackupTable size={24} />}>My Sections</Popup>
      <Popup icon={<MdOutlineControlPoint size={24} />}>
        <Button>Control A</Button>
      </Popup>
    </Wrapper>
  );
};
