import { useRef } from "react";

import { useStyleInView } from "#/hooks/useStyleInView";
import { ViewportRectContextProvider } from "../../contexts/ViewportRectContextProvider";
import { cx } from "./cx";
import { data } from "./data";

const tooltipPosition = {
  top: "100%",
  bottom: 20,
  left: 0,
  right: 0,
};

type TProps = {
  id: string;
  title: string;
  description: string;
};

function Tooltip({ id, title, description }: TProps) {
  const wrapperRef = useRef<HTMLDetailsElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const style = useStyleInView({
    wrapperRef,
    targetRef,
    position: tooltipPosition,
  });

  return (
    <details className={cx("details")} data-tooltip={id} ref={wrapperRef}>
      <summary className={cx("summary")} data-tooltip-summary>
        {title}
      </summary>
      <div
        className={cx("tooltip")}
        onClick={(event) => event.stopPropagation()}
        ref={targetRef}
        style={style}
      >
        {description}
      </div>
    </details>
  );
}

export function Tooltip4R() {
  return (
    <ViewportRectContextProvider>
      <>
        <h3>#4. React - 화면 영역 안에 있도록 처리</h3>
        {data.map(({ description, id, title }) => (
          <Tooltip key={id} description={description} id={id} title={title} />
        ))}
      </>
    </ViewportRectContextProvider>
  );
}
