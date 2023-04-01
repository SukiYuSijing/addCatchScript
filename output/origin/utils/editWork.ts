/*
 * @Author: SukiYuSijing 15767301655@163.com
 * @Date: 2023-03-26 18:49:43
 * @LastEditors: SukiYuSijing 15767301655@163.com
 * @LastEditTime: 2023-03-26 19:03:52
 * @FilePath: \astTransform\origin\utils\editWork.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: SukiYuSijing 15767301655@163.com
 * @Date: 2023-03-26 18:49:43
 * @LastEditors: SukiYuSijing 15767301655@163.com
 * @LastEditTime: 2023-03-26 19:03:45
 * @FilePath: \astTransform\origin\utils\editWork.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { aa, bb, cc } from "./common/apis";
export default function aaa() {
  try {
    aa()?.catch(err => {
      message.error(err.msg || "this.$message");
    });
    aa(function (a, b, c) {
      let a1 = a + b + c;
      return a;
    })?.catch(err => {
      message.error(err.msg || "this.$message");
    });
    cc()?.catch(err => {
      message.error(err.msg || "this.$message");
    });
    cc(function (a, b, c) {
      let a1 = a + b + c;
      return a;
    })?.then()?.catch(err1 => {
      message.error(err1.msg || "this.$message");
    });
  } catch (error) {}
}