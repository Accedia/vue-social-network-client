import axios from 'axios';
import ApiService from './ApiService';
import config from '../config/config';

class PostsService {

  getPosts(pageNumber, perPage) {
    return axios
      .get(`${config.BASE_URL}/posts`, {
        params: this.__buildPostsRequestQueryParams(pageNumber, perPage),
        headers: ApiService.getAuthorizationHeaderForRequest(),
      })
      .then(response => response.data)
      .catch((error) => { throw error.response.data; });
  }

  __buildPostsRequestQueryParams(pageNumber, perPage) {
    return {
      _page: pageNumber,
      _limit: perPage,
      _sort: 'created_at',
      _order: 'desc',
    };
  }

}

export default new PostsService();
