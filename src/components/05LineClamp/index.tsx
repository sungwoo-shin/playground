/* eslint-disable react/jsx-pascal-case */
import { cx } from "./cx";
import { LineClamp1R } from "./LineClamp1R";
import { LineClamp2R } from "./LineClamp2R";
import { LineClamp3V } from "./LineClamp3V";

export function LineClamp() {
  return (
    <div className={cx("LineClamps")}>
      <h2>여러줄 말줄임</h2>
      <LineClamp1R />
      <LineClamp2R />
      <LineClamp3V />
    </div>
  );
}
