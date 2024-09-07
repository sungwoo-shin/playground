import { useState } from "react";

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
  return (
    <li className={cx("item", "item2", { current: open })} key={id}>
      <div className={cx("tab")} onClick={onOpenToggle}>
        {title}
      </div>
      <div className={cx("description")}>{description}</div>
    </li>
  );
}

export function Accordion2R() {
  const [openId, setOpenId] = useState<string | null>(data[0].id);

  const handleOpenToggle = (id: string) => () => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <h3>#2. React - css로 hidden/show 처리</h3>
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
