import cx from "./cx";
import { ScrollBoxR } from "./react";
import { ScrollBoxV } from "./vanilla";

export function ScrollBox() {
  return (
    <div className={cx("ScrollBoxPage")} style={{ marginBottom: 100 }}>
      <h2>스크롤박스</h2>
      <ScrollBoxR />
      <ScrollBoxV />
    </div>
  );
}
