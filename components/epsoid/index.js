// components/epsoid/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function(newVal, oldVal, changedPath){
        let val = newVal < 10 ? '0'+newVal : newVal
        this.setData({
          // 不要再observer中修改本身，否则会引起递归调用
          _index: val
        })
      }
    }
  },

  /**
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   */
  attached: function() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()

    this.setData({
      year,
      month: this.data.months[month]
    })
  },

  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    year: 0,
    moth: '',
    _index: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
