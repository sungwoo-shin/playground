import { VanillaWrapper } from "../../vanillaWrapper";
import { vanillaScrollBox } from "./scrollBox";

const initiator = (wrapper: HTMLDivElement) => {
  const $scrollBox = vanillaScrollBox();
  wrapper.append($scrollBox);
};

export function ScrollBoxV() {
  return (
    <>
      <h3>#2. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />
    </>
  );
}
