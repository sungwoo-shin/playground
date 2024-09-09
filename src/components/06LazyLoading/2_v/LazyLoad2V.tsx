import { VanillaWrapper } from "#/components/vanillaWrapper";
import { cx } from "../cx";
import { data } from "../data";

const lazyLoad = ($img: HTMLImageElement, src: string) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.setAttribute("src", src);
          observer.disconnect();
        }
      });
    },
    {
      threshold: 0,
    },
  );
  observer.observe($img);
};

export const buildLazyImg = (src: string, width: number, height: number) => {
  const $img = document.createElement("img");
  $img.classList.add(cx("lazy"));
  $img.setAttribute("width", `${width}px`);
  $img.setAttribute("height", `${height}px`);

  const handleLoad = () => {
    $img.classList.remove(cx("lazy"));
  };
  $img.addEventListener("load", handleLoad);

  lazyLoad($img, src);

  return $img;
};

const initiator = (wrapper: HTMLDivElement) => {
  const $imgs = data.map((src) => buildLazyImg(src, 600, 320));

  wrapper.append(...$imgs);
};

export function LazyLoad2V() {
  return (
    <>
      <h3>#2. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />
    </>
  );
}
