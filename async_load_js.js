/**
 * 全局异步加载js方法
 */

(function(window){
  function loadScript(url, callback) { //js加载完成后执行回调
    let script = document.createElement("script");
    script.type = "text/javascript";
    if (typeof (callback) != "undefined") {
      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState == "loaded" || script.readyState == "complete") {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        script.onload = function () {
          callback();
        };
      }
    }
    script.src = url;
    document.head.appendChild(script);
  }

  function initializeUtils(platForm) {
    if(platForm === 'ios'){
      loadScript("./js/lib/ios/utils.js", () => {
        Utils.init("com.ios.cdsample");
      })
    }
    if(platForm === 'android'){
      loadScript("./js/lib/android/utils.js", () => {
        Utils.init("com.android.cdsample");
      })
    }
  }

  var u = window.navigator.userAgent;
  var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //Android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    loadScript('./js/lib/android/cordova.js', () => {
      initializeUtils('ios');
    })
  }
  if (isiOS) {
    loadScript('./js/lib/ios/cordova.js', () => {
      initializeUtils('android');
    })
  }
})(window)