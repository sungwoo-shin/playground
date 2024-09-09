import { cx } from "../cx";
import { Datum } from "./useInfiniteFetcher";
import useInfiniteScroll from "./useInfiniteScroll";

function ListItem({ number, title, description }: Datum & { number: number }) {
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
  const { data, state, moreRef } = useInfiniteScroll();

  return (
    <>
      <h2>무한스크롤</h2>
      <h3>#1. React</h3>
      <ul>
        {data.map((page, i) =>
          page.map((item, j) => (
            // eslint-disable-next-line react/no-array-index-key
            <ListItem {...item} number={i * 20 + j + 1} key={`${i}_${j}`} />
          )),
        )}
      </ul>
      <div id="fetchMore" ref={moreRef} />
      {state === "loading" && <div className={cx("spinner")} />}
    </>
  );
}
