import TabMenu4V from "./4_v";
import TabMenu5 from "./5_r";
import TabMenu6 from "./6_r";
import { cx } from "./cx";
import { TabMenu1R } from "./TabMenu1R";
import { TabMenu2R } from "./TabMenu2R";
import { TabMenu3R } from "./TabMenu3R";

export function TabMenu() {
  return (
    <div className={cx("TabMenus")}>
      <h2>탭메뉴</h2>
      <TabMenu1R />
      <TabMenu2R />
      <TabMenu3R />
      <TabMenu4V />
      <TabMenu5 />
      <TabMenu6 />
    </div>
  );
}
