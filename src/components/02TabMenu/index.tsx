import { cx } from "./cx";
import { TabMenu1R } from "./TabMenu1R";
import { TabMenu2R } from "./TabMenu2R";
import { TabMenu3R } from "./TabMenu3R";
import { TabMenu4V } from "./TabMenu4V";
import { TabMenu5R } from "./TabMenu5R";
import { TabMenu6R } from "./TabMenu6R";

export function TabMenu() {
  return (
    <div className={cx("TabMenus")}>
      <h2>탭메뉴</h2>
      <TabMenu1R />
      <TabMenu2R />
      <TabMenu3R />
      <TabMenu4V />
      <TabMenu5R />
      <TabMenu6R />
    </div>
  );
}
