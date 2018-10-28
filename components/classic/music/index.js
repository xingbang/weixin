import { classicBeh } from '../classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    play: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  attached: function(e){
    this._recoverStatus()
    this._musicSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(e) {
      // 按钮切换
      if(!this.data.playing){
        this.setData({
          playing: true
        })
        mMgr.src = this.properties.src
      }else{
        this.setData({
          playing: false
        })
        mMgr.pause()
      }
    },

    _recoverStatus:function(){
      if(mMgr.paused){
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.src){
        this.setData({
          playing: true
        })
      }
    },

    _musicSwitch: function() {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
