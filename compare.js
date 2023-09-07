/**
 * 比较两个对象数组：当key值相同则返回true
 * @param {*} originArr
 * @param {*} targetArr
 */
function Compare(originArr, targetArr){
  let cacheObj = {}
  originArr.forEach(e => {
    cacheObj[e.id] = e
    console.log('cacheObj: ', cacheObj);

  })
  for(let t of targetArr){
    console.log('cacheObj[t.id]: ', cacheObj[t.id]);
    if(cacheObj[t.id] !== 'undefined' && cacheObj[t.id] instanceof Object && cacheObj[t.id].id === t.id){
      return true
    }
  }
  return false
}

let aa = [
  {id: 123, name: "aa"},
  {id: 231, name: "bb"},
  {id: 354, name: "cc"}
]

let bb = [
  {id: 843, name: "ss"},
  {id: 255, name: "kk"}
]

if(!Compare(aa, bb)){
  console.log("result: ", aa.concat(bb))
}
