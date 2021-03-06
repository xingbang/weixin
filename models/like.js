import { HTTP } from '../utils/http-p.js'

class LikeModel extends HTTP {

  // 点赞操作
  like(behavior, artID, category){
    let url = behavior == 'like' ? 'like' : 'like/cancel'
    this.request({
        url: url,
        method: 'POST',
        data: {
            art_id: artID,
            type: category
        }
    })
  }

  getClassicLikeStatus(artID,category,sCallback){
    return this.request({
        url:'classic/' + category + '/' + artID + '/favor',
    })
  }

}

export {LikeModel}