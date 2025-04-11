import { useLayoutEffect, useState } from "react";

export default function useScratchPad(
  editorSVGRef: React.RefObject<SVGSVGElement | null>
) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const editorSVGEl = editorSVGRef.current;

    if (editorSVGEl) {
      const boundingRect = editorSVGEl.getBoundingClientRect();
      setWidth(boundingRect.width);
      setHeight(boundingRect.height);
    }
  }, [editorSVGRef]);

  return {
    width,
    height,
  };
}
