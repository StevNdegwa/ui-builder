import {
  FC,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { Wrapper, PopupButton, PopupContent } from "./styles";

export type PopupProps = PropsWithChildren<{
  icon: ReactNode;
}>;

export const Popup: FC<PopupProps> = ({ icon, children }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = () => {
    setPopupOpen(!popupOpen);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !buttonRef?.current?.contains(e.target as Node) &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setPopupOpen(false);
      }
    };

    if (popupOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [popupOpen, setPopupOpen]);

  return (
    <Wrapper>
      <PopupButton
        ref={buttonRef}
        onClick={handleButtonClick}
        size="sm"
        color="secondary"
      >
        {icon}
      </PopupButton>
      <PopupContent ref={wrapperRef} $show={popupOpen}>
        {children}
      </PopupContent>
    </Wrapper>
  );
};
