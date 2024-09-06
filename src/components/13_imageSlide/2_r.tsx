/* eslint-disable react/button-has-type */
import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";

import cx from "./cx";
import data from "./data";

const LazyImage = dynamic(() => import("#/components/part1/lazyImage"), {
  ssr: false,
});

type Direction = "left" | "right";
const dataLength = data.length;

// eslint-disable-next-line @typescript-eslint/naming-convention
function ImageSlide1_React() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const animatingRef = useRef(false);

  const move = useCallback(
    (direction: Direction) => () => {
      if (animatingRef.current) {
        return;
      }

      setCurrentIndex((prev) => {
        const next =
          ((direction === "right" ? prev + 1 : prev - 1) + dataLength) %
          dataLength;
        animatingRef.current = true;

        return next;
      });
    },
    [],
  );

  const handleTransitionEnd = () => {
    animatingRef.current = false;
  };

  return (
    <>
      <h3>#2. React</h3>
      <div className={cx("imageSlide", "imageSlide2")} ref={wrapperRef}>
        <ul
          className={cx("container")}
          style={{ left: `${currentIndex * 600 * -1}px` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {data.map((url, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index} className={cx("item")}>
              <LazyImage
                src={url}
                width={600}
                height={320}
                rootElemRef={wrapperRef}
              />
              <span>#{index + 1}</span>
            </li>
          ))}
        </ul>
        <button className={cx("navButton", "navLeft")} onClick={move("left")} />
        <button
          className={cx("navButton", "navRight")}
          onClick={move("right")}
        />
      </div>
    </>
  );
}

export default ImageSlide1_React;
