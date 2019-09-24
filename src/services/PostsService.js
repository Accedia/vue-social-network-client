import axios from 'axios';
import ApiService from './ApiService';
import config from '../config/config';

const POSTS_RESOURCE_URL = `${config.BASE_URL}/posts`;

class PostsService {

  getPosts(pageNumber, perPage, userId, dateFilter) {
    return axios
      .get(POSTS_RESOURCE_URL, {
        params: this.__buildGetPostsRequestQueryParams(pageNumber, perPage, userId, dateFilter),
        headers: ApiService.getAuthorizationHeaderForRequest(),
      })
      .then(response => response.data)
      .catch((error) => { throw error.response.data; });
  }

  getPost(id) {
    return axios
      .get(`${POSTS_RESOURCE_URL}/${id}`, {
        headers: ApiService.getAuthorizationHeaderForRequest(),
      })
      .then(response => response.data)
      .catch((error) => { throw error.response.data; });
  }

  createPost(post) {
    return axios
      .post(POSTS_RESOURCE_URL, { post }, {
        headers: ApiService.getAuthorizationHeaderForRequest(),
      })
      .then(response => response.data)
      .catch((error) => { throw error.response.data; });
  }

  __buildGetPostsRequestQueryParams(pageNumber, perPage, userId, dateFilter) {
    const params = {
      _page: pageNumber,
      _limit: perPage,
      _sort: 'created_at',
      _order: 'desc',
    };

    if (userId) {
      params['author.id'] = userId;
    }

    if (dateFilter) {
      params.created_at_like = dateFilter;
    }

    return params;
  }

}

export default new PostsService();
