import Accordion7 from "./7_r";
import Accordion8 from "./8_r";
import { Accordion1R } from "./Accordion1R";
import { Accordion2R } from "./Accordion2R";
import { Accordion3R } from "./Accordion3R";
import { Accordion4V } from "./Accordion4V";
import { Accordion5R } from "./Accordion5R";
import { Accordion6R } from "./Accordion6R";
import { cx } from "./cx";

export function Accordions() {
  return (
    <div className={cx("Accordions")}>
      <h1>Accordion</h1>
      <Accordion1R />
      <Accordion2R />
      <Accordion3R />
      <Accordion4V />
      <Accordion5R />
      <Accordion6R />
      <Accordion7 />
      <Accordion8 />
    </div>
  );
}
