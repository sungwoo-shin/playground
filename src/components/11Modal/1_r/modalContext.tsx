import {
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { getContextError } from "#/utils/getContextError";

type TModalValues = Map<string, React.ReactNode>;
type TModalActions = {
  openModal: (id: string, Modal: React.ReactNode) => void;
  closeModal: (id: string) => void;
};

const ModalValuesContext = createContext<TModalValues | null>(null);
const ModalActionsContext = createContext<TModalActions | null>(null);

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [modalValues, setModalValues] = useState<TModalValues>(new Map());
  const modals = Array.from(modalValues.values());

  const toggleScroll = useCallback(
    () => document.body.classList.toggle("no-scroll", modalValues.size > 0),
    [modalValues.size],
  );

  const openModal = useCallback(
    (id: string, Modal: React.ReactNode) => {
      setModalValues((prev) => {
        const newMap = new Map(prev);
        newMap.set(id, Modal);

        return newMap;
      });
      toggleScroll();
    },
    [toggleScroll],
  );

  const closeModal = useCallback(
    (id: string) => {
      setModalValues((prev) => {
        const newMap = new Map(prev);
        newMap.delete(id);

        return newMap;
      });
      toggleScroll();
    },
    [toggleScroll],
  );

  const actions = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [closeModal, openModal],
  );

  return (
    <ModalValuesContext.Provider value={modalValues}>
      <ModalActionsContext.Provider value={actions}>
        {children}
        <div id="modalRoot">
          {modals.map((Modal, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={i}>{Modal}</Fragment>
          ))}
        </div>
      </ModalActionsContext.Provider>
    </ModalValuesContext.Provider>
  );
}

export const useModalValues = () => {
  const values = useContext(ModalValuesContext);
  if (values === null) {
    throw new Error(getContextError("ModalValues"));
  }

  return values;
};

export const useModalActions = () => {
  const actions = useContext(ModalActionsContext);
  if (actions === null) {
    throw new Error(getContextError("ModalActions"));
  }

  return actions;
};
