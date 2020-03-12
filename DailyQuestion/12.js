var gcdOfStrings = function(str1, str2) {
    // 假设s1,s2有公因子abc， abcabc + abc == abc + abcabc(s1 ==s2,存在最大公因子)
    // 反之不存在即s1!=s2,返回‘
    if (str1 + str2 !== str2 + str1) return ''
    //两个字符串的最大公因子为两个字符串的长度取最大公约数
    let len = gcd(str1.length, str2.length)
    //substring截取
    return str1.substring(0, len)
};

//定理：两个整数的最大公约数等于其中较小的那个数和两数相除余数的最大公约数。最大公约数（Greatest Common Divisor）缩写为GCD。
// gcd算法：gcd(a,b) = gcd(b,a mod b) (不妨设a>b 且r=a mod b ,r不为0)
let gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))