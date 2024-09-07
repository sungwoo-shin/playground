import Accordion4V from "./4_v";
import Accordion5 from "./5_r";
import Accordion6 from "./6_r";
import Accordion7 from "./7_r";
import Accordion8 from "./8_r";
import { Accordion1R } from "./Accordion1R";
import { Accordion2R } from "./Accordion2R";
import { Accordion3R } from "./Accordion3R";
import cx from "./cx";

function Accordions() {
  return (
    <div className={cx("Accordions")}>
      <h1>Accordion</h1>
      <Accordion1R />
      <Accordion2R />
      <Accordion3R />
      <Accordion4V />
      <Accordion5 />
      <Accordion6 />
      <Accordion7 />
      <Accordion8 />
    </div>
  );
}

export default Accordions;
