/*
 * @Author: SukiYuSijing 15767301655@163.com
 * @Date: 2023-03-24 01:56:53
 * @LastEditors: SukiYuSijing 15767301655@163.com
 * @LastEditTime: 2023-04-01 18:41:52
 * @FilePath: \pre-bundle-learning-vite-catch\src\script123.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// @ts-nocheck

const fs = require('fs')
const path = require('path')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const babelParse = require("@babel/parser");
import traverse from "@babel/traverse";
import generate from "@babel/generator";

const _ = require('lodash')

function _transform(fileNameOrDirNameArray, writeFile = true) {
    const absoluteDir = path.resolve(__dirname, ...fileNameOrDirNameArray)
    const absoluteOutDir = path.resolve(__dirname, 'output', ...fileNameOrDirNameArray.slice(0, -1))
    const absoluteOutFile = path.resolve(__dirname, 'output', ...fileNameOrDirNameArray)
    const stats = fs.statSync(absoluteDir)
    const isDir = stats.isDirectory(absoluteDir)
    const isFile = stats.isFile(absoluteDir)
    if (isDir) {
        fs.mkdir(absoluteOutFile, function (err) {
            if (err) {
                console.log(err, 123, absoluteOutDir);
            }
            fs.readdir(absoluteDir, (err, files) => {
                if (err) {
                    throw err
                }
                files.forEach(file => {
                    _transform([...fileNameOrDirNameArray, file])

                })
            })
        })
    } else {
        fs.readFile(absoluteDir, 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            let outputText = ''
            const extName = path.extname(absoluteDir)
            if ([".vue"].includes(extName)) {
                const dom = new JSDOM(data);
                const scriptElements = dom.window.document.querySelectorAll("script")
                scriptElements.forEach(scriptEle => {
                    let content = scriptEle.innerHTML
                    try {
                        const output = getTransformResult(content)
                        scriptEle.innerHTML = output.code
                    } catch (error) {
                        console.log(error, absoluteDir);
                    }
                });
                outputText = dom.window.document.head.innerHTML
            } else if ([".js", ".ts"].includes(extName)) {
                //直接读取
                try {
                    const output = getTransformResult(data)
                    outputText = output.code
                } catch (error) {
                    console.log(absoluteDir);

                }
            }
            if (writeFile) fs.writeFile(absoluteOutFile, outputText, (err, data) => {
                console.log(absoluteOutFile, "写入成功");
            })
        })

    }
}

fs.mkdir("./output", function (err) {
    // 使用路径
    _transform(['./origin'])

})

const defaultTemplate1 = `randomFunc1().then((err) => err)?.catch((err1) => {
    message.error(err1.msg || "this.$message");
});`
const defaultTemplate2 = `randomFunc2()?.catch(err=>{
    message.error(err.msg || "this.$message");
})`

const defaultTemplate3 = `await randomFunc1().catch((err1) => {
    message.error(err1.msg || "this.$message");
});`
function getTransformResult(content, importFilterFunc = (name) => {
    return (name || "").includes("common/apis")

}) {
    const astContent = babelParse.parse(content, { sourceType: "module" })
    const templateAst_thenCatch = babelParse.parse(defaultTemplate1, { sourceType: "module" })
    const templateAst_catchOnly = babelParse.parse(defaultTemplate2, { sourceType: "module" })
    const templateAst_awaitCatch = babelParse.parse(defaultTemplate3, { sourceType: "module" })
    const tempBody_thenCatch = templateAst_thenCatch.program.body[0]
    const tempBody_catchOnly = templateAst_catchOnly.program.body[0]
    const tempBody_awaitCatch = templateAst_awaitCatch.program.body[0]
    let names = []
    traverse(astContent, {
        enter(path) {
            if (path.type === 'ImportDeclaration') {
                let node = path.node
                const imports = node?.specifiers || []
                const source = node?.source?.value || ''
                let importedName = imports.map(node => {
                    if (importFilterFunc(source)) {
                        return node?.local?.name
                    }
                })
                names.push(...importedName)
            }
            const shouldEnter = names.filter(name => !!name).some((name) => {
                return path.isIdentifier({ name: name })
            })
            if (shouldEnter) {
                const memberExpressionPath = path.parentPath?.parentPath
                const callExpressionPath = memberExpressionPath.parentPath
                const expressStatePath = callExpressionPath.parentPath
                if (memberExpressionPath?.type === "AwaitExpression" || expressStatePath?.type === "AwaitExpression") {
                    let obj
                    if (memberExpressionPath.type === "AwaitExpression") obj = memberExpressionPath
                    else if (expressStatePath.type === "AwaitExpression") obj = expressStatePath
                    if (obj) {
                        tempBody_awaitCatch.expression.argument.callee.object = obj.node.argument
                        obj.replaceWith(_.cloneDeep(tempBody_awaitCatch))
                    }
                    return
                }
                if (
                    ["MemberExpression", "OptionalMemberExpression",].includes(memberExpressionPath.type)
                ) {
                    if (memberExpressionPath.node.property.name === 'then') {

                        if (callExpressionPath.node && tempBody_thenCatch?.expression) {
                            tempBody_thenCatch.expression.callee.object = callExpressionPath.node
                        }
                        if (expressStatePath.type === 'ExpressionStatement')
                            expressStatePath.replaceWith(_.cloneDeep(tempBody_thenCatch))
                    }
                } else if (path.parentPath.node.type === 'CallExpression') {
                    let callExpressionPath = path.parentPath
                    let expressStatePath = callExpressionPath.parentPath
                    if (callExpressionPath?.node?.expression?.callee?.property?.name !== 'catch') {
                        if (callExpressionPath.node && tempBody_catchOnly?.expression) {
                            tempBody_catchOnly.expression.callee.object = callExpressionPath.node
                        }
                        expressStatePath.replaceWith(_.cloneDeep(tempBody_catchOnly))
                    }
                }
            }
        },
    });

    const output = generate(
        astContent,
        { sourceMaps: true },
    );
    return output
}