/**
 * 标签（label）
 *
 * JavaScript 语言允许语句的前面有标签（label），相当于定位符，用于跳转到程序的任意位置
 * 标签通常与 break 和 continue 语句配合使用，跳出特定的循环
 */

// foo: for (let i = 0; i < 3; i++) {
//   bar: for (let j = 0; j < 3; j++) {
//     if (i === j) continue foo
//     console.log(`i = ${i}, j = ${j}`)
//   }
// }
// i = 1, j = 0
// i = 2, j = 0
// i = 2, j = 1

// foo: for (let i = 0; i < 3; i++) {
//   bar: for (let j = 0; j < 3; j++) {
//     if (i === j) continue bar
//     console.log(`i = ${i}, j = ${j}`)
//   }
// }
// i = 0, j = 1
// i = 0, j = 2
// i = 1, j = 0
// i = 1, j = 2
// i = 2, j = 0
// i = 2, j = 1
