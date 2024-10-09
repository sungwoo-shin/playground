import { assertIsDefined } from "#/utils/assetIsDefined";
import { generateDOM } from "#/utils/generateDOM";
import cx from "../cx";

const SNACKBAR_DURATION_MS = 3000;

const buildCX = (classnames: string) => classnames.split(" ").map((c) => cx(c));

export const initSnackbar = (children: HTMLElement) => {
  let timeoutId: number | null = null;

  const $snackbar = generateDOM("div", cx("SnackbarItem"));
  $snackbar.append(children);

  const toggleSnackbarClass = ({
    add,
    remove,
  }: {
    add?: string;
    remove?: string;
  }) => {
    if (add) {
      $snackbar.classList.add(...buildCX(add));
    }
    if (remove) {
      $snackbar.classList.remove(...buildCX(remove));
    }
  };

  const handleAnimationEnd = () => {
    if ($snackbar.className.includes("enter")) {
      toggleSnackbarClass({ add: "show", remove: "enter" });
    } else {
      toggleSnackbarClass({ remove: "show exit" });
      $snackbar.remove();
    }
  };

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const handleMouseLeave = () => {
    timeoutId = window.setTimeout(() => {
      toggleSnackbarClass({ add: "exit" });
    }, SNACKBAR_DURATION_MS);
  };

  $snackbar.addEventListener("animationend", handleAnimationEnd);
  $snackbar.addEventListener("mouseenter", handleMouseEnter);
  $snackbar.addEventListener("mouseleave", handleMouseLeave);

  const openSnackbar = () => {
    toggleSnackbarClass({ add: "enter" });
    const $root = document.querySelector("#snackbarRoot");
    assertIsDefined($root);
    $root.append($snackbar);

    timeoutId = window.setTimeout(() => {
      toggleSnackbarClass({ add: "exit" });
    }, SNACKBAR_DURATION_MS);
  };

  return openSnackbar;
};
