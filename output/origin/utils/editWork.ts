import { aa, bb, cc } from "./common/apis";
export default function aaa() {
  try {
    aa()?.catch(err => {
      message.error(err.msg || "this.$message");
    });
    aa(function (a, b, c) {
      let a1 = a + b + c;
      return a;
    })?.catch(err => err);
    cc()?.catch(err => {
      message.error(err.msg || "this.$message");
    });
    cc(function (a, b, c) {
      let a1 = a + b + c;
      return a;
    })?.then()?.catch(err => err);
  } catch (error) {}
}