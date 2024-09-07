/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
import { SyntheticEvent, useCallback, useMemo, useState } from "react";

import cx from "./cx";

type Direction = "left" | "right";

function Carousel3() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageCount, setCount] = useState(9);

  const { images, theta, radius } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const images = Array.from({ length: imageCount }, (_, i) => i + 1);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const theta = 360 / imageCount;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const radius = Math.round(150 / Math.tan(Math.PI / imageCount));

    return {
      images,
      theta,
      radius,
    };
  }, [imageCount]);

  const move = useCallback(
    (direction: Direction) => {
      const nextIndex =
        direction === "right" ? currentIndex + 1 : currentIndex - 1;
      setCurrentIndex(nextIndex);
    },
    [currentIndex],
  );
  const handleChangeCount = (e: SyntheticEvent) => {
    const val = (e.target as HTMLInputElement).value;
    setCount(+val);
    setCurrentIndex(0);
  };

  return (
    <>
      <h3>
        #3. React<sub>3D</sub>
      </h3>
      <div className={cx("carousel", "carousel2")}>
        <ul
          className={cx("container")}
          style={{
            transform: `translateZ(${-1 * radius}px) rotateY(${-1 * theta * currentIndex}deg)`,
          }}
        >
          {images.map((num, index) => (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={cx("item", {
                current: index === currentIndex,
              })}
              style={{
                transform: `rotateY(${theta * index}deg) translateZ(${radius}px)`,
              }}
            >
              <span>#{index + 1}</span>
            </li>
          ))}
        </ul>
        <button
          className={cx("navButton", "navLeft")}
          onClick={() => move("left")}
        />
        <button
          className={cx("navButton", "navRight")}
          onClick={() => move("right")}
        />
      </div>
      <label>
        <input
          type="range"
          min="3"
          max="30"
          value={imageCount}
          onChange={handleChangeCount}
        />{" "}
        {imageCount}
      </label>
    </>
  );
}

export default Carousel3;
