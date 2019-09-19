const initialState = {
  posts: [],
  currentPageNumber: 1,
  postsPerPage: 5,
  morePostsToBeLoaded: true,
  error: null,
  userIdFilter: null,
  dateFilter: null,
};

const state = { ...initialState };

const mutations = {
  setPosts(state, posts) {
    state.posts = state.posts.concat(posts);
  },
  addPost(state, post) {
    state.posts = [
      post,
      ...state.posts,
    ];
  },
  setMorePostsToBeLoaded(state, payload) {
    state.morePostsToBeLoaded = payload;
  },
  setError(state, error) {
    state.error = error;
  },
  setCurrentPageNumber(state, newPageNumber) {
    state.currentPageNumber = newPageNumber;
  },
  setUserIdFilter(state, userId) {
    state.userIdFilter = userId;
  },
  setDateFilter(state, date) {
    state.dateFilter = date;
  },
  resetState(state, resetFilters = true) {
    Object.keys(state).forEach((key) => {
      if (!resetFilters && key.endsWith('Filter')) return;
      if (Array.isArray(state[key])) {
        state[key].length = 0;
      }
      state[key] = initialState[key];
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
