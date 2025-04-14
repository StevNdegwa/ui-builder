import { useEffect, useLayoutEffect, useState } from "react";

export default function useScratchPad(
  contentsWrapperRef: React.RefObject<HTMLDivElement | null>
) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const contentsWrapperEL = contentsWrapperRef.current;

    if (contentsWrapperEL) {
      const boundingRect = contentsWrapperEL.getBoundingClientRect();
      setWidth(boundingRect.width);
      setHeight(boundingRect.height);
    }
  }, [contentsWrapperRef]);

  useEffect(() => {
    const contentsWrapperEL = contentsWrapperRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const contentWrapper = entry.target as HTMLDivElement;
        const boundingRect = contentWrapper.getBoundingClientRect();
        setWidth(boundingRect.width + 20);
        setHeight(boundingRect.height + 20);
      });
    });

    if (contentsWrapperEL) {
      resizeObserver.observe(contentsWrapperEL);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [contentsWrapperRef]);

  return {
    width,
    height,
  };
}
