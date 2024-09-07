import { useEffect, useRef } from "react";

import { cx } from "./cx";
import { data } from "./data";

type TProps = {
  title: string;
  description: string;
  open: boolean;
};

function AccordionItem({ title, description, open }: TProps) {
  const descriptionRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleBeforeMatch = () => descriptionRef.current?.open;
    const descriptionElem = descriptionRef.current;

    descriptionElem?.addEventListener("beforematch", handleBeforeMatch);

    return () => {
      descriptionElem?.removeEventListener("beforematch", handleBeforeMatch);
    };
  }, [open]);

  return (
    <details name="test" className={cx("item7")} ref={descriptionRef}>
      <summary>{title}</summary>
      <div className={cx("description")}>{description}</div>
    </details>
  );
}

export function Accordion8R() {
  return (
    <>
      <h3>#8. React - 여러 개가 펼쳐지는 아코디언 + 검색가능 (details태그)</h3>
      <ul className={cx("container")}>
        {data.map(({ description, id, title }, i) => (
          <AccordionItem
            key={id}
            open={i === 0}
            description={description}
            title={title}
          />
        ))}
      </ul>
    </>
  );
}
