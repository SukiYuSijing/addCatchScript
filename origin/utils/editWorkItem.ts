/*
 * @Author: SukiYuSijing 15767301655@163.com
 * @Date: 2023-03-25 21:34:46
 * @LastEditors: SukiYuSijing 15767301655@163.com
 * @LastEditTime: 2023-03-26 18:09:06
 * @FilePath: \pre-bundle-learning-vite-catch\src\test\utils\editWorkItem.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { aa, cc } from "./common/apis";
import bb from "./common/apis";
import { copyClone } from "lodash";
export function aaa() {
  try {
    aa().then(err => err)?.catch(err1 => {
      message.error(err1.msg || "this.$message");
    });
    aa(() => {
      const a = 'b';
      const a1 = 'b';
      const a2 = 'b';
      const a3 = 'b';
      const a4 = 'b';
      return a;
    })?.catch(err => err);
    cc()?.catch(err => {
      message.error(err.msg || "this.$message");
    });
    cc(() => {
      const a = 'b';
      const a1 = 'b';
      const a2 = 'b';
      const a3 = 'b';
      const a4 = 'b';
      return a;
    })?.catch(err => err);
    bb()?.catch(err => {
      message.error(err.msg || "this.$message");
    });
    aa()?.catch(err => {
      message.error(err.msg || "this.$message");
    });
  } catch (error) {}
}