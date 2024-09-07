import Tooltip5V from "./5_v";
import { cx } from "./cx";
import { Tooltip1R } from "./Tooltip1R";
import { Tooltip2R } from "./Tooltip2R";
import { Tooltip3R } from "./Tooltip3R";
import { Tooltip4R } from "./Tooltip4R";

export function Tooltip() {
  return (
    <div className={cx("Tooltips")} style={{ marginBottom: 500 }}>
      <h2>툴팁</h2>
      <Tooltip1R />
      <Tooltip2R />
      <Tooltip3R />
      <Tooltip4R />
      <Tooltip5V />
    </div>
  );
}
