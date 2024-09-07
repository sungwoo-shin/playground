import { createContext, useContext, useSyncExternalStore } from "react";

import { getContextError } from "#/utils/getContextError";

type TViewportRect = Pick<DOMRect, "left" | "top" | "width" | "height"> & {
  scrollHeight: number;
};

const subscribe = (callback: () => void) => {
  const resizeObserver = new ResizeObserver(callback);
  resizeObserver.observe(document.body);
  window.addEventListener("scroll", callback);

  return () => {
    resizeObserver.disconnect();
    window.removeEventListener("scroll", callback);
  };
};

const viewportRectKeys: (keyof TViewportRect)[] = [
  "scrollHeight",
  "left",
  "top",
  "width",
  "height",
];

const isSameRect = (prev: TViewportRect, next: TViewportRect) =>
  viewportRectKeys.every((k) => prev?.[k] === next?.[k]);

const getViewportRect = () => {
  let stored: TViewportRect;

  return () => {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/scrollingElement
     */
    const scrollingElement =
      typeof document !== "undefined" && document.scrollingElement;
    if (!scrollingElement) {
      return null;
    }

    const { left, top, width, height } =
      scrollingElement.getBoundingClientRect();
    const newRect: TViewportRect = {
      left,
      top,
      width,
      height,
      scrollHeight: scrollingElement.scrollHeight,
    };
    if (!isSameRect(stored, newRect)) {
      stored = newRect;
    }

    return stored;
  };
};

const ViewportRectContext = createContext<null | TViewportRect>(null);

type TProps = {
  children: React.ReactNode;
};

export function ViewportRectContextProvider({ children }: TProps) {
  const viewportRect = useSyncExternalStore(subscribe, getViewportRect());

  return (
    <ViewportRectContext.Provider value={viewportRect}>
      {children}
    </ViewportRectContext.Provider>
  );
}

export const useViewportRect = () => {
  const viewportRect = useContext(ViewportRectContext);
  if (viewportRect === null) {
    throw new Error(getContextError("ViewportRect"));
  }

  return viewportRect;
};
