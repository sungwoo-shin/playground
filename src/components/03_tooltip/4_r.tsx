/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from "react";

import ViewportContextProvider from "../../contexts/viewportContext";
import cx from "./cx";
import data from "./data";
import useStyleInView from "./useStyleInView";

const tooltipPosition = {
  top: "100%",
  bottom: 20,
  left: 0,
  right: 0,
};

function Tooltip({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  const wrapperRef = useRef<HTMLDetailsElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const style = useStyleInView(wrapperRef, targetRef, tooltipPosition);

  return (
    <details className={cx("details")} data-tooltip={id} ref={wrapperRef}>
      <summary className={cx("summary")} data-tooltip-summary>
        {title}
      </summary>
      <div
        className={cx("tooltip")}
        onClick={(e) => e.stopPropagation()}
        ref={targetRef}
        style={style}
      >
        {description}
      </div>
    </details>
  );
}

function Tooltip4() {
  return (
    <ViewportContextProvider>
      <>
        <h3>
          #4. React<sub>화면 영역 안에 있도록 처리</sub>
        </h3>
        {data.map((d) => (
          <Tooltip {...d} key={d.id} />
        ))}
      </>
    </ViewportContextProvider>
  );
}
export default Tooltip4;
