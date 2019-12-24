// components/search/index.js
import {KeywordModel} from '../../models/keyword.js'
import {BookModel} from '../../models/book.js'
import {paginationBev} from '../behaviors/pagination.js'
const keywordModel = new KeywordModel()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords: [],
    hotWords: [],
    searching: false,
    value: '',
    loading: false,
    loadingCenter: false
  },

  attached(){
    this.setData({
      historyWords: keywordModel.getHistory()
    })

    keywordModel.getHot().then(res => {
      this.setData({
        hotWords: res.hot
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 加载更多
    loadMore(){
      if (!this.data.value){
        return
      }
      if(this.data.loading){
        return
      }
      if(this.hasMore()){
        this.setData({
          loading: true
        })
        bookModel.search(this.getCurrentStart(), this.data.value).then(res => {
          this.setMoreData(res.books)
          this.setData({
            loading: false
          })
        }, () => {
          this.setData({
            loading: true
          })
        })
      }
    },
    onCancel(e) {
      this.intialize()
      this.triggerEvent('cancel', {}, {})
    },
    onDelete(e){
      this.intialize()
      this.setData({
        searching: false,
        value: ''
      })
    },
    onConfirm(e){

      this.setData({
        searching:true
      })
      this._showLoadingCenter()
      //this.intialize()
      const q = e.detail.value || e.detail.text
      bookModel.search(0, q).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this.setData({
          value: q
        })
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      })
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  }
})
