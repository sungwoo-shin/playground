import { useEffect, useRef, useState } from "react";

import cx from "../cx";
// eslint-disable-next-line import/no-cycle
import {
  TSnackbar,
  useSnackbarActions,
  useSnackbarValues,
} from "./snackbarContext";

function SnackbarItem({
  id,
  isOpen,
  children,
  onMouseEnter,
  onMouseLeave,
}: TSnackbar) {
  const { removeSnackbar } = useSnackbarActions();
  const elemRef = useRef<HTMLDivElement>(null);
  const [animationClassName, setAnimationClassName] = useState<string[]>([]);

  // enter => show => show exit => 삭제
  const handleAnimationEnd = () => {
    if (elemRef.current?.className.includes("enter")) {
      setAnimationClassName(["show"]);
    } else {
      removeSnackbar(id);
    }
  };

  useEffect(() => {
    setAnimationClassName(isOpen ? ["enter"] : ["show", "exit"]);
  }, [isOpen]);

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

export function SnackbarRoot() {
  const snackbars = useSnackbarValues();

  return (
    <div className={cx("Snackbars")}>
      {snackbars.map((item) => (
        <SnackbarItem {...item} key={item.id} />
      ))}
    </div>
  );
}
