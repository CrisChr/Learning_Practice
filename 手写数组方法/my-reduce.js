Array.prototype.myReduce = function(fn, initial=0) {
  let result = initial;
  this.forEach(item => {
    result = fn(result, item);
  })

  return result
}

// test
const a = [1,25,6];
console.log(a.myReduce((prev, curr) => prev + curr));