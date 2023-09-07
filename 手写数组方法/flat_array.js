// concat + 递归
function flat(arr){
  let  resArr = [];
  arr.forEach(item => {
    if(Array.isArray(item)){
      resArr = resArr.concat(arguments.callee(item)); // 递归调用
    }else{
      resArr.push(item);
    }
  });
  return resArr;
}

const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }];

console.log(flat(arr));


// 用reduce展开一层
function flat_reduce(arr){
  return arr.reduce((init, curr) => {
    return init.concat(Array.isArray(curr) ? flat_reduce(curr) : curr);
  }, []);
}

const arr2 = [1,2,[3,4,[5], , ]];
console.log(flat_reduce(arr2));

// 通过传入整数参数控制拉平次数
function flat_by_num(arr, num = Infinity){
  return num > 0
  ? arr.reduce((init, curr) => {
    return init.concat(Array.isArray(curr) ? flat_by_num(curr, --num) : curr)
  }, [])
  : arr.slice();
}

console.log(flat_by_num(arr2, 2));