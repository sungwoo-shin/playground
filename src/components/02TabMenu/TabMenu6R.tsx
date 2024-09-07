import { useEffect, useRef, useState } from "react";

import { cx } from "./cx";
import { data } from "./data";

type TTabItemProps = {
  id: string;
  title: string;
  current: boolean;
  toggle: () => void;
};

function TabItem({ id, title, current, toggle }: TTabItemProps) {
  return (
    <li className={cx("tab", { current })} key={id} onClick={toggle}>
      {title}
    </li>
  );
}

type TDescriptionProps = {
  id: string;
  current: boolean;
  description: string;
  onClick: () => void;
};

function Description({ id, current, description, onClick }: TDescriptionProps) {
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const descriptionElem = descriptionRef.current;

    descriptionElem?.addEventListener("beforematch", onClick);

    return () => {
      descriptionElem?.removeEventListener("beforematch", onClick);
    };
  }, [onClick]);

  return (
    <div
      ref={descriptionRef}
      key={id}
      className={cx("description", { current })}
      // @ts-expect-error expected
      hidden={current ? undefined : "until-found"}
    >
      {description}
    </div>
  );
}

export function TabMenu6R() {
  const parentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLUListElement>(null);
  const [currentId, setCurrentId] = useState<string>(data[0].id);

  const handleClick = (id: string) => {
    setCurrentId(id);
  };

  return (
    <>
      <h3>#6. React - 검색이 가능한 Tab 메뉴</h3>
      <div className={cx("container", "tabMenu6")} ref={parentRef}>
        <ul className={cx("tabList")} ref={headerRef}>
          {data.map(({ id, title }) => (
            <TabItem
              key={id}
              current={currentId === id}
              toggle={() => handleClick(id)}
              id={id}
              title={title}
            />
          ))}
        </ul>
        {data.map(({ description, id }) => (
          <Description
            key={id}
            current={currentId === id}
            onClick={() => handleClick(id)}
            description={description}
            id={id}
          />
        ))}
      </div>
    </>
  );
}
