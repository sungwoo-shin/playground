import TextBox4V from "./4_v";
import TextBox5 from "./5_r";
import { cx } from "./cx";
import { TextBox1R } from "./TextBox1R";
import { TextBox2R } from "./TextBox2R";
import { TextBox3R } from "./TextBox3R";

export function TextBox() {
  return (
    <div className={cx("TextBoxes")}>
      <h2>반응형 텍스트박스</h2>
      <TextBox1R />
      <TextBox2R />
      <TextBox3R />
      <TextBox4V />
      <TextBox5 />
    </div>
  );
}
