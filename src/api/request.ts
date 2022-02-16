import axios, { AxiosRequestConfig } from 'axios'
import NProgress from 'nprogress'

const host = import.meta.env.VITE_API_HOST
const timeout = 30000
// build http header
function buildHeader(option: any) {
  let headers = {
    'Content-Type': 'application/json',
  }

  if (option) {
    headers = { ...headers, ...option }
  }
  return headers
}

const axiosConfig = (options: any = {}) => {
  return {
    baseURL: host,
    headers: buildHeader(options),
    timeout,
    responseType: 'json',
    transformRequest: [
      function (data: any) {
        if (data instanceof FormData) {
          return data
        }
        return JSON.stringify(data)
      },
    ],
    transformResponse: [
      function (data: any) {
        return data
      },
    ],
  }
}

function processData(apiData = {}) {
  return apiData
}

function handleError(err: any) {
  return err
}

// 成功
function success(
  resolve = (res: any) => {
    return res
  },
  reject = (str: any) => {
    return str
  }
) {
  return (req: any) => {
    // 判断接口状态值
    if (req.statusCode === 200) {
      if (typeof req.data === 'string') {
        const data = JSON.parse(req.data)
        req = { ...req, data }
      }
      if (req.data) {
        if (req.data.success) {
          const res = req.data
          resolve(res)
        } else {
          const msg = handleError(req.data)
          reject(msg)
        }
      } else {
        reject('数据格式错误！')
      }
    } else {
      reject('网络异常，请稍后再试')
    }
  }
}

// 错误
function fail(
  reject = (error?: any) => {
    return error
  }
) {
  return (error: any) => {
    reject(error)
  }
}

function complete(res?: any) {
  return res
}

/**
 * 网络请求
 * @param {object} options 请求参数
 * @return {promise}
 */
function request(options = {}, headerOpt = {}) {
  const opt: Http.options = {
    url: '', //	String	  是	开发者服务器接口地址
    data: null, //	Object|String|ArrayBuffer	否  请求参数
    header: buildHeader(headerOpt), //	Object	  否	设置请求的 header，header 中不能设置 Referer。
    method: 'GET', //	String	  否	GET（需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    dataType: 'json', //  String	  否	json	如果设为json，会尝试对返回的数据做一次 JSON.parse
    responseType: 'text', //	String	  否	text	设置响应的数据类型。合法值：text、arraybuffer
    success: function () {},
    fail: function () {},
    complete: function () {},
    ...options,
  }
  return new Promise((resolve, reject) => {
    opt.success = success(resolve, reject)
    opt.fail = fail(reject)
    opt.complete = complete()
  })
}

/**
 * get
 */
export function get(url: string, data: any) {
  NProgress.start()
  return request({
    url: `${host}${url}`,
    data: processData(data),
  })
    .then((res: any) => {
      NProgress.done()
      return res.data
    })
    .catch((err) => {
      NProgress.done()
      throw err
    })
}

/**
 * post
 */
export function post(url: string, data: any) {
  NProgress.start()
  return request({
    url: `${host}${url}`,
    data: processData(data),
    method: 'POST',
  })
    .then((res: any) => {
      NProgress.done()
      return res.data
    })
    .catch((err) => {
      NProgress.done()
      throw err
    })
}

/**
 * upload
 */
export function upload(url: string, file: any) {
  NProgress.start()
  return request({
    url: `${host}${url}`,
    data: file,
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then((res: any) => {
      NProgress.done()
      return res.data
    })
    .catch((err) => {
      NProgress.done()
      throw err
    })
}

export function download(url: string) {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}
