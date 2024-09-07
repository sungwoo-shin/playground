import { cx } from "./cx";
import { data } from "./data";

type TProps = {
  id: string;
  title: string;
  description: string;
  initialChecked: boolean;
};

function TabItem({ id, title, description, initialChecked }: TProps) {
  return (
    <li className={cx("item")} key={id}>
      <input
        type="radio"
        className={cx("input")}
        name="tabmenu"
        id={id}
        defaultChecked={initialChecked}
      />
      <label className={cx("tab")} htmlFor={id}>
        {title}
      </label>
      <div className={cx("description")}>{description}</div>
    </li>
  );
}

export function TabMenu5R() {
  return (
    <>
      <h3>#5. React - html input(radio)로 처리</h3>
      <ul className={cx("container", "tabMenu5")}>
        {data.map(({ description, id, title }, i) => (
          <TabItem
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
