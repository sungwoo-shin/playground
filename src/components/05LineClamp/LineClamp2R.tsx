import { useRef, useState } from "react";

import { cx } from "./cx";
import { data } from "./data";

type TProps = {
  text: string;
  rows: number;
};

function LineClampedText({ text, rows = 0 }: TProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const clonedTextRef = useRef<HTMLDivElement>(null);
  const [isClamped, setIsClamped] = useState(true);

  if (textRef.current && clonedTextRef.current) {
    const newIsClamped =
      Math.floor(
        clonedTextRef.current.offsetHeight /
          parseInt(getComputedStyle(textRef.current).lineHeight, 10),
      ) > rows;
    if (isClamped && isClamped !== newIsClamped) {
      setIsClamped(newIsClamped);
    }
  }

  return (
    <div className={cx("content", { clamped: isClamped })}>
      <div className={cx("text-clone")} ref={clonedTextRef}>
        {text}
      </div>
      <div
        className={cx("text")}
        ref={textRef}
        style={{ WebkitLineClamp: rows }}
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

export function LineClamp2R() {
  return (
    <>
      <h3>#2. React - clone - 3줄말줄임</h3>
      {data.map((text, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <LineClampedText text={text} rows={5 - i} key={i} />
      ))}
    </>
  );
}
