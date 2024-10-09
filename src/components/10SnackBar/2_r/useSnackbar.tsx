import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";

// eslint-disable-next-line import/no-cycle
import { SnackbarItem } from "./snackbarItem";

const SNACKBAR_DURATION_MS = 3000;

type TStatus = "open" | "close" | null;

export type TSnackbar = {
  children: React.ReactNode;
  status: TStatus;
  setStatus: Dispatch<SetStateAction<TStatus>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMouseEnter?: React.EventHandler<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMouseLeave?: React.EventHandler<any>;
};

export const useSnackbar = (children: React.ReactNode) => {
  const timeoutId = useRef<number | null>(null);
  const [status, setStatus] = useState<TStatus>(null);

  const openSnackbar = useCallback(() => {
    setStatus("open");
    timeoutId.current = window.setTimeout(
      () => setStatus("close"),
      SNACKBAR_DURATION_MS,
    );
  }, []);

  const handleMouseEnter = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  const handleMouseLeave = () => {
    timeoutId.current = window.setTimeout(() => {
      setStatus("close");
    }, SNACKBAR_DURATION_MS);
  };

  return {
    snackbarPortal: status
      ? createPortal(
          <SnackbarItem
            status={status}
            setStatus={setStatus}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {children}
          </SnackbarItem>,
          document.querySelector("#snackbarRoot")!,
        )
      : null,
    open: openSnackbar,
  };
};
