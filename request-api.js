/**
 * 请求通用方法
 */
import React from "react";
import ReactDOM from "react-dom";
import {message, Spin} from "antd";

//组合所有API
const API = Object.assign({}, API_1, API_2);

//发送网络请求
const $http = function(
  {
    url,
    method="post",
    data={},
    resType="json",
    headers={},
    withCredentials=true,
    dealWithUploadProcess=(d)=>{},
    noLoading = false
  }
){
  return Promise((resolve, reject) => {
    const close = loadingSpin(); 
    noLoading && close();

    const xhr = new XMLHttpRequest();

    //请求头
    const reqHeader = Object.assign({
      "Content-Type":method.toLocaleUpperCase()==="GET" ? "application/x-www-form-urlencoded" : "application/json"
    }, headers);
    
    //请求参数
    const reqData = ()=>{
      if(reqHeader["Content-Type"].includes("multipart/form-data")){
        xhr.upload.onprogress=dealWithUploadProcess;
        const formData = FormData();
        Object.entries(data).forEach(item => {
          formData.append(item[0], item[1]);
        });
        delete reqHeader["Content-Type"];
        return formData;
      }else if(["GET","DELETE"].includes(method.toLocaleUpperCase())){
        return parseQueryParams(data);
      }else{
        return JSON.stringify(data);
      }
    };

    //设置请求头
    const setReqHeader = function(reqHeader={}){
      Object.entries(reqHeader).forEach(item => {
        xhr.setRequestHeader(item[0], item[1]);
      });
      const tokenId = sessionStorage.getItem("tokenId");
      if(tokenId){
        xhr.setRequestHeader("tokenId", tokenId);
      }
      xhr.withCredentials = withCredentials;
    };

    const requestData = reqData();

    if(["GET","DELETE"].includes(method.toLocaleUpperCase())){
      xhr.open(method.toLocaleUpperCase(), url+requestData);
      setReqHeader(reqHeader);
      xhr.send();
    }else if(["POST","PUT"].includes(method.toLocaleUpperCase())){
      xhr.open(method.toLocaleUpperCase(), url);
      setReqHeader(reqHeader);
      xhr.send(requestData);
    }
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 2){
        xhr.responseType = resType;
      }
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          if(!(url.includes("/auth/login") || url.includes("/auth/logout") || url.includes("/auth/code"))){
            loginAvailable(xhr);
          }
          if(xhr.response === null){
            reject("接口没有响应体");
          }else if(xhr.response.code==="success" || resType==="blob"){
            resolve(xhr.response);
          }else{
            reject((xhr.response || {}).message || "接口异常！");
          }
        }
      }
    };
    xhr.addEventListener("loadend", function(){
      close(); // 关闭加载动画
    })
  })
}

//加载动画
const loadingSpin = function(){
  const spinWrapper = document.createElement("div");
  spinWrapper.setAttribute("id", "spin-wrapper");
  document.body.appendChild(spinWrapper);
  ReactDOM.render(<Spin size="large" tip="数据交互中..."/>, spinWrapper);
  return ()=>{
    spinWrapper.remove();
  }
}

//将对象转化为params字符串
const parseQueryParams = function(data={}){
  if(Object.entries(data).length === 0){
    return ""
  }else{
    return "?"+Object.entries(data).map(item=>{
      return item[0]+"="+encodeURIComponent(item[1]);
    }).join("&");
  }
}

//执行登录失效校验
const loginAvailable = function(xhr){
  const tokenIdStatus = xhr.getResponseHeader("tokenIdStatus");
  switch(tokenIdStatus){
    case null:
      message.error();
      break;
    case "noTokenId":
      message.error("获取tokenIdStatus失败，请检查响应头");
      break;
    case "validateFail":
      sessionStorage.clear();
      logoutCallback();
      break;
    default:
      break;
  }
}

//账号登出
const logoutCallback=function(){
  const loginUrl = sessionStorage.getItem("loginUrl");
  sessionStorage.clear();
  if(loginUrl){
    window.location.href=loginUrl;
  }else{
    window.location.reload();
  }
}

export {API, $http, logoutCallback, parseQueryParams};