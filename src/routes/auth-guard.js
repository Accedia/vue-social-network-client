import AuthService from '../services/AuthService';

const authRouteName = 'auth';

export default (to, from, next) => {
  if (to.matched.some(record => record.meta.authenticated === true)) {
    // This route requires the user to be authenticated
    if (!AuthService.isAuthorized()) {
      next({ name: authRouteName });
    }
  }
  next();
};
