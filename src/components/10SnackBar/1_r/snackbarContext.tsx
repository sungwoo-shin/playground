import {
  createContext,
  Dispatch,
  EventHandler,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
} from "react";

// eslint-disable-next-line import/no-cycle
import SnackbarRoot from "./snackbarRoot";

const SNACKBAR_DURATION = 3000;

export type Snackbar = {
  id: string;
  children: ReactNode;
  isOpen: boolean;
  timeoutId: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMouseEnter?: EventHandler<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMouseLeave?: EventHandler<any>;
};
type SnackbarActionType = "upsert" | "remove";
type SnackbarState = Snackbar[];
const SnackbarContext = createContext<SnackbarState>([]);
const SnackbarSetContext = createContext<
  Dispatch<{
    type: SnackbarActionType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: Record<string, any>;
  }>
>(() => {});

const DeafultSnackbar: Snackbar = {
  id: "",
  children: null,
  isOpen: true,
  timeoutId: null,
};

const snackbarReducerMap: Record<
  SnackbarActionType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (state: SnackbarState, payload: any) => SnackbarState
> = {
  upsert: (state, payload: Partial<Snackbar>) => {
    const targetIndex = state.findIndex((item) => item.id === payload.id);
    if (targetIndex > -1) {
      const newSnackbars = state.map((item, i) => {
        if (i === targetIndex) {
          return {
            ...state[targetIndex],
            ...payload,
          };
        }

        return item;
      });

      return newSnackbars;
    }

    return [...state, { ...DeafultSnackbar, ...payload }];
  },
  remove: (state, { id }: { id: string }) => {
    const targetIndex = state.findIndex((item) => item.id === id);

    return state.filter((item, index) => index !== targetIndex);
  },
};

const snackbarReducer = (
  state: SnackbarState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { type, payload }: { type: SnackbarActionType; payload: Record<string, any> },
) => snackbarReducerMap[type](state, payload);

function SnackbarContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(snackbarReducer, []);

  return (
    <SnackbarContext.Provider value={state}>
      <SnackbarSetContext.Provider value={dispatch}>
        {children}
        <SnackbarRoot />
      </SnackbarSetContext.Provider>
    </SnackbarContext.Provider>
  );
}

export default SnackbarContextProvider;

export const useSnackbar = () => useContext(SnackbarContext);
export const useSetSnackbar = () => {
  const dispatch = useContext(SnackbarSetContext);

  const createSnackbar = useCallback((id: string, children: ReactNode) => {
    const newItem: Snackbar = {
      id,
      children,
      isOpen: true,
      timeoutId: window.setTimeout(() => {
        dispatch({
          type: "upsert",
          payload: { id, isOpen: false, timeoutId: null },
        });
      }, SNACKBAR_DURATION),
    };
    newItem.onMouseEnter = () => {
      if (newItem.timeoutId) {
        clearTimeout(newItem.timeoutId);
      }
    };
    newItem.onMouseLeave = () => {
      newItem.timeoutId = window.setTimeout(() => {
        dispatch({
          type: "upsert",
          payload: { id, isOpen: false, timeoutId: null },
        });
      }, SNACKBAR_DURATION);
    };
    dispatch({ type: "upsert", payload: newItem });
  }, []);
  const removeSnackbar = useCallback((id: string) => {
    dispatch({ type: "remove", payload: { id } });
  }, []);

  return {
    createSnackbar,
    removeSnackbar,
  };
};
