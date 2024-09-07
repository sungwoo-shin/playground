import { VanillaWrapper } from "../../vanillaWrapper";
import vanillaScrollBox from "./scrollBox";

const initiator = (wrapper: HTMLDivElement) => {
  const $scrollBox = vanillaScrollBox();
  wrapper.append($scrollBox);
};

// eslint-disable-next-line @typescript-eslint/naming-convention
function ScrollBox_Vanilla() {
  return (
    <>
      <h3>#2. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />
    </>
  );
}

export default ScrollBox_Vanilla;
