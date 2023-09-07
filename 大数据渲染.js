/**
 * 放入setTimeout函数里的目的是不影响主进程
 */

setTimeout(() => {
  // 插入十万条数据
  const total = 100000;
  // 一次插入的数据
  const once = 20;
  // 插入数据需要的次数
  const loopCount = Math.ceil(total / once);

  let countOfRender = 0; // render的次数

  const ul = document.querySelector('ul');

  // 添加数据的方法
  function add() {
    const fragment = document.createDocumentFragment(); // 创建fragment用来插入20条数据
    for(let i = 0; i < once; i++) {
      const li = document.createElement('li');
      li.innerText = Math.floor(Math.random() * total); // 随机插入的内容
      fragment.appendChild(li);
    }
    ul.appendChild(fragment); // 当20条数据全部渲染完成后再一次新插入根节点中
    countOfRender += 1;
    loop();
  }

  function loop() {
    if(countOfRender < loopCount) {
      window.requestAnimationFrame(add);
    }
  }

  loop();
}, 0);