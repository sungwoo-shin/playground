import { useRef } from "react";

import { LazyImage } from "#/components/06_lazyLoading/1_r";
import data from "../data";
import ScrollBox from "./scrollBox";

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

// eslint-disable-next-line @typescript-eslint/naming-convention
function ScrollBox_React() {
  const ref = useRef();

  return (
    <>
      <h3>#1. React</h3>
      <ScrollBox list={data} Item={Item} ref={ref} />
    </>
  );
}
export default ScrollBox_React;
