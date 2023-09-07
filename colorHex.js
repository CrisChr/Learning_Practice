function ColorHex(hex){
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  const color = hex.toLowerCase();
  if(reg.test(color)){
    if(color.length === 4){
      let colorNew = '#';
      for(let i=1, len = color.length; i<len; i++){
        colorNew += color.slice(i, i+1).concat(color.slice(i, i+1));
      }
      color = colorNew;
    }
    let colorRgb = [];
    for(let i=1; i<7; i+=2){
      colorRgb.push(parseInt('0x'+color.slice(i, i+2)))
    }
    return `rgb(${colorRgb.join(',')})`
  }else{
    return hex;
  }
}

console.log(ColorHex("#000000"))