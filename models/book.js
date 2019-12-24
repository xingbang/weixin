import { HTTP } from '../utils/http-p.js'

class BookModel extends HTTP {

  // 获取热门书籍列表
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }

  // 获取书籍的详情
  getDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  // 获取书籍点赞信息
  getLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }

  getMyBookCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }

  // 短评
  getComments(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  // 提交短评
  postComment(bid, comment) {
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }

  // 书籍搜索
  search(start, q){
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q: q,
        start: start
      }
    })
  }
}

export { BookModel}