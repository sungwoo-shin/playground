import { VanillaWrapper } from "../vanillaWrapper";
import { cx } from "./cx";
import { data } from "./data";

const buildTabMenus = (id: string, title: string) => {
  const $li = document.createElement("li");
  $li.classList.add(cx("tab"));
  $li.textContent = title;
  $li.setAttribute("data-id", id);

  return $li;
};

const buildDescriptions = (description: string) => {
  const $div = document.createElement("div");
  $div.classList.add(cx("description"));
  $div.textContent = description;

  return $div;
};

const initiator = (wrapper: HTMLDivElement) => {
  const $container = document.createElement("div");
  $container.classList.add(cx("container"), cx("tabMenu2"));

  const $tabUl = document.createElement("ul");
  $tabUl.classList.add(cx("tabList"));

  const $tabMenus = data.map(({ id, title }) => buildTabMenus(id, title));
  const $descriptions = data.map(({ description }) =>
    buildDescriptions(description),
  );

  $tabUl.append(...$tabMenus);
  $container.append($tabUl, ...$descriptions);

  let currentId: string = data[0].id;

  const handleTabMenuClick = (event: Event) => {
    const $target = event.target as HTMLElement;
    if (!$target.classList.contains(cx("tab"))) {
      return;
    }

    currentId = $target.dataset.id!;
    $tabMenus.forEach(($tabMenu, i) => {
      $tabMenu.classList.toggle(
        cx("current"),
        currentId === $tabMenu.dataset.id,
      );
      $descriptions[i].classList.toggle(
        cx("current"),
        currentId === $tabMenu.dataset.id,
      );
    });
  };
  $tabUl.addEventListener("click", handleTabMenuClick);
  $tabMenus[3].click();

  wrapper.append($container);
};

export function TabMenu4V() {
  return (
    <>
      <h3>#4. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />;
    </>
  );
}
