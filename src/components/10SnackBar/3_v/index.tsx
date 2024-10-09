import { VanillaWrapper } from "#/components/vanillaWrapper";
import { generateDOM } from "#/utils/generateDOM";
import { stringToDOM } from "#/utils/stringToDOM";
import cx from "../cx";
import data from "../data";
import { initSnackbar } from "./snackar";

const initiator = (wrapper: HTMLDivElement) => {
  const $button = generateDOM("button", undefined, "스낵바 띄우기");

  const $items = data.map(({ name }, i) => {
    const $snackbarContent = generateDOM(
      "p",
      undefined,
      `${i + 1}. ${name} 스낵바 알림 `,
    );

    const openSnackbar = initSnackbar($snackbarContent);
    $button.addEventListener("click", openSnackbar);

    const $item = generateDOM("span", cx("listItem"), `#${i + 1} `);
    $item.append($button);

    return $item;
  });

  wrapper.append(
    ...$items,
    stringToDOM(`<div id="snackbarRoot" class="${cx("Snackbars")}"></div>`),
  );
};

export function Snackbar3V() {
  return (
    <>
      <h2>스낵바</h2>
      <h3>#3. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />
    </>
  );
}
