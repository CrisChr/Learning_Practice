// 斐波拉契
let memo = [0, 1];
function fibonacciMemoization(n){
  if(memo[n] != null) return memo[n];
  memo[n] = fibonacciMemoization(n-2) + fibonacciMemoization(n-1);
  return fibonacciMemoization(n-2) + fibonacciMemoization(n-1)
}

console.log(fibonacciMemoization(9))