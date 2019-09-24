const state = {
  loading: 0,
};

const getters = {
  isLoading(state) {
    return state.loading > 0;
  },
};

const mutations = {
  showLoader(state) {
    state.loading += 1;
  },
  hideLoader(state) {
    state.loading -= 1;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
