Array.prototype.myFind = function(fn) {
  let theValuesArr = []; // 定义一个空数组，将所有符合条件的值存入数组，最后返回数组第0项即可
  this.forEach((item, index, arr) => {
    if(fn(item)){ //这里foreach无法跳出循环（如果是通过throw Error的方式不太好）
      theValuesArr.push(item)
    }
  });
  return !!theValuesArr.length ? theValuesArr[0] : undefined
}

// test
const array1 = [5, 12, 8, 130, 44];
console.log(array1.myFind(x => x > 100));