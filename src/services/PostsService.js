import axios from 'axios';
import ApiService from './ApiService';
import config from '../config/config';

const POSTS_RESOURCE_URL = `${config.BASE_URL}/posts`;

class PostsService {

  getPosts(pageNumber, perPage, userId) {
    return axios
      .get(POSTS_RESOURCE_URL, {
        params: this.__buildGetPostsRequestQueryParams(pageNumber, perPage, userId),
        headers: ApiService.getAuthorizationHeaderForRequest(),
      })
      .then(response => response.data)
      .catch((error) => { throw error.response.data; });
  }

  __buildGetPostsRequestQueryParams(pageNumber, perPage, userId) {
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

  createPost(post) {
    return axios
      .post(POSTS_RESOURCE_URL, {post}, {
        headers: ApiService.getAuthorizationHeaderForRequest(),
      })
      .then(response => response.data)
      .catch((error) => { throw error.response.data; });
  }

}

export default new PostsService();
