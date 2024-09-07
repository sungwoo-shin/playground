import { useEffect, useState } from "react";

import { cx } from "./cx";
import { data } from "./data";

type TProps = {
  title: string;
  description: string;
};

function Tooltip({ title, description }: TProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    // !
    event.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClose = () => setIsOpen(false);

    if (isOpen) {
      window.addEventListener("click", handleClose);
    }

    return () => {
      window.removeEventListener("click", handleClose);
    };
  }, [isOpen]);

  return (
    <div className={cx("container")}>
      <button type="button" className={cx("trigger")} onClick={handleOpen}>
        {title}
      </button>
      {isOpen && (
        <div
          className={cx("tooltip")}
          // !
          onClick={(event) => event.stopPropagation()}
        >
          {description}
        </div>
      )}
    </div>
  );
}

export function Tooltip1R() {
  return (
    <>
      <h3>#1. React - 외부 클릭시 닫히도록 처리</h3>
      {data.map(({ description, id, title }) => (
        <Tooltip key={id} description={description} title={title} />
      ))}
    </>
  );
}
