import { generateDOM } from "#/utils/generateDOM";
import { lazyImageBuilder } from "../part1/vanillaLazyImage";
import { VanillaWrapper } from "../vanillaWrapper";
import cx from "./cx";
import data from "./data";

type Direction = "left" | "right";
const dataLength = data.length;

const initiator = (wrapper: HTMLDivElement) => {
  let currentIndex = 0;
  let isAnimating = false;

  const $ul = generateDOM("ul", cx("container"));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const $items = data.map((url, index) => {
    const $li = generateDOM("li", cx("item"));
    const $img = lazyImageBuilder(url, 600, 320);
    $li.append($img, generateDOM("span", undefined, `#${index + 1}`));
    $ul.append($li);

    return $li;
  });

  const handleTransitionEnd = () => {
    isAnimating = false;
  };
  $ul.addEventListener("transitionend", handleTransitionEnd);

  const move = (direction: Direction) => {
    if (isAnimating) {
      return;
    }

    const next =
      ((direction === "right" ? currentIndex + 1 : currentIndex - 1) +
        dataLength) %
      dataLength;

    $ul.style.left = `${-1 * next * 600}px`;
    isAnimating = true;
    currentIndex = next;
  };

  const $left = generateDOM("button", cx("navButton", "navLeft"));
  $left.addEventListener("click", () => move("left"));

  const $right = generateDOM("button", cx("navButton", "navRight"));
  $right.addEventListener("click", () => move("right"));

  $ul.style.left = "0px";
  wrapper.classList.add(cx("imageSlide"), cx("imageSlide1"));
  wrapper.append($ul, $left, $right);
};

// eslint-disable-next-line @typescript-eslint/naming-convention
function ImageSlide_Vanilla() {
  return (
    <>
      <h3>#1. Vanilla - ul 좌표 이동</h3>
      <VanillaWrapper initiator={initiator} />
    </>
  );
}

export default ImageSlide_Vanilla;
