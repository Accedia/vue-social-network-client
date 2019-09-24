import axios from 'axios';
import config from '../config/config';
import LocalStorage from './LocalStorage';

class AuthService {

  authorize(username, password) {
    return axios
      .post(`${config.BASE_URL}/auth`, { username, password })
      .then(response => response.data)
      .catch((error) => { throw error.response.data; });
  }

  isAuthorized() {
    return !!this.getUserTokenFromLocalStorage() && !!this.getUserFromLocalStorage();
  }

  setUserTokenInLocalStorage(token) {
    LocalStorage.set('token', token);
  }

  getUserTokenFromLocalStorage() {
    return LocalStorage.get('token');
  }

  removeUserTokenFromLocalStorage() {
    return LocalStorage.remove('token');
  }

  setUserInLocalStorage(user) {
    LocalStorage.set('user', JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    const userJson = LocalStorage.get('user');

    return JSON.parse(userJson);
  }

  removeUserFromLocalStorage() {
    return LocalStorage.remove('user');
  }

  logout() {
    this.removeUserTokenFromLocalStorage();
    this.removeUserFromLocalStorage();
  }

}

export default new AuthService();
