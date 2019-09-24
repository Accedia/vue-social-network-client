import AuthService from './AuthService';

class ApiService {

  getAuthorizationHeaderForRequest() {
    const token = AuthService.getUserTokenFromLocalStorage();

    return {
      Authorization: `Bearer ${token}`,
    };
  }

}

export default new ApiService();
