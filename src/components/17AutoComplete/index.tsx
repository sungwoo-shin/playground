import { ViewportRectContextProvider } from "#/contexts/ViewportRectContextProvider";
import Autocomplete1 from "./1_r";
import Autocomplete2 from "./2_r";
import cx from "./cx";

function Autocompletes() {
  return (
    <div className={cx("AutoComplete")}>
      <ViewportRectContextProvider>
        <h2>자동완성</h2>
        <Autocomplete1 />
        <p>-</p>
        <p>-</p>
        <p>-</p>
        <p>-</p>
        <p>-</p>
        <p>-</p>
        <p>-</p>
        <p>-</p>
        <p>-</p>
        <Autocomplete2 />
        <p>-</p>
        <p>-</p>
        <p>-</p>
        <p>-</p>
        <p>-</p>
        <p>-</p>
        <p>-</p>

        <div id="popoverRoot" />
      </ViewportRectContextProvider>
    </div>
  );
}

export default Autocompletes;
