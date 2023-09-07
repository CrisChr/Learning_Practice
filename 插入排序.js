// 插入排序

function insertSort(arr){
  const len = arr.length;
  let temp;
  for(let i=1; i<len; i++){ // 第i次迭代数组
    let j = i;
    temp = arr[i]; // 临时变量，以便插入到正确的位置
    while(j>0 && arr[j-1] > temp){ // 数组中前一个值比后一个值大
      arr[j] = arr[j-1]; // 就把这个值移到当前位置上
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}

console.log(insertSort([3,5,1,4,2]))