Array.prototype.myFilter = function(fn) {
  let result = [];
  this.forEach((item, index, arr) => {
    if(fn(item)){
      result.push(item)
    }
  });
  return result;
}


// test

const a = [2,3,5,25,73,1];
console.log(a.myFilter(x => x > 6))