import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { cx } from "../cx";

type TProps = {
  title: string;
  description: string;
  number: number;
};

function ListItem({ number, title, description }: TProps) {
  return (
    <li>
      <p>
        <strong>
          {number}. {title}
        </strong>
      </p>
      <div>{description}</div>
    </li>
  );
}

export function InfiniteScroll1R() {
  const { data, state, sensorRef } = useInfiniteScroll();

  return (
    <>
      <h2>무한스크롤</h2>
      <h3>#1. React</h3>
      <ul>
        {data.map((page, i) =>
          page.map(({ description, id, title }, j) => (
            <ListItem
              key={id}
              description={description}
              title={title}
              number={i * 20 + j + 1}
            />
          )),
        )}
      </ul>
      <div id="fetchMore" ref={sensorRef} />
      {state === "loading" && <div className={cx("spinner")} />}
    </>
  );
}
