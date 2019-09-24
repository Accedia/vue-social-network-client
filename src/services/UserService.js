import axios from 'axios';
import ApiService from './ApiService';
import config from '../config/config';

class UserService {

  getUserProfile(id) {
    return axios
      .get(`${config.BASE_URL}/users/${id}`, {
        headers: ApiService.getAuthorizationHeaderForRequest(),
      })
      .then(result => result.data)
      .catch((error) => { throw error.response.data; });
  }

}

export default new UserService();
