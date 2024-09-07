import { useEffect } from "react";

import { cx } from "./cx";
import { data } from "./data";

type TProps = {
  id: string;
  title: string;
  description: string;
};

function Tooltip({ id, title, description }: TProps) {
  return (
    <details className={cx("details")} data-tooltip={id}>
      <summary className={cx("summary")}>{title}</summary>
      <div
        className={cx("tooltip")}
        onClick={(event) => event.stopPropagation()}
      >
        {description}
      </div>
    </details>
  );
}

export function Tooltip3R() {
  useEffect(() => {
    const closeAllTooltip = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

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
      <h3>#3. React - html details 태그 사용 (Good)</h3>
      {data.map(({ description, id, title }) => (
        <Tooltip key={id} description={description} id={id} title={title} />
      ))}
    </>
  );
}
