import { RefObject, useLayoutEffect, useState } from "react";

import { useViewportRect } from "#/contexts/ViewportRectContextProvider";

type TPositionKey = "left" | "right" | "top" | "bottom";
type TPosition = Partial<Record<TPositionKey, string | number>>;
type TStyle = Partial<Record<"left" | "right" | "top" | "bottom", number>>;

export const useStyleInView = ({
  wrapperRef,
  targetRef,
  position,
  positionType = "relative",
  needUpdate = true,
}: {
  wrapperRef: RefObject<HTMLElement>;
  targetRef: RefObject<HTMLElement>;
  position: TPosition;
  positionType?: "absolute" | "relative";
  needUpdate?: boolean;
}) => {
  const viewportRect = useViewportRect();
  const [style, setStyle] = useState<TStyle>({});

  useLayoutEffect(() => {
    if (!needUpdate || !wrapperRef.current || !targetRef.current) {
      return;
    }

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();

    const verticalKey =
      wrapperRect.bottom + targetRect.height < viewportRect.height
        ? "top"
        : "bottom";
    const horizontalKey =
      wrapperRect.right + targetRect.width < viewportRect.width
        ? "left"
        : "right";

    if (positionType === "absolute") {
      const absoluteTop = -viewportRect.top + wrapperRect.top;

      setStyle({
        [verticalKey]:
          verticalKey === "top"
            ? absoluteTop + wrapperRect.height + +(position.top || 0)
            : viewportRect.height - absoluteTop + +(position.bottom || 0),
        [verticalKey === "top" ? "bottom" : "top"]: "auto",
        [horizontalKey]:
          horizontalKey === "left"
            ? wrapperRect.left - +(position.left || 0)
            : viewportRect.width - wrapperRect.right + +(position.right || 0),
        [horizontalKey === "left" ? "right" : "left"]: "auto",
      });
    } else if (positionType === "relative") {
      setStyle({
        [verticalKey]: position[verticalKey] || 0,
        [verticalKey === "top" ? "bottom" : "top"]: "auto",
        [horizontalKey]: position[horizontalKey] || 0,
        [horizontalKey === "left" ? "right" : "left"]: "auto",
      });
    } else {
      throw new Error("Unexpected positionType");
    }
  }, [
    needUpdate,
    position,
    positionType,
    targetRef,
    viewportRect.height,
    viewportRect.top,
    viewportRect.width,
    wrapperRef,
  ]);

  return style;
};
