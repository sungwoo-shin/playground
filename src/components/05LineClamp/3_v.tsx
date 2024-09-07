import { VanillaWrapper } from "../vanillaWrapper";
import cx from "./cx";
import data from "./data";

const clampedElemBuilder = (
  text: string,
  lines: number,
  wrapper: HTMLDivElement,
) => {
  let isClamped = true;

  const toggleClamped = (e: Event | null, force?: boolean) => {
    isClamped = typeof force === "boolean" ? force : !isClamped;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    $content.classList.toggle(cx("clamped"), isClamped);
    if (isClamped) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      $content.append($btn);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      $btn.remove();
    }
  };

  const $clone = document.createElement("div");
  $clone.classList.add(cx("text-clone"));
  $clone.textContent = text;

  const $text = document.createElement("div");
  $text.classList.add(cx("text"));
  $text.textContent = text;
  $text.style.webkitLineClamp = `${lines}`;

  const $btn = document.createElement("button");
  $btn.classList.add(cx("buttonMore"));
  $btn.addEventListener("click", toggleClamped, { once: true });

  const $content = document.createElement("div");
  $content.classList.add(cx("content"));
  $content.append($clone, $text);

  const handleMutate = () => {
    // eslint-disable-next-line radix
    const lineHeight = parseInt(getComputedStyle($text).lineHeight);
    const measuredLines = Math.floor($clone.offsetHeight / lineHeight);
    toggleClamped(null, measuredLines > lines);
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
  const $elems = data.map((text, i) =>
    clampedElemBuilder(text, 5 - i, wrapper),
  );
  wrapper.append(...$elems);
};

// eslint-disable-next-line @typescript-eslint/naming-convention
function LineClamp3_V() {
  return (
    <>
      <h3>#3. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />
    </>
  );
}
export default LineClamp3_V;
