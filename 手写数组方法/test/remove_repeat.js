function removeRepeat(array){
  if(!Array.isArray(array)) return;
  let res = [],
      map = new Map();

  array.forEach(item => {
    if(!map.has(item)){
      res.push(item);
      map.set(item, item);
    }
  });
  return res;
}

function removeRepeatInArray(array){
  if(!Array.isArray(array)) return;
  let res = [],
      flatedArray = array.flat();
  flatedArray.forEach(item => {
    if(res.indexOf(item) === -1){
      res.push(item)
    }
  });
  return res
}

console.log(removeRepeatInArray([1,2,3,1,5,15,16,8,8,9,0,2]))