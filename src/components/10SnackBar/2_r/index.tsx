import cx from "../cx";
import data from "../data";
import { useSnackbar } from "./useSnackbar";

function ListItem({
  id,
  name,
  index,
}: {
  id: string;
  name: string;
  index: number;
}) {
  const { snackbarPortal: SnackbarPortal, open } = useSnackbar(
    <p>
      {index + 1}. {name} 스낵바 알림
    </p>,
  );

  return (
    <span className={cx("listItem")} id={id}>
      #{index + 1}{" "}
      <button type="button" onClick={open}>
        스낵바 띄우기
      </button>
      {SnackbarPortal}
    </span>
  );
}

export function Snackbar2R() {
  return (
    <>
      <h2>스낵바</h2>
      <h3>#2. React - createPortal</h3>
      {data.map((item, index) => (
        <ListItem {...item} key={item.id} index={index} />
      ))}
      <div id="snackbarRoot" className={cx("Snackbars")} />
    </>
  );
}
