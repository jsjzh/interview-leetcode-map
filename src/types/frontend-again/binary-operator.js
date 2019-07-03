/**
 * 二进制位运算符
 *
 * 用于直接对二进制位进行计算，一共有 7 个运算符，位运算符直接处理没一个比特位（bit），是非常底层的运算，好处是速度极快，缺点是不够直观
 * 需要注意的是，位运算符只对整数起作用，如果一个运算子不是整数，会自动转为整数后再执行
 * 另外，虽然在 JavaScript 的内部，数值都是以 64 位浮点数的形式存储，但是做位运算的时候，是以 32 位带符号的整数进行运算的，并且返回值也是一个 32 位带符号的整数
 *
 * 二进制或运算符 |：若两个二进制位都为 0，则结果为 0，否则为 1
 * 二进制与运算符 &：若两个二进制位都为 1，则结果为 1，否则为 0
 * 二进制否运算符 ~：表示对二进制位取反
 * 异或运算符 ^：若两个二进制位不相同，则结果为 1，否则为 0
 * 左移运算符 <<
 * 右移运算符 >>
 * 头部补零的右移运算符 >>>
 *
 * 将任意数值转为 32 位整数，该函数可以将小数转为整数，对于一般的整数返回值不会有变化，大于等于 2 ** 32 的整数，大于 32 的数位都会被舍去
 * function toInt32 (x) { return x | 0 }
 * toInt32(1.001) // 1
 * toInt32(1.999) // 1
 * toInt32(-1) // -1
 * toInt32(2 ** 32 + 1) // 1
 * toInt32(2 ** 32 - 1) // -1
 */
