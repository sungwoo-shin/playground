import { useEffect, useRef, useState } from "react";

import { cx } from "./cx";
import { data } from "./data";

type TProps = {
  id: string;
  title: string;
  description: string;
  open: boolean;
  onOpenToggle: () => void;
};

function AccordionItem({ id, title, description, open, onOpenToggle }: TProps) {
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const descriptionElem = descriptionRef.current;
    descriptionElem?.addEventListener("beforematch", onOpenToggle);

    return () => {
      descriptionElem?.removeEventListener("beforematch", onOpenToggle);
    };
  }, [onOpenToggle]);

  return (
    <li className={cx("item", "item3", { current: open })} key={id}>
      <div className={cx("tab")} onClick={onOpenToggle}>
        {title}
      </div>
      <div
        className={cx("description")}
        ref={descriptionRef}
        // @ts-expect-error expected
        hidden={open ? undefined : "until-found"}
      >
        asdf
        {description}
      </div>
    </li>
  );
}

/**
 * @see https://hiddenest.dev/accessible-accordion
 */
export function Accordion6R() {
  const [openId, setOpenId] = useState<string | null>(data[0].id);

  const handleOpenToggle = (id: string) => () => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <h3>#6. React - ctrl+F 검색 가능</h3>
      <ul className={cx("container")}>
        {data.map(({ description, id, title }) => (
          <AccordionItem
            key={id}
            open={openId === id}
            onOpenToggle={handleOpenToggle(id)}
            description={description}
            id={id}
            title={title}
          />
        ))}
      </ul>
    </>
  );
}
