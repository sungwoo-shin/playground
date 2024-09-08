import { measureRows } from "#/utils/measureLines";
import { VanillaWrapper } from "../vanillaWrapper";
import { cx } from "./cx";

const MIN_ROWS = 3;
const MAX_ROWS = 15;

const initiator = (wrapper: HTMLDivElement) => {
  const $textarea = document.createElement("textarea");
  $textarea.classList.add(cx("textarea"));
  $textarea.rows = MIN_ROWS;

  const handleInput = () => {
    const newRows = Math.min(
      Math.max(measureRows($textarea, $textarea.value), MIN_ROWS),
      MAX_ROWS,
    );
    $textarea.rows = newRows;
  };
  $textarea.addEventListener("input", handleInput);

  const $container = document.createElement("div");
  $container.classList.add(cx("container"));
  $container.append($textarea);

  wrapper.append($container);
};

export function TextBox4V() {
  return (
    <>
      <h3>#4. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />
    </>
  );
}
