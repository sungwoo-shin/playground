import Tooltip2 from "./2_r";
import Tooltip3 from "./3_r";
import Tooltip4 from "./4_r";
import Tooltip5V from "./5_v";
import { cx } from "./cx";
import { Tooltip1R } from "./Tooltip1R";

export function Tooltip() {
  return (
    <div className={cx("Tooltips")} style={{ marginBottom: 500 }}>
      <h2>툴팁</h2>
      <Tooltip1R />
      <Tooltip2 />
      <Tooltip3 />
      <Tooltip4 />
      <Tooltip5V />
    </div>
  );
}
