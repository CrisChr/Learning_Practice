/**
 * 冒泡排序：O(n^2)
 */

function bubbleSort(arr){
  const len = arr.length;
  for(let i=0; i<len; i++){ //第一个循环控制数组经过多少轮排序，即数组中的每一项都经过一轮
    for(let j=0; j<len-1; j++){ // 第二个循环实际上进行当前项和下一项都比较
      if(arr[j] > arr[j+1]){
        const temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}

console.log(bubbleSort([3,12,1,-2,121,5,8,-66,99]));

/**
 * 改进的冒泡排序算法：从内循环中减去外循环中已跑过的轮树，避免内循环中中再循环一遍外层
 */

function updateBubbleSort(arr){
  const len = arr.length;
  for(let i=0; i<len; i++){
    for(let j=0; j<len-1-i; j++){
      if(arr[j] > arr[j+1]){
        const temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}

console.log(updateBubbleSort([3,12,1,-2,121,5,8,-66,99]))