import {
  Dispatch,
  EventHandler,
  ReactNode,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

// eslint-disable-next-line import/no-cycle
import SnackbarItem from "./snackbarItem";

const SNACKBAR_DURATION = 3000;
type SnackbarStatus = "open" | "close" | null;

export type Snackbar = {
  children: ReactNode;
  status: SnackbarStatus;
  setStatus: Dispatch<SetStateAction<SnackbarStatus>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMouseEnter?: EventHandler<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMouseLeave?: EventHandler<any>;
};

const useSnackbar = (children: ReactNode) => {
  const timeoutId = useRef<number | null>(null);
  const [status, setStatus] = useState<SnackbarStatus>(null);

  const openSnackbar = useCallback(() => {
    setStatus("open");
    timeoutId.current = window.setTimeout(
      () => setStatus("close"),
      SNACKBAR_DURATION,
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
    }, SNACKBAR_DURATION);
  };

  return {
    snackbar: status
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

export default useSnackbar;
