async function async1(){
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2(){
  console.log('async2 end');
}

console.log('script start');
async1();

setTimeout(function(){
  console.log('setTimeout end')
}, 0);

new Promise((resolve) => {
  console.log('promise');
  resolve();
}).then(res => {
  console.log('promise end');
})

console.log('script end');

/**
 * script start
 * async1 start
 * async2 end
 * promise
 * script end
 * async1 end
 * promise end
 * setTimout end
 */