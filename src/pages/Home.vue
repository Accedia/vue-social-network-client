<template>
  <div>
    Home authorized
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import PostsService from '../services/PostsService';


export default {
  computed: mapState({
    posts: state => state.posts.posts,
    currentPageNumber: state => state.posts.currentPageNumber,
    postsPerPage: state => state.posts.postsPerPage,
    morePostsToBeLoaded: state => state.posts.morePostsToBeLoaded,
    error: state => state.posts.error,
  }),
  methods: {
    ...mapMutations({
      setPosts: 'posts/setPosts',
      resetPosts: 'posts/resetPosts',
      setMorePostsToBeLoaded: 'posts/setMorePostsToBeLoaded',
      setPostPerPage: 'posts/setPostPerPage',
      setError: 'posts/setError',
    }),
    async loadPosts(pageNumber, perPage) {
      const postsChunk = await PostsService.getPosts(pageNumber, perPage);
      this.setPosts(postsChunk);
      // Check if there are more posts to be loaded
      if (postsChunk.length < perPage) {
        this.setMorePostsToBeLoaded(false);
      }
    },
  },
  async mounted() {
    try {
      await this.loadPosts(this.currentPageNumber, this.postsPerPage);
      console.log(this.posts);
    } catch (error) {
      console.error(error);
      this.setError(error);
    }
  },
};
</script>
