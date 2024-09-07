import { createContext, useContext, useSyncExternalStore } from "react";

import { getContextError } from "#/utils/getContextError";

type TViewportRect = DOMRect & {
  scrollHeight: number;
};

/**
 * 리렌더링 사이에 다른 subscribe 함수를 전달하면 React가 store를 다시 구독합니다.
 * 이로 인해 성능 문제가 발생하고 store 재구독을 피하고 싶다면 subscribe 함수를 외부로 이동하세요.
 */
const subscribe = (callback: () => void) => {
  const resizeObserver = new ResizeObserver(callback);
  resizeObserver.observe(document.body);
  window.addEventListener("scroll", callback);

  return () => {
    resizeObserver.disconnect();
    window.removeEventListener("scroll", callback);
  };
};

const viewportRectKeys: (keyof TViewportRect)[] = [
  "scrollHeight",
  "bottom",
  "height",
  "left",
  "right",
  "top",
  "width",
  "x",
  "y",
];

const isSameRect = (prev: TViewportRect, next: TViewportRect) =>
  viewportRectKeys.every((k) => prev?.[k] === next?.[k]);

const getViewportRectSnapshot = () => {
  /**
   * store 데이터가 변경 가능한 경우 getSnapshot 함수는 해당 데이터의 변경 불가능한 스냅샷을 반환해야 합니다.
   * 즉 새 객체를 생성해야 하지만 매번 호출할 때마다 이 작업을 수행해서는 안 됩니다.
   * 대신 마지막으로 계산된 스냅샷을 저장하고 저장소의 데이터가 변경되지 않은 경우 지난번과 동일한 스냅샷을 반환해야 합니다.
   * 변경 가능한 데이터가 변경되었는지 확인하는 방법은 변경 가능한 저장소가 구현된 방식에 따라 다릅니다.
   */
  let stored: TViewportRect;

  return () => {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/scrollingElement
     */
    const scrollingElement =
      typeof document !== "undefined" && document.scrollingElement;
    if (!scrollingElement) {
      return null;
    }

    const scrollingElementRect = scrollingElement.getBoundingClientRect();
    const newViewportRect: TViewportRect = {
      ...scrollingElementRect,
      scrollHeight: scrollingElement.scrollHeight,
    };

    if (!isSameRect(stored, newViewportRect)) {
      stored = newViewportRect;
    }

    return stored;
  };
};

const ViewportRectContext = createContext<null | TViewportRect>(null);

type TProps = {
  children: React.ReactNode;
};

export function ViewportRectContextProvider({ children }: TProps) {
  /**
   * @see https://ko.react.dev/reference/react/useSyncExternalStore
   * - 외부 store 구독
   *   - 컴포넌트가 시간이 지남에 따라 변경되는 React 외부의 일부 저장소에서 일부 데이터를 읽어야 하는 경우
   *   - React 외부에 state를 보관하는 서드파티 상태 관리 라이브러리.
   * - 브라우저 API 구독
   *   - 시간이 지남에 따라 변경되는 브라우저에 노출되는 일부 값을 구독하려는 경우
   *   - 변경 가능한 값을 노출하는 브라우저 API와 그 변경 사항을 구독하는 이벤트.
   * - React는 이 함수를 사용해 컴포넌트를 store에 구독한 상태로 유지하고 변경 사항이 있을 때 리렌더링합니다.
   */
  const viewportRect = useSyncExternalStore(
    subscribe,
    getViewportRectSnapshot(),
  );

  return (
    <ViewportRectContext.Provider value={viewportRect}>
      {children}
    </ViewportRectContext.Provider>
  );
}

export const useViewportRect = () => {
  const viewportRect = useContext(ViewportRectContext);
  if (viewportRect === null) {
    throw new Error(getContextError("ViewportRect"));
  }

  return viewportRect;
};
