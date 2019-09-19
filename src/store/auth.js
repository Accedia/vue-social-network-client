const state = {
  token: null,
  user: null,
};

const getters = {
  isUserAuthenticated(state) {
    return !!state.token && !!state.user;
  },
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
  logout({ commit }) {
    commit('setToken', null);
    commit('setToken', null);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
