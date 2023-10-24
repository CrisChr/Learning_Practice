// aa-bb-cc => aaBbCc

function camelStr(classNameStr){
  const strArr = classNameStr.split("-");
  const len = strArr.length;
  let resultStr = "";
  for(let i=1; i<len; i++){
    const s = strArr[i];
    const n = s.replace(s[0], s[0].toUpperCase());
    resultStr+=n;
  }
  return strArr[0] + resultStr
}

console.log(camelStr("aa-bb-cc-dd"))