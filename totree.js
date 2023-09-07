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
  const output = new TreeNode('/', []);
  paths.map(p => {
    if(p.includes('/')){
      const child = loopPath({path: p.slice(p.indexOf('/')), children: []});
      p.children.push(child);
    }else{
      
    }
  });

  function loopPath(c){
    const p = c.path;
    if(!p.includes('/')){
      return c;
    }
    const child = loopPath(p.slice(p.indexOf('/')));
    c.children.push(child);
  }

}