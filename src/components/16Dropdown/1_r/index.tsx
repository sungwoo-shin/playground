import data from "../data";
import Dropdown from "./dropdown";

function Dropdown1() {
  return (
    <article>
      <h3>#1. Compound Component</h3>
      <Dropdown.Provider list={data}>
        <Dropdown.Container>
          <Dropdown.Trigger />
          <Dropdown.List />
        </Dropdown.Container>
      </Dropdown.Provider>
    </article>
  );
}

export default Dropdown1;
