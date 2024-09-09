import { useRef, useState } from "react";

import { measureTextRows } from "#/utils/measureTextRows";
import { cx } from "./cx";
import { data } from "./data";

const ROWS = 3;

type TProps = {
  text: string;
};

function LineClampedText({ text }: TProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(true);

  if (textRef.current) {
    const measuredLines = measureTextRows(textRef.current, text);
    const newIsClamped = measuredLines > ROWS;
    if (isClamped && isClamped !== newIsClamped) {
      setIsClamped(newIsClamped);
    }
  }

  return (
    <div className={cx("content", { clamped: isClamped })}>
      <div
        className={cx("text")}
        ref={textRef}
        style={{ WebkitLineClamp: ROWS }}
      >
        {text}
      </div>
      {isClamped && (
        <button
          type="button"
          className={cx("buttonMore")}
          onClick={() => setIsClamped(false)}
        />
      )}
    </div>
  );
}

export function LineClamp1R() {
  return (
    <>
      <h3>#1. React - canvas - 3줄말줄임</h3>
      {data.map((text, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <LineClampedText text={text} key={i} />
      ))}
    </>
  );
}
