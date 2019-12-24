import {HTTP} from '../utils/http-p.js'

class ClassicModel extends HTTP {

  // 获取最新一期
  /*
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallback(res)
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }*/

  getLatest() {
    const latest = this.request({
      url: 'classic/latest'
    })
    latest.then(res => {
      this._setLatestIndex(res.index)
      const key = this._getKey(res.index)
      wx.setStorageSync(key, res)
    })
    return latest
  }

  // 获取上一期,下一期
  /*
  getClassic(index, nextOrPrevious, sCallback) {
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic){
      this.request({
        url: 'classic/' + index + '/' + nextOrPrevious,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    } else {
      sCallback(classic)
    }
  }*/

  getClassic(index, nextOrPrevious) {
    // 缓存中寻找 or API 写入到缓存中
    // key 确定key
    let key = nextOrPrevious == 'next' ?
      this._getKey(index + 1) : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      classic = this.request({
        url: `classic/${index}/${nextOrPrevious}`
      })
      classic.then(res => {
        wx.setStorageSync(this._getKey(res.index), res)
      })
    }
    return Promise.resolve(classic)
  }

  // 是否第一期
  isFirst(index) {
    return index == 1 ? true : false
  }

  // 是否最新一期
  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  getMyFavor(success) {
    return this.request({
      url: 'classic/favor'
    })
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    let key = 'classic-' +index
    return key
  }
}

export {ClassicModel}