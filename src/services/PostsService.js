import axios from 'axios';
import ApiService from './ApiService';
import config from '../config/config';

class PostsService {

  getPosts(pageNumber, perPage, userId) {
    return axios
      .get(`${config.BASE_URL}/posts`, {
        params: this.__buildPostsRequestQueryParams(pageNumber, perPage, userId),
        headers: ApiService.getAuthorizationHeaderForRequest(),
      })
      .then(response => response.data)
      .catch((error) => { throw error.response.data; });
  }

  __buildPostsRequestQueryParams(pageNumber, perPage, userId) {
    const params = {
      _page: pageNumber,
      _limit: perPage,
      _sort: 'created_at',
      _order: 'desc',
    };

    if (userId) {
      params['author.id'] = userId;
    }

    return params;
  }

}

export default new PostsService();
