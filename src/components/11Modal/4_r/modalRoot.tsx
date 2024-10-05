import { useEffect, useRef } from "react";

import { assertIsDefined } from "#/utils/assetIsDefined";

export function ModalRoot() {
  const modalRootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    assertIsDefined(modalRootRef.current);

    const handleMutate = () => {
      assertIsDefined(modalRootRef.current);

      const modalCount = modalRootRef.current.childNodes.length || 0;
      document.body.classList.toggle("no-scroll", modalCount > 0);
    };

    const observer = new MutationObserver(handleMutate);
    observer.observe(modalRootRef.current, {
      childList: true,
      subtree: false,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div id="modalRoot" ref={modalRootRef} />;
}
