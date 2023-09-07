/**
 * 1. 执行宏任务，这里指的是整个script代码，遇到微任务Promise.then，将微任务推入微任务队列中
 * 2. 执行微任务队列里所有的微任务，此时输出Promise1，并将宏任务setTimeout2推入宏任务栈内
 * 3. 然后查看宏任务队列，发现还有setTimeout1，此时输出setTimeout1，并将微任务Promise2推入微任务队列
 * 4. 查看微任务队列，执行微任务队列里的所有微任务，输出Promise2
 * 5. 最后执行宏任务输出setTimeout2（因为宏任务栈是先进后出，所以setTimeout2要比setTimeout1后输出）
 */
Promise.resolve().then(()=>{
  console.log('Promise1')
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
})
setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')
  })
},0)