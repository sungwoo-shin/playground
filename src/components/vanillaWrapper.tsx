import { useEffect, useRef } from "react";

type TProps = {
  initiator: (wrapper: HTMLDivElement) => void;
};

export function VanillaWrapper({ initiator }: TProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isInitializedRef.current && wrapperRef.current) {
      initiator(wrapperRef.current);
      isInitializedRef.current = true;
    }
  }, [initiator]);

  return <div ref={wrapperRef} />;
}
