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

export function TabMenu1R() {
  const [currentId, setCurrentId] = useState<string>(data[0].id);

  const handleClick = (id: string) => () => {
    setCurrentId(id);
  };

  const currentDescription =
    data.find((item) => item.id === currentId)?.description || "";

  return (
    <>
      <h3>#1. React - 현재 desc만 html로 그리기</h3>
      <div className={cx("container")}>
        <ul className={cx("tabList")}>
          {data.map(({ id, title }) => (
            <TabItem
              key={id}
              current={currentId === id}
              onClick={handleClick(id)}
              id={id}
              title={title}
            />
          ))}
        </ul>
        <div className={cx("description")}>{currentDescription}</div>
      </div>
    </>
  );
}
