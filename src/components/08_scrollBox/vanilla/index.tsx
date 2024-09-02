import VanillaWrapper from "../../vanillaWrapper";
import vanillaScrollBox from "./scrollBox";

const initiator = (wrapper: HTMLDivElement) => {
  const $scrollBox = vanillaScrollBox();
  wrapper.append($scrollBox);
};

// eslint-disable-next-line @typescript-eslint/naming-convention
function ScrollBox_Vanilla() {
  return <VanillaWrapper title="#2" initiator={initiator} />;
}

export default ScrollBox_Vanilla;
