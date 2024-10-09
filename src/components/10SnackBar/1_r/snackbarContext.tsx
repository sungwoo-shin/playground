import {
  createContext,
  EventHandler,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { assertIsDefined } from "#/utils/assetIsDefined";
import { getContextError } from "#/utils/getContextError";
// eslint-disable-next-line import/no-cycle
import { SnackbarRoot } from "./snackbarRoot";

const SNACKBAR_DURATION_MS = 3000;

const DEFAULT_SNACKBAR: TSnackbar = {
  id: "",
  children: null,
  isOpen: true,
  timeoutId: null,
};

export type TSnackbar = {
  id: string;
  children: ReactNode;
  isOpen: boolean;
  timeoutId: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMouseEnter?: EventHandler<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMouseLeave?: EventHandler<any>;
};

type TSnackbarValues = null | TSnackbar[];
type TSnackbarActions = null | {
  upsertSnackbar: (snackbar: Partial<TSnackbar>) => void;
  createSnackbar: (id: string, children: React.ReactNode) => void;
  removeSnackbar: (id: string) => void;
};

const SnackbarValuesContext = createContext<TSnackbarValues>(null);
const SnackbarActionsContext = createContext<TSnackbarActions>(null);

export function SnackbarContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [snackbarValues, setSnackbarValues] = useState<TSnackbarValues>([]);

  const upsertSnackbar = (snackbar: Partial<TSnackbar>) => {
    setSnackbarValues((prev) => {
      assertIsDefined(prev);

      const prevIdx = prev?.findIndex((item) => item.id === snackbar.id);
      if (prevIdx !== -1) {
        const newSnackbars = prev.map((item, i) =>
          i === prevIdx
            ? {
                ...prev[prevIdx],
                ...snackbar,
              }
            : item,
        );

        return newSnackbars;
      }

      return [...prev, { ...DEFAULT_SNACKBAR, ...snackbar }];
    });
  };

  // 객체 할당 방식
  const createSnackbar = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (id: string, children: React.ReactNode) => {
      const newSnackbar: TSnackbar = {
        id,
        children,
        isOpen: true,
        timeoutId: window.setTimeout(() => {
          upsertSnackbar({ id, isOpen: false, timeoutId: null });
        }, SNACKBAR_DURATION_MS),
      };
      newSnackbar.onMouseEnter = () => {
        if (newSnackbar.timeoutId) {
          clearTimeout(newSnackbar.timeoutId);
        }
      };
      newSnackbar.onMouseLeave = () => {
        newSnackbar.timeoutId = window.setTimeout(() => {
          upsertSnackbar({
            id,
            isOpen: false,
            timeoutId: null,
          });
        }, SNACKBAR_DURATION_MS);
      };
      upsertSnackbar(newSnackbar);
    },
    [],
  );

  const removeSnackbar = (id: string) => {
    setSnackbarValues((prev) => {
      assertIsDefined(prev);

      return prev.filter((prevItem) => prevItem.id !== id);
    });
  };

  const actions = useMemo(
    () => ({ upsertSnackbar, createSnackbar, removeSnackbar }),
    [createSnackbar],
  );

  return (
    <SnackbarValuesContext.Provider value={snackbarValues}>
      <SnackbarActionsContext.Provider value={actions}>
        {children}
        <SnackbarRoot />
      </SnackbarActionsContext.Provider>
    </SnackbarValuesContext.Provider>
  );
}

export const useSnackbarValues = () => {
  const values = useContext(SnackbarValuesContext);
  if (values === null) {
    throw new Error(getContextError("SnackbarValues"));
  }

  return values;
};
export const useSnackbarActions = () => {
  const actions = useContext(SnackbarActionsContext);
  if (actions === null) {
    throw new Error(getContextError("SnackbarActions"));
  }

  return actions;
};
