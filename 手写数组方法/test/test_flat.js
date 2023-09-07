function MyFlat(array){
  let res = [];
  array.forEach(item => {
    if(Array.isArray(item)){
      res = res.concat(arguments.callee(item));
    }else{
      res =res.concat(item);
    }
  });

  return res;
}

function MyFlat_1(array){
  if(!Array.isArray(array)) return;
  return array.reduce((initial, current) => {
    return initial.concat(Array.isArray(current) ? current.flat() : current)
  }, []);
}

console.log(MyFlat_1([1,2,1,[2,312,666], 2, 5, [8], 0]))