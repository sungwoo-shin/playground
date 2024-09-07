import { useEffect, useRef, useState } from "react";

import cx from "../cx";
// eslint-disable-next-line import/no-cycle
import { Snackbar, useSetSnackbar, useSnackbar } from "./snackbarContext";

function SnackbarItem({
  id,
  isOpen,
  children,
  onMouseEnter,
  onMouseLeave,
}: Snackbar) {
  const { removeSnackbar } = useSetSnackbar();
  const elemRef = useRef<HTMLDivElement>(null);
  const [animationClassName, setAnimationClassName] = useState<string[]>([]);

  const handleAnimationEnd = () => {
    if (elemRef.current?.className.includes("enter")) {
      setAnimationClassName(["show"]);
    } else {
      removeSnackbar(id);
    }
    // enter => show => show exit => 삭제
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

function SnackbarRoot() {
  const snackbars = useSnackbar();

  return (
    <div className={cx("Snackbars")}>
      {snackbars.map((item) => (
        <SnackbarItem {...item} key={item.id} />
      ))}
    </div>
  );
}

export default SnackbarRoot;
