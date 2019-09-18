const state = {
  posts: [],
  currentPageNumber: 1,
  postsPerPage: 5,
  morePostsToBeLoaded: true,
  error: null,
  loading: false,
};

const getters = {

};

const mutations = {
  setPosts(state, posts) {
    state.posts = state.posts.concat(posts);
  },
  resetPosts(state) {
    state.posts = [];
  },
  setMorePostsToBeLoaded(state, payload) {
    state.morePostsToBeLoaded = payload;
  },
  setPostPerPage(state, postsPerPage) {
    state.postsPerPage = postsPerPage;
  },
  setError(state, error) {
    state.error = error;
  },
  setLoading(state, loading) {
    state.loading = loading;
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
