
var canMeasureWater = function(x, y, z) {
    if(x+y<z)return false
    if(x==0|y==0) return z==0||x+y==z
    return z%(gcd(x,y))==0
};
let gcd = (a, b) => (b === 0 ? a : gcd(b, a % b))
