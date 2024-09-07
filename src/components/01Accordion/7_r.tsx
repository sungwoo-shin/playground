/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from "react";

import cx from "./cx";
import { data } from "./data";

function AccordionItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [current, setCurrent] = useState(false);

  const descRef = useRef<HTMLDivElement>(null);

  const toggle = () => setCurrent((prev) => !prev);

  useEffect(() => {
    if (descRef.current) {
      descRef.current.addEventListener("beforematch", toggle);
    }

    return () => {
      if (descRef.current) {
        descRef.current.removeEventListener("beforematch", toggle);
      }
    };
  }, [toggle]);

  return (
    <li className={cx("item", "item3", { current })}>
      <div className={cx("tab")} onClick={toggle}>
        {title}
      </div>
      <div
        className={cx("description")}
        ref={descRef}
        // @ts-expect-error hidden
        HIDDEN={current ? undefined : "until-found"}
      >
        {description}
      </div>
    </li>
  );
}

function Accordion7() {
  return (
    <>
      <h3>
        #7. React
        <sub>여러 개가 펼쳐지는 아코디언 + 검색가능 - by 강민혜(@himyne)</sub>
      </h3>
      <ul className={cx("container")}>
        {data.map((d) => (
          <AccordionItem {...d} key={d.id} />
        ))}
      </ul>
    </>
  );
}

export default Accordion7;
