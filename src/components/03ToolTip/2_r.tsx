/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import { SyntheticEvent, useEffect } from "react";

import SingleOpenContextProvider, {
  useSingleOpen,
} from "../../contexts/singleOpenContext";
import { cx } from "./cx";
import { data } from "./data";

function Tooltip({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) {
  const [isOpen, toggle] = useSingleOpen(id);

  const handleClick = (e: SyntheticEvent) => {
    e.stopPropagation();
    toggle((p) => (p === id ? null : id));
  };

  useEffect(() => {
    const close = () => toggle(null);
    if (isOpen) {
      window.addEventListener("click", close, { once: true });
    }

    return () => {
      window.removeEventListener("click", close);
    };
  }, [isOpen, toggle]);

  return (
    <div className={cx("container")}>
      <button className={cx("trigger")} onClick={handleClick}>
        {title}
      </button>
      {isOpen && (
        <div className={cx("tooltip")} onClick={(e) => e.stopPropagation()}>
          {description}
        </div>
      )}
    </div>
  );
}

function Tooltip2() {
  return (
    <>
      <h3>
        #2. React<sub>하나만 열리도록</sub>
      </h3>
      <SingleOpenContextProvider>
        {data.map((d) => (
          <Tooltip {...d} key={d.id} />
        ))}
      </SingleOpenContextProvider>
    </>
  );
}

export default Tooltip2;
