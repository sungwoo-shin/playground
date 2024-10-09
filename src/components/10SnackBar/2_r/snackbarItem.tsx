import { useEffect, useRef, useState } from "react";

import cx from "../cx";
// eslint-disable-next-line import/no-cycle
import { TSnackbar } from "./useSnackbar";

export function SnackbarItem({
  status,
  setStatus,
  children,
  onMouseEnter,
  onMouseLeave,
}: TSnackbar) {
  const elemRef = useRef<HTMLDivElement>(null);
  const [animationClassName, setAnimationClassName] = useState<string[]>([]);

  useEffect(() => {
    setAnimationClassName(status === "open" ? ["enter"] : ["show", "exit"]);
  }, [status]);

  // enter => show => show exit => 삭제
  const handleAnimationEnd = () => {
    if (elemRef.current?.className.includes("enter")) {
      setAnimationClassName(["show"]);
    } else {
      setStatus(null);
    }
  };

  return (
    <div
      ref={elemRef}
      className={cx("SnackbarItem", animationClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onAnimationEnd={handleAnimationEnd}
    >
      {children}
    </div>
  );
}
