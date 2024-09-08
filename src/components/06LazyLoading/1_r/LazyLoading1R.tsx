import { useEffect, useRef, useState } from "react";

import { useIntersectionObserver } from "#/hooks/useIntersectionObserver";
import { assertIsDefined } from "#/utils/assetIsDefined";
import { cx } from "../cx";
import { data } from "../data";

const ioOptions = {
  threshold: 0,
};

type TProps = { src: string; width: number; height: number };

export function LazyImage({ src, width, height }: TProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { ioEntries, ioRef } = useIntersectionObserver(imgRef, ioOptions);

  useEffect(() => {
    assertIsDefined(imgRef.current);
    assertIsDefined(ioRef.current);

    if ("loading" in HTMLImageElement.prototype) {
      imgRef.current.setAttribute("src", src);
      imgRef.current.setAttribute("loading", "lazy");
      ioRef.current.disconnect();

      return;
    }

    const isVisible = ioEntries.at(0)?.isIntersecting;
    if (isVisible) {
      imgRef.current.setAttribute("src", src);
      ioRef.current.disconnect();
    }
  }, [ioEntries, ioRef, src]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      className={cx({ lazy: !isLoaded })}
      width={width}
      height={height}
      onLoad={() => setIsLoaded(true)}
      alt=""
    />
  );
}

export function LazyLoading1R() {
  return (
    <>
      <h3>#1. React</h3>
      {data.map((url, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <LazyImage src={url} key={index} width={600} height={320} />
      ))}
    </>
  );
}
