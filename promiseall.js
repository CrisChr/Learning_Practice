const p1 = function(value){
  return new Promise((resolve, reject) => {
    if(!value){
      reject("no");
      return false;
    }
    resolve("Yes");
  });
}

const p2 = function(v){
  return new Promise((resolve, reject) => {
    resolve(v);
  });
}

Promise.all([p1(false), p2("hahah")]).then(res => {
  console.log("success", res);
}).catch(err => {
  console.log("error", err);
})