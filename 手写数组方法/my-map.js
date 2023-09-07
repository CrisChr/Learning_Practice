Array.prototype.myMap = function(fn){
  let result = [];
  this.forEach((item, index, arr) => {
    result[index] = fn(item, index, arr);
  });
  return result;
}

// test
const a = [1,2,3,4]
console.log(a.myMap((x) => x * 2), a); // 返回一个新数组，不改变原数组