import axios from 'axios';
import ApiService from './ApiService';
import config from '../config/config';

class PostCommentsService {

  getComments(postId) {
    return axios
      .get(`${config.BASE_URL}/comments`, {
        params: this.__buildGetCommentsQueryParams(postId),
        headers: ApiService.getAuthorizationHeaderForRequest(),
      })
      .then(response => response.data)
      .catch((error) => { throw error.response.data; });
  }

  addComment(postId, comment) {
    return axios
      .post(`${config.BASE_URL}/comments`, {
        comment,
      }, {
        headers: ApiService.getAuthorizationHeaderForRequest(),
      })
      .then(response => response.data)
      .catch((error) => { throw error.response.data; });
  }

  __buildGetCommentsQueryParams(postId) {
    return {
      post_id: postId,
      _sort: 'commented_at',
      _order: 'asc',
    };
  }

}

export default new PostCommentsService();
