import { FC, PropsWithChildren, ReactNode, useRef } from "react";
import { Wrapper, PopupButton, PopupContent } from "./styles";
import usePopup from "./usePopup";

export type PopupProps = PropsWithChildren<{
  icon: ReactNode;
}>;

export const Popup: FC<PopupProps> = ({ icon, children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { toggle, isOpen: popupOpen } = usePopup(wrapperRef, buttonRef);

  return (
    <Wrapper>
      <PopupButton ref={buttonRef} onClick={toggle} size="sm" color="secondary">
        {icon}
      </PopupButton>
      <PopupContent ref={wrapperRef} $show={popupOpen}>
        {children}
      </PopupContent>
    </Wrapper>
  );
};
