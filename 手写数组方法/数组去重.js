// for循环 + indexOf
function array_filter_1(arr){
  let res = [];
  for(let i=0; i<arr.length; i++){
    let curr = arr[i];
    if(res.indexOf(curr) === -1){
      res.push(curr);
    }
  }
  return res;
}
console.log(array_filter_1([1,2,3,2,4,6,8,2]));

// fiter + index
function array_filter_2(arr){
  return arr.filter((item, index, array) => {
    return array.indexOf(item) === index;
  });
}

console.log(array_filter_2([1, 2, 1, 1, '1']));

// Map
function array_filter_3(arr){
  let res = [], map = new Map();
  for(let i=0; i<arr.length; i++){
    let curr = arr[i];
    if(!map.has(curr)){
      res.push(curr)
    }
    map.set(curr, 1);
  }
  return res;
}
console.log(array_filter_3([1, 2, 1, 1, 99,2,3,66]));