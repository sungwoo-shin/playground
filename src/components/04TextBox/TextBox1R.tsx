import { useState } from "react";

import { measureRows } from "#/utils/measureRows";
import { cx } from "./cx";

const MIN_ROWS = 3;
const MAX_ROWS = 15;

export function TextBox1R() {
  const [value, setValue] = useState("");
  const [rows, setRows] = useState(MIN_ROWS);

  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(target.value);
    const newRows = Math.min(
      Math.max(measureRows(target, target.value), MIN_ROWS),
      MAX_ROWS,
    );
    setRows(newRows);
  };

  return (
    <>
      <h3>#1. React - controlled. canvas</h3>
      <div className={cx("container")}>
        <textarea
          className={cx("textarea")}
          onChange={handleChange}
          rows={rows}
          value={value}
        />
      </div>
    </>
  );
}
