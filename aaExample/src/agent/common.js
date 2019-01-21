/**
 * author : andong cai
 * email : 1412453932@qq.com
 * 
 * 公共接口请求
 */

var Vue = require('vue');
import HttpRequest from '../utils/axios'

const publicSysApi = {
	// 获取阿里云OSS文件上传链接
  getOSSUploadUrl: (data) => {
    return HttpRequest({
      url:`/base/sys/admin/getOSSUploadUrl?suffix=${data.suffix}&contentType=${data.contentType}`,
      method: 'POST'
    })
	},
	uploadFile: (url, param, contentType, callBack, failBack = null) => {   // 上传图片到阿里云 / 腾讯云
		return Vue.default.http.put(url, param, { headers: { 'Content-Type': contentType }, emulateJSON: false }).then(res => {
			console.log(res, '------');
			callBack(res.data)
		}, res => {
			if (failBack) {
				failBack(res.data)
			}
		});
	}
}

export default publicSysApi