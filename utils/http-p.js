import { config } from '../config.js'
import { Token } from '../models/token.js'

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
  _request(url, resolve, reject, method='GET', data={}, noRefetch = false) {
    // url, data, method
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        authorization: this._getToken()
      },
      success: (res) => {
        // startsWith
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          if (code == '403') {
            if (!noRefetch) {
              this._refetch(
                url,
                resolve,
                reject,
                data,
                method
              )
            }
          } else {
            reject()
            const error_code = res.data.error_code
            this._show_error(error_code)
          }
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
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }

  _refetch(...param) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this._request(...param, true);
    });
  }

  // 获取缓存token
  _getToken() {
    const token = wx.getStorageSync('token')
    // console.log(result)
    return 'Bearer ' + token
  }
}