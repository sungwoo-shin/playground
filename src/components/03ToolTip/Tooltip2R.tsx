import { useEffect } from "react";

import {
  SingleOpenContextProvider,
  useSingleOpen,
} from "../../contexts/singleOpenContext";
import { cx } from "./cx";
import { data } from "./data";

type TProps = {
  id: string;
  title: string;
  description: string;
};

function Tooltip({ id, title, description }: TProps) {
  const [isOpen, setIsOpen] = useSingleOpen(id);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    setIsOpen((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClose = () => setIsOpen(null);

    if (isOpen) {
      window.addEventListener("click", handleClose, { once: true });
    }

    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className={cx("container")}>
      <button type="button" className={cx("trigger")} onClick={handleClick}>
        {title}
      </button>
      {isOpen && (
        <div
          className={cx("tooltip")}
          onClick={(event) => event.stopPropagation()}
        >
          {description}
        </div>
      )}
    </div>
  );
}

export function Tooltip2R() {
  return (
    <>
      <h3>#2. React - 하나만 열리도록</h3>
      <SingleOpenContextProvider>
        {data.map((d) => (
          <Tooltip {...d} key={d.id} />
        ))}
      </SingleOpenContextProvider>
    </>
  );
}
