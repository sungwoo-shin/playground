import { useState } from "react";

import { cx } from "./cx";
import { data } from "./data";

type TAccordionItemProps = {
  id: string;
  title: string;
  description: string;
  open: boolean;
  onOpenToggle: () => void;
};

function AccordionItem({
  id,
  title,
  description,
  open,
  onOpenToggle,
}: TAccordionItemProps) {
  return (
    <li className={cx("item", "item3", { current: open })} key={id}>
      <div className={cx("tab")} onClick={onOpenToggle}>
        {title}
      </div>
      <div className={cx("description")}>{description}</div>
    </li>
  );
}

export function Accordion3R() {
  const [openId, setOpenId] = useState<string | null>(data[0].id);

  const handleOpenToggle = (id: string) => () => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <h3>#3. React - css animation (transition)</h3>
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
