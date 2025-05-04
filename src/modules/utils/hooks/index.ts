import { ForwardedRef, useCallback, useEffect, useRef } from "react";

export function useForwardRef<T>(ref: ForwardedRef<T>, initialValue?: T) {
  const targetRef = useRef<T>(initialValue || null);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === "function") {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
}

export function useObserverChildrenList() {
  const observe = useCallback((ref: Element) => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          console.log("Children length changed to", ref.children.length);
        }
      }
    });

    observer.observe(ref, { childList: true });
  }, []);

  return observe;
}
