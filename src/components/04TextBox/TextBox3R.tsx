import { useEffect, useRef } from "react";

import { assertIsDefined } from "#/utils/assetIsDefined";
import { cx } from "./cx";

const MIN_ROWS = 3;
const MAX_ROWS = 15;

export function TextBox3R() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const clonedTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textareaElem = textareaRef.current;
    const clonedTextareaElem = clonedTextareaRef.current;

    const handleInput = () => {
      assertIsDefined(textareaElem);
      assertIsDefined(clonedTextareaElem);

      clonedTextareaElem.value = textareaElem.value;
      textareaElem.rows = Math.min(
        Math.max(
          Math.floor(
            clonedTextareaElem.scrollHeight / clonedTextareaElem.clientHeight,
          ),
          MIN_ROWS,
        ),
        MAX_ROWS,
      );
    };

    textareaElem?.addEventListener("input", handleInput);

    return () => {
      textareaElem?.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <>
      <h3>#3. React - uncontrolled. clone elem</h3>
      <div className={cx("container")}>
        <textarea
          className={cx("clone")}
          ref={clonedTextareaRef}
          rows={1}
          readOnly
        />
        <textarea
          className={cx("textarea")}
          ref={textareaRef}
          rows={MIN_ROWS}
        />
      </div>
    </>
  );
}
