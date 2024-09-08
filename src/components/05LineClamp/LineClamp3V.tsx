import { VanillaWrapper } from "../vanillaWrapper";
import { cx } from "./cx";
import { data } from "./data";

const buildClampedText = (
  text: string,
  rows: number,
  wrapper: HTMLDivElement,
) => {
  let isClamped = true;

  const $clonedText = document.createElement("div");
  $clonedText.classList.add(cx("text-clone"));
  $clonedText.textContent = text;

  const $text = document.createElement("div");
  $text.classList.add(cx("text"));
  $text.textContent = text;
  $text.style.webkitLineClamp = `${rows}`;

  const $content = document.createElement("div");
  $content.classList.add(cx("content"));
  $content.append($clonedText, $text);

  const $button = document.createElement("button");
  $button.classList.add(cx("buttonMore"));

  const handleClampedToggle = (_: Event | null, force?: boolean) => {
    isClamped = typeof force === "boolean" ? force : !isClamped;

    $content.classList.toggle(cx("clamped"), isClamped);

    if (isClamped) {
      $content.append($button);
    } else {
      $button.remove();
    }
  };
  $button.addEventListener("click", handleClampedToggle, { once: true });

  const handleMutate = () => {
    const parsedLineHeight = parseInt(getComputedStyle($text).lineHeight, 10);
    const measuredLines = Math.floor(
      $clonedText.offsetHeight / parsedLineHeight,
    );
    handleClampedToggle(null, measuredLines > rows);
  };

  const observer = new MutationObserver(() => {
    if (wrapper.contains($content)) {
      handleMutate();
      observer.disconnect();
    }
  });
  observer.observe(wrapper, {
    childList: true,
    subtree: true,
  });

  return $content;
};

const initiator = (wrapper: HTMLDivElement) => {
  const $clampedTexts = data.map((text, i) =>
    buildClampedText(text, 5 - i, wrapper),
  );

  wrapper.append(...$clampedTexts);
};

export function LineClamp3V() {
  return (
    <>
      <h3>#3. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />
    </>
  );
}
