const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false
  },

  methods: {
    // 更多数据
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setData({
        dataArray: tempArray
      })
    },

    // 开始页码
    getCurrentStart() {
      return this.data.dataArray.length
    },

    setTotal(tatal) {
      this.data.total = tatal
      if (this.data.total == 0){
        this.setData({
          noneResult: true
        })
      }
    },

    // 有没有更多
    hasMore() {
      if(this.data.dataArray.length >= this.data.total){
        return false
      } else {
        return true
      }
    },

    intialize() {
      this.setData({
        dataArray: [],
        noneResult: false
      })
      this.data.total = null
    }
  }
})

export {paginationBev}