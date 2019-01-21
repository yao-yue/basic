//公共方法
var Vue = require('vue');
// Vue.http.options.credentials = true;
function requestAjax(url, param, dataForm = null, callBack, failBack = null) {
  let sessionId = sessionStorage.getItem('sessionId');
  let sendUrl = url + '?sessionId=' + sessionId;
  let params;
  // if(typeof(param))
    if (typeof (param) == 'string'){
      params = JSON.parse(param)
      for (let item in params) {
        if (!params[item] && params[item] !== false) {
          delete params[item]
        }
      }
      params = JSON.stringify(params)
    }else{
      params = param
    }



  for (let item in dataForm) {
    sendUrl = sendUrl + "&" + item + '=' + dataForm[item];
  }
  Vue.default.http.post(sendUrl, params, { emulateJSON: true, credentials: true }).then(res => {
    callBack(res.data)
  }, res => {
    if (failBack) {
      failBack(res.data)
    }
  });
}

function uploadFile(url, param, contentType, callBack, failBack = null) {   // 上传图片到阿里云 / 腾讯云
  console.log(contentType);
  Vue.default.http.put(url, param, { headers: { 'Content-Type': contentType }, emulateJSON: false }).then(res => {
    console.log(res);
    callBack(res.data)
  }, res => {
    if (failBack) {
      failBack(res.data)
    }
  });
}

function setCookie(name, value) {
  var Days = 2;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  // document.cookie = name + "=" + escape(value) ;
  document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
}

//读取cookie：
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null;
}

//聊天表情转换
 function utf16toEntities(str) {
  let patter = /[\ud800-\udbff][\udc00-\udfff]/g;
  // 检测utf16字符正则
  if(str){
    str = str.replace(patter, char => {
      let H, L, code;
      if (char.length === 2) {
        H = char.charCodeAt(0); // 取出高位
        L = char.charCodeAt(1); // 取出低位
        code = (H - 0xd800) * 0x400 + 0x10000 + L; // 转换算法
        return "&#" + code + ";";
      } else {
        return char;
      }
    });
  }
  return str || '';
}

function entitiestoUtf16(str) {
  // 检测出形如&#12345;形式的字符串
  var strObj = utf16toEntities(str);
  var patt = /&#\d+;/g;
  var H, L, code;
  var arr = strObj.match(patt) || [];
  for (var i = 0; i < arr.length; i++) {
    code = arr[i];
    code = code.replace('&#', '').replace(';', '');
    // 高位
    H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
    // 低位
    L = (code - 0x10000) % 0x400 + 0xDC00;
    code = "&#" + code + ";";
    var s = String.fromCharCode(H, L);
    strObj.replace(code, s);
  }
  return strObj;
}
module.exports = {
  requestAjax: requestAjax,
  uploadFile: uploadFile,
  getCookie: getCookie,
  utf16toEntities: utf16toEntities,
  entitiestoUtf16: entitiestoUtf16,
}