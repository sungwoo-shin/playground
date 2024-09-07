import { VanillaWrapper } from "#/components/vanillaWrapper";
import cx from "../cx";
import data from "../data";
import lazyLoad from "./lazyLoad";

export const lazyImageBuilder = (
  src: string,
  width: number,
  height: number,
) => {
  const $elem = document.createElement("img");
  $elem.classList.add(cx("lazy"));
  $elem.setAttribute("width", `${width}px`);
  $elem.setAttribute("height", `${height}px`);
  const onLoad = () => {
    $elem.classList.remove(cx("lazy"));
  };
  $elem.addEventListener("load", onLoad);

  lazyLoad($elem, src);

  return $elem;
};

const initiator = (wrapper: HTMLDivElement) => {
  const $imgs = data.map((src) => lazyImageBuilder(src, 600, 320));
  wrapper.append(...$imgs);
};
// eslint-disable-next-line @typescript-eslint/naming-convention
function LazyLoad1_V() {
  return (
    <>
      <h2>지연로딩</h2>
      <h3>#2. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />
    </>
  );
}

export default LazyLoad1_V;
