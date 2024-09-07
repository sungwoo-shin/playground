import { useCallback, useEffect, useRef, useState } from "react";

import { cx } from "./cx";
import { data } from "./data";

type TProps = {
  title: string;
  description: string;
};

function AccordionItem({ title, description }: TProps) {
  const [current, setCurrent] = useState(false);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const handleOpenToggle = useCallback(() => setCurrent((prev) => !prev), []);

  useEffect(() => {
    const descriptionElem = descriptionRef.current;

    descriptionElem?.addEventListener("beforematch", handleOpenToggle);

    return () => {
      descriptionElem?.removeEventListener("beforematch", handleOpenToggle);
    };
  }, [handleOpenToggle]);

  return (
    <li className={cx("item", "item3", { current })}>
      <div className={cx("tab")} onClick={handleOpenToggle}>
        {title}
      </div>
      <div
        className={cx("description")}
        ref={descriptionRef}
        // @ts-expect-error expected
        hidden={current ? undefined : "until-found"}
      >
        {description}
      </div>
    </li>
  );
}

export function Accordion7R() {
  return (
    <>
      <h3>#7. React - 여러 개가 펼쳐지는 아코디언 + 검색가능</h3>
      <ul className={cx("container")}>
        {data.map(({ description, id, title }) => (
          <AccordionItem key={id} description={description} title={title} />
        ))}
      </ul>
    </>
  );
}
