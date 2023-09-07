// 选择排序：O(n^2)

function selectionSort(arr){
  const len = arr.length;
  let minIndex;
  for(let i=0; i<len-1; i++){
    minIndex = i;
    for(let j=i; j<len; j++){
      if(arr[minIndex] > arr[j]){ // 位置j的值比当前minIndex位置的值小
        minIndex = j;  // 改变最小值为最新的值（位置j的值）
      }
    }
    if(i != minIndex){ // 一次内循环之后，minIndex的值如果改变了，那么交换最大值与最小值的位置
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}

console.log(selectionSort([5,3,1,8,2,0]));