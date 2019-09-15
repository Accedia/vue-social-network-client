const state = {
  token: null,
  user: null,
};

const getters = {

};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, user) {
    state.user = user;
  },
};

const actions = {

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
