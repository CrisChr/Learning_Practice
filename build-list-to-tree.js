const data = [
  '1.jpeg',
  '2.jpeg',
  'pa/test02/1.jpeg',
  'test/2.jpeg',
  'test/1.jpeg',
  'test/test.jpeg',
  'test01/aaa.jpeg',
  'test01/2.jpeg',
  'test02/bb.jpeg'
];

function TreeNode(path, children){
  return {
    path,
    children
  }
}

function buildTree(paths) {
  let res = [];
  for(let i=0; i<paths.length; i++){
    const path = paths[i].split('/'); // 将路径转换成数组结构
    let _r = res;  // 拷贝数组，用于记录每次迭代的路径对象
    for(let j=0; j<path.length; j++){
      const name = path[j];
      let obj = null;
      for(let k=0; k < _r.length; k++){
        if(_r[k].path === name){  // 判断是否存在相同路径，如果存在则直接使用已有的路径对象
          obj = _r[k];
          break;
        }
      }
      if(!obj){ // 初识时
        obj = new TreeNode(name, []);
        if(name.indexOf(".") < 0) obj.children = []; // 不是文件，说明还有子路径，定义一个空数组
        _r.push(obj);  // 将当前路径对象放入数组，以便下次迭代时判断是否有相同的文件夹名
      }
      if(obj.children) _r = obj.children; // 同样的如果当前路径下有子文件夹，则记录该子文件夹以便下一次迭代比较
    }
  }
  return new TreeNode('/', res);
}

console.log(buildTree(data))