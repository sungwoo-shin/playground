import { VanillaWrapper } from "../vanillaWrapper";
import { cx } from "./cx";
import { data } from "./data";

const buildItem = (id: string, title: string, description: string) => {
  const $li = document.createElement("li");
  $li.classList.add(cx("item"), cx("item3"));
  $li.setAttribute("data-id", id);

  const $tab = document.createElement("div");
  $tab.classList.add(cx("tab"));
  $tab.textContent = title;

  const $description = document.createElement("div");
  $description.classList.add(cx("description"));
  $description.textContent = description;

  $li.append($tab, $description);

  return $li;
};

const initiator = (wrapper: HTMLDivElement) => {
  let openId: string | null = null;

  const $ul = document.createElement("ul");
  $ul.classList.add(cx("container"));

  const $items = data.map(({ description, id, title }) =>
    buildItem(id, title, description),
  );
  $ul.append(...$items);

  const handleTabClick = (event: Event) => {
    const $target = event.target as HTMLElement;
    if (!$target.classList.contains(cx("tab"))) {
      return;
    }

    const itemId = $target.parentElement!.dataset.id;
    if (!itemId) {
      return;
    }

    openId = itemId === openId ? null : itemId;

    $items.forEach(($item) => {
      $item.classList.toggle(cx("current"), openId === $item.dataset.id);
    });
  };
  $ul.addEventListener("click", handleTabClick);

  ($items[0].children[0] as HTMLElement).click();
  wrapper.append($ul);
};

export function Accordion4V() {
  return (
    <>
      <h3>#4. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />;
    </>
  );
}
