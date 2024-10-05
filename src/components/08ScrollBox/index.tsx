/* eslint-disable react/jsx-pascal-case */
import cx from "./cx";
import { ScrollBoxR } from "./react";
import ScrollBox_Vanilla from "./vanilla";

function ScrollBox() {
  return (
    <div className={cx("ScrollBoxPage")} style={{ marginBottom: 100 }}>
      <h2>스크롤박스</h2>
      <ScrollBoxR />
      <ScrollBox_Vanilla />
    </div>
  );
}

export default ScrollBox;
