import VanillaWrapper from "#/components/vanillaWrapper";
import { generateDOM, stringToDOM } from "#/utils/util";
import cx from "../cx";
import data from "../data";
import initSnackbar from "./snackar";

const initiator = (wrapper: HTMLDivElement) => {
  const $items = data.map(({ name }, index) => {
    const $snackbarContent = generateDOM(
      "p",
      undefined,
      `${index + 1}. ${name} 스낵바 알림 `,
    );
    const openSnackbar = initSnackbar($snackbarContent);
    const $button = generateDOM("button", undefined, "스낵바 띄우기");
    $button.addEventListener("click", openSnackbar);

    const $item = generateDOM("span", cx("listItem"), `#${index + 1} `);
    $item.append($button);

    return $item;
  });
  wrapper.append(
    ...$items,
    stringToDOM(`<div id="snackbarRoot" class="${cx("Snackbars")}"></div>`),
  );
};

function SnackbarV() {
  return (
    <>
      <h2>스낵바</h2>
      <VanillaWrapper title="#3" initiator={initiator} />
    </>
  );
}

export default SnackbarV;
