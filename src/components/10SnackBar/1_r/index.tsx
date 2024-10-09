import cx from "../cx";
import data from "../data";
import { SnackbarContextProvider, useSnackbarActions } from "./snackbarContext";

function ListItem({
  id,
  name,
  index,
}: {
  id: string;
  name: string;
  index: number;
}) {
  const { createSnackbar } = useSnackbarActions();

  const handleClick = () => {
    createSnackbar(
      `snackbar_${id}`,
      <p>
        {index + 1}. {name} 스낵바 알림
      </p>,
    );
  };

  return (
    <span className={cx("listItem")} id={id}>
      #{index + 1}{" "}
      <button type="button" onClick={handleClick}>
        스낵바 띄우기
      </button>
    </span>
  );
}

export function Snackbar1R() {
  return (
    <SnackbarContextProvider>
      <h2>스낵바</h2>
      <h3>#1. React - context</h3>
      {data.map(({ id, name }, index) => (
        <ListItem key={id} id={id} name={name} index={index} />
      ))}
    </SnackbarContextProvider>
  );
}
