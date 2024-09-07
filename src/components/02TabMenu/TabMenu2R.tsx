import { useState } from "react";

import { cx } from "./cx";
import { data } from "./data";

type TProps = {
  id: string;
  title: string;
  current: boolean;
  onClick: () => void;
};

function TabItem({ id, title, current, onClick }: TProps) {
  return (
    <li className={cx("tab", { current })} key={id} onClick={onClick}>
      {title}
    </li>
  );
}

export function TabMenu2R() {
  const [currentId, setCurrentId] = useState<string>(data[0].id);

  const handleClick = (id: string) => {
    setCurrentId(id);
  };

  return (
    <>
      <h3>#2. React - 다 그려놓고 hidden/show css로 처리</h3>
      <div className={cx("container", "tabMenu2")}>
        <ul className={cx("tabList")}>
          {data.map(({ id, title }) => (
            <TabItem
              key={id}
              current={currentId === id}
              onClick={() => handleClick(id)}
              id={id}
              title={title}
            />
          ))}
        </ul>
        {data.map(({ description, id }) => (
          <div
            key={id}
            className={cx("description", { current: currentId === id })}
          >
            {description}
          </div>
        ))}
      </div>
    </>
  );
}
