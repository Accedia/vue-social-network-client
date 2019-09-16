import axios from 'axios';
import config from '../config/config';

class SignUpService {

  signUp(username, email, password) {
    return axios
      .post(`${config.BASE_URL}/sign-up`, {
        username,
        email,
        password,
      })
      .then(response => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  }

}

export default new SignUpService();
