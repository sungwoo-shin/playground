import { useCallback, useState } from "react";

export const useModal = () => {
  const [opened, setOpened] = useState(false);

  const openModal = useCallback(() => {
    setOpened(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpened(false);
  }, []);

  return {
    opened,
    openModal,
    closeModal,
  };
};
