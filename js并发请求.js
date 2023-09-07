function concurRequest(urls, maxNum){
  return new Promise(reslove => {
    if(!urls.length){
      reslove([]);
      return;
    }

    let results = [];
    let index = 0;
    async function request(){
      const i = index; // 记录返回的result下标
      const url = urls[index];
      index++;
      try {
        const resp = await fetch(url);
        results[i] = resp;
      } catch (error) {
        results[i] = error;
      }finally{
        if(results.length === urls.length){
          reslove(results)
        }
        request();
      }
    }

    const tiemes = Math.min(maxNum, urls.length); // 如果url的长度小于并发数，去最小值
    for(let i=0; i<tiemes.length; i++){
      request();
    }
  })
}