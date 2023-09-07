Array.prototype.myMap = function(fn){
  if(typeof fn !== 'function') return;
  let res = [];
  this.forEach((item, index) => {
    res[index] = fn(item)
  });
  return res;
}

console.log([12,32,11,5,10].myMap(item => item+1));