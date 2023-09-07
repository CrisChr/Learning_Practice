// 快速排序：O(nlogn)

/**
 * 递归解法
 */

exports.quickSort = function(arr){
  let left = 0,
      right = arr.length - 1;
  function quick(array, left, right){
    let index;
    if(array.length > 1){
      index = partition(array, left, right);
      if(left < index - 1){
        quick(array, left, index-1);
      }
      if(right > index){
        quick(array, index, right);
      }
    }
    return array;
  }

  return quick(arr, left, right);
}

function partition(array, left, right){
  const pivot = array[Math.floor((left + right) / 2)];
  let i = left;
  let j = right;
  while(i <= j){
    while(array[i] < pivot){
      i++
    }
    while(array[j] > pivot){
      j--
    }
    if(i <= j){
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
      i++;
      j--;
    }
  }
  return i;
}


let x = 1;
const f = () => {
  let x = 3;
  g();
}

const g = () => {
  console.log(x);
  x = 2
}

f();
console.log(x)