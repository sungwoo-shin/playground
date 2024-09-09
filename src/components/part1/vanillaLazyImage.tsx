import classNames from "classnames/bind";

import { vanillaIntersectionObserver } from "#/hooks/vanilla/intersectionObserver";
import style from "./lazyImage.module.scss";

const cx = classNames.bind(style);

export const lazyLoad = ($elem: HTMLImageElement, src: string) => {
  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.setAttribute("src", src);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        observer?.disconnect();
      }
    });
  };

  const observer = vanillaIntersectionObserver(
    $elem,
    { threshold: 0 },
    handleIntersect,
  );
};

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
