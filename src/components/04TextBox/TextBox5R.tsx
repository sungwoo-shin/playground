import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { assertIsDefined } from "#/utils/assetIsDefined";
import { cx } from "./cx";

const MIN_ROWS = 3;
const MAX_ROWS = 15;

type TProps = {
  minRow: number;
  maxRow: number;
};

const TextBox = forwardRef(({ minRow, maxRow }: TProps, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const clonedTextareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      getValue() {
        return textareaRef.current?.value;
      },
    }),
    [],
  );

  useEffect(() => {
    const textareaElem = textareaRef.current;
    const clonedTextareaElem = clonedTextareaRef.current;

    const handleInput = () => {
      assertIsDefined(textareaElem);
      assertIsDefined(clonedTextareaElem);

      clonedTextareaElem.value = textareaElem.value;
      textareaElem.rows = Math.min(
        Math.max(
          Math.ceil(
            clonedTextareaElem.scrollHeight / clonedTextareaElem.clientHeight,
          ),
          minRow,
        ),
        maxRow,
      );
    };

    textareaElem?.addEventListener("input", handleInput);

    return () => {
      textareaElem?.removeEventListener("input", handleInput);
    };
  }, [maxRow, minRow]);

  return (
    <div className={cx("container")}>
      <textarea
        className={cx("clone")}
        ref={clonedTextareaRef}
        rows={1}
        readOnly
      />
      <textarea
        placeholder="텍스트를 입력하고 버튼을 클릭하면 아래에 입력한 텍스트가 등장합니다."
        className={cx("textarea")}
        ref={textareaRef}
        rows={minRow}
      />
    </div>
  );
});

TextBox.displayName = "TextBox";

export function TextBox5R() {
  const textBoxRef = useRef<{ getValue: () => string }>(null);
  const [value, setValue] = useState("");

  const handleClickSubmit = () => {
    assertIsDefined(textBoxRef.current);

    const newValue = textBoxRef.current.getValue();
    setValue(newValue);
  };

  return (
    <>
      <h3>#5. React - 상위 컴포넌트에서 값 접근 (useImperativeHandle)</h3>
      <TextBox minRow={MIN_ROWS} maxRow={MAX_ROWS} ref={textBoxRef} />
      <button type="button" onClick={handleClickSubmit}>
        제출
      </button>
      <p>{value}</p>
    </>
  );
}
