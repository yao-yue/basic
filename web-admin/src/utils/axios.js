/**
 * axios 封装
 */
import  axios from 'axios'
import utils from './utils'
const Axios = axios.create({
  baseURL: 'https://counseling.icebartech.com/api', // 接口地址
  timeout: 10000,//设置超时时间
})

let loading
Axios.interceptors.request.use(function (config) {
  const sessionId  = utils.getCookie('sessionId')
  if(sessionId) {
    if(config.url.indexOf('?') > -1) {
      config.url = config.url + `&sessionId=${sessionId}`
    } else {
      config.url = config.url + `?sessionId=${sessionId}`
    }
  }
  
  // 访问网络时加载loading,防止用户多次操作
  loading = vm.$loading({
    lock: true, 
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  return config;
}, function (error) {
  return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {
  loading.close()
  let {data} = response
  console.log(data, '+++++++++++')
  if(data.status == 401) {
    vm.$message(data.msg)
    vm.$router.push('/login')
  } else if(data.status != 200) {
    vm.$message(data.msg)
  }
  return response;
}, function (error) {
  loading.close()
  if(error.response) {
    let {status, data} = error.response
    switch (status) {
      case 401:
        vm.$router.push('/login')
            break
      default:
        vm.$message(data.msg);
        return Promise.reject(error);
    }
  } else {
    vm.$message('网络不给力~~请检查您的网络！！！')
  }
});
export default Axios
