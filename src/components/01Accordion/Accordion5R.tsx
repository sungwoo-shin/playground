import { cx } from "./cx";
import { data } from "./data";

type TProps = {
  id: string;
  title: string;
  description: string;
  initialChecked: boolean;
};

function AccordionItem({ id, title, description, initialChecked }: TProps) {
  return (
    <li className={cx("item", "item5")} key={id}>
      <input
        className={cx("input")}
        type="radio"
        name="accordion"
        id={id}
        defaultChecked={initialChecked}
      />
      <label htmlFor={id} className={cx("tab")}>
        {title}
      </label>
      <div className={cx("description")}>{description}</div>
    </li>
  );
}

export function Accordion5R() {
  return (
    <>
      <h3>#5. React - html input(radio)로 처리</h3>
      <ul className={cx("container")}>
        {data.map(({ description, id, title }, i) => (
          <AccordionItem
            key={id}
            initialChecked={i === 0}
            description={description}
            id={id}
            title={title}
          />
        ))}
      </ul>
    </>
  );
}
