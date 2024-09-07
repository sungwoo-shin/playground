/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect } from "react";

import cx from "./cx";
import data from "./data";

function Tooltip({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <details className={cx("details")} data-tooltip={id}>
      <summary className={cx("summary")} data-tooltip-summary>
        {title}
      </summary>
      <div className={cx("tooltip")} onClick={(e) => e.stopPropagation()}>
        {description}
      </div>
    </details>
  );
}

function Tooltip3() {
  useEffect(() => {
    const closeAllTooltip = (e: Event) => {
      const target = e.target as HTMLElement;
      document.querySelectorAll("[data-tooltip]").forEach((elem) => {
        if (elem !== target.parentElement) {
          elem.removeAttribute("open");
        }
      });
    };
    window.addEventListener("click", closeAllTooltip);

    return () => {
      window.removeEventListener("click", closeAllTooltip);
    };
  }, []);

  return (
    <>
      <h3>
        #3. React<sub>html details 태그 사용</sub>
      </h3>
      {data.map((d) => (
        <Tooltip {...d} key={d.id} />
      ))}
    </>
  );
}

export default Tooltip3;
