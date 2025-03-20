import { FC } from "react";
import { MdOutlineControlPoint, MdBackupTable } from "react-icons/md";
import { Popup } from "./Popup";
import { Wrapper } from "./styles";

export const Sidebar: FC = () => {
  return (
    <Wrapper element="aside" align="center" direction="column" gap={"xs"}>
      <Popup icon={<MdBackupTable size={18} />}>My Sections</Popup>
      <Popup icon={<MdOutlineControlPoint size={18} />}>Controls</Popup>
    </Wrapper>
  );
};
