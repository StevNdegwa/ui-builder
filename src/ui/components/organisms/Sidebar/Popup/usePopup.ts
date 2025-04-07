import { useEffect, useState } from "react";

export default function usePopup(
  containerRef: React.RefObject<HTMLElement | null>,
  buttonRef: React.RefObject<HTMLButtonElement | null>
) {
  const [isOpen, setIsPopupOpen] = useState(false);

  const toggle = () => {
    setIsPopupOpen((s) => !s);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !buttonRef?.current?.contains(e.target as Node) &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [buttonRef, containerRef, isOpen, setIsPopupOpen]);

  return { toggle, isOpen };
}
