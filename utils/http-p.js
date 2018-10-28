import { config } from '../config.js'

const tips = {
  1: '抱歉，出现一个错误',
  1005: 'appkey无效，请重新申请',
  1007: '请求api错误',
  3000: '期刊不存在'
}

export class HTTP {

  request({url, method = 'GET', data = {}}){
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, method, data)
    })
  }

  // request
  _request(url, resolve, reject, method='GET', data={}) {
    // url, data, method
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        // startsWith
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }

      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }

  // 自定义错误请求
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}