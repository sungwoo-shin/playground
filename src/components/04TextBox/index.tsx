import TextBox2 from "./2_r";
import TextBox3 from "./3_r";
import TextBox4V from "./4_v";
import TextBox5 from "./5_r";
import { cx } from "./cx";
import { TextBox1R } from "./TextBox1R";

export function TextBox() {
  return (
    <div className={cx("TextBoxes")}>
      <h2>반응형 텍스트박스</h2>
      <TextBox1R />
      <TextBox2 />
      <TextBox3 />
      <TextBox4V />
      <TextBox5 />
    </div>
  );
}
