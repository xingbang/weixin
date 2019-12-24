//app.js
import {Token} from '/models/token.js'
App({
  onLaunch: function () {

    const token = new Token()
    token.verify()

    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)

  }
})