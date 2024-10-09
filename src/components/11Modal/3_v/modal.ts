import { stringToDOM } from "#/utils/stringToDOM";
import { cx } from "../cx";

type TModalFooterButton = {
  text: string;
  type?: "submit" | "button";
  formId?: string;
  disabled?: boolean;
  hideOnClick?: boolean;
  onClick?: (e: Event) => void;
};

type TModalProps = {
  id: string;
  title?: string;
  modalClassName?: string;
  contentClassName?: string;
  headerChildren?: Element[] | [string];
  contentChildren?: Element[] | [string];
  footerChildren?: Element[] | [string];
  footerButtonProps?: TModalFooterButton[];
};

export class Modal {
  #elem: Element;

  constructor({
    id,
    title = "",
    modalClassName = "",
    contentClassName = "",
    footerButtonProps = [],
    headerChildren = [],
    contentChildren = [],
    footerChildren = [],
  }: TModalProps) {
    const $header = stringToDOM(`
      <div class="${cx("ModalHeader")}">
        <div class="${cx("title")}">${title}</div>
      </div>
    `);
    if (headerChildren) {
      $header.append(...headerChildren);
    }

    const $content = stringToDOM(`
      <div class="${cx("ModalContent", contentClassName)}"></div>
    `);
    if (contentChildren) {
      $content.append(...contentChildren);
    }

    const $footer = stringToDOM(`
      <div class="${cx("ModalFooter")}"></div>
    `);
    const footerButtons = footerButtonProps.map(
      ({ text, type = "button", formId, hideOnClick, onClick }) => {
        const $btn = stringToDOM(
          `<button type="${type}" form="${formId}">${text}</button>`,
        );
        const handleClick = (event: Event) => {
          onClick?.(event);
          if (hideOnClick) {
            this.hide();
          }
        };
        $btn.addEventListener("click", handleClick);

        return $btn;
      },
    );
    $footer.append(...footerButtons);
    if (footerChildren) {
      $footer.append(...footerChildren);
    }

    const $inner = stringToDOM(`<div class="${cx("inner")}"></div>`);
    $inner.append($header, $content, $footer);

    const $modal = stringToDOM(
      `<div class="${cx("Modal", modalClassName)}" id="${id}"></div>`,
    );
    $modal.append($inner);

    this.#elem = $modal;
    document.getElementById("modalRoot")!.append($modal);
  }

  hide() {
    this.#elem.remove();
  }
}
