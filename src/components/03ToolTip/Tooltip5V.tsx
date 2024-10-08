import { VanillaWrapper } from "../vanillaWrapper";
import { cx } from "./cx";
import { data } from "./data";

const initiator = (wrapper: HTMLDivElement) => {
  const $tooltips = data.map(({ id, title, description }) => {
    const $details = document.createElement("details");
    $details.classList.add(cx("details"));
    $details.setAttribute("data-tooltip", id);

    const $summary = document.createElement("summary");
    $summary.classList.add(cx("summary"));
    $summary.setAttribute("data-tooltip-summary", "true");
    $summary.textContent = title;

    const $tooltip = document.createElement("div");
    $tooltip.classList.add(cx("tooltip"));
    $tooltip.textContent = description;

    $details.append($summary, $tooltip);

    return $details;
  });

  const closeAllTooltip = (event: Event) => {
    const target = event.target as HTMLElement;
    document.querySelectorAll("[data-tooltip]").forEach((elem) => {
      if (elem !== target.parentElement) {
        elem.removeAttribute("open");
      }
    });
  };
  window.addEventListener("click", closeAllTooltip);

  wrapper.append(...$tooltips);
};

export function Tooltip5V() {
  return (
    <>
      <h3>#5. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />;
    </>
  );
}
