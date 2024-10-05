import { useCallback, useRef } from "react";

import { assertIsDefined } from "#/utils/assetIsDefined";

const toggleScroll = (force?: boolean) => {
  document.body!.classList.toggle(
    "no-scroll",
    typeof force === "boolean"
      ? force
      : document.querySelectorAll("dialog[open]").length > 0,
  );
};

export const useModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = useCallback(() => {
    assertIsDefined(modalRef.current);

    modalRef.current.showModal();
    toggleScroll(true);
  }, []);

  const closeModal = useCallback(() => {
    assertIsDefined(modalRef.current);

    modalRef.current.close();
    toggleScroll();
  }, []);

  return {
    modalRef,
    openModal,
    closeModal,
  };
};
