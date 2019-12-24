// pages/classic/index.js
import {ClassicModel} from '../../models/classic.js'
import {LikeModel} from '../../models/like.js'
let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: null
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    classicModel.getLatest().then((res) => {
      console.log(res)
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  onLike: function(event){
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  // right
  onPrev: function () {
    this._updateClassic('prev')
  },

  // left
  onNext: function () {
    this._updateClassic('next')
  },

  _updateClassic: function(nextOrPrevious) {
    let index = this.data.classic.index
    const classic = classicModel.getClassic(index, nextOrPrevious)
    classic.then((res) => {
      this._getLikeStatus(res.id, res.type)
      this.setData({
        classic: res,
        latest: classicModel.isLatest(res.index),
        first: classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus: function (artID, category){
    const status = likeModel.getClassicLikeStatus(artID, category)
    status.then((res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
