import { useState } from "react";

import { cx } from "./cx";
import { data } from "./data";

type TProps = {
  id: string;
  title: string;
  description: string;
  current: boolean;
  onClick: () => void;
};

function TabItem({ id, title, description, current, onClick }: TProps) {
  return (
    <li className={cx("item", { current })} key={id}>
      <div className={cx("tab")} onClick={onClick}>
        {title}
      </div>
      <div className={cx("description")}>{description}</div>
    </li>
  );
}

export function TabMenu3R() {
  const [currentId, setCurrentId] = useState<string>(data[0].id);

  const handleClick = (id: string) => {
    setCurrentId(id);
  };

  return (
    <>
      <h3>#3. React - 한 li 안에 title/desc 모두 있게 처리 (접근성)</h3>
      <ul className={cx("container", "tabMenu3")}>
        {data.map(({ description, id, title }) => (
          <TabItem
            key={id}
            current={currentId === id}
            onClick={() => handleClick(id)}
            description={description}
            id={id}
            title={title}
          />
        ))}
      </ul>
    </>
  );
}
