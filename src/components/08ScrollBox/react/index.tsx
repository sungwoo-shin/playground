import { useRef } from "react";

import { LazyImage } from "#/components/06LazyLoading/1_r/LazyLoading1R";
import data from "../data";
import { ForwardedScrollBox } from "./scrollBox";

export function Item({
  description,
  imgUrl,
}: {
  description: string;
  imgUrl: string;
}) {
  return (
    <div>
      <LazyImage src={imgUrl} width={250} height={400} />
      <span>{description}</span>
    </div>
  );
}

export function ScrollBoxR() {
  const ref = useRef();

  return (
    <>
      <h3>#1. React</h3>
      <ForwardedScrollBox list={data} Item={Item} ref={ref} />
    </>
  );
}
