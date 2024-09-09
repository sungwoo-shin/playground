import { measureRows } from "#/utils/measureRows";
import { cx } from "./cx";

const MIN_ROWS = 3;
const MAX_ROWS = 15;

export function TextBox2R() {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const eventTarget = event.target;

    const newRows = Math.min(
      Math.max(measureRows(eventTarget, eventTarget.value), MIN_ROWS),
      MAX_ROWS,
    );
    eventTarget.rows = newRows;
  };

  return (
    <>
      <h3>#2. React - uncontrolled. canvas</h3>
      <div className={cx("container")}>
        <textarea className={cx("textarea")} rows={3} onInput={handleChange} />
      </div>
    </>
  );
}
