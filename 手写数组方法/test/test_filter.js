Array.prototype.myFilter = function(fn){
  if(typeof fn !== 'function') return;
  let res = [];
  this.forEach(item => {
    if(fn(item)){
      res.push(item)
    }
  });
  return res;
}



console.log([1,2,3,4,66,80,19,12].myFilter(item => item < 5))