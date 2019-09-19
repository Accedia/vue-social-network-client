<template>
  <v-layout>
    <v-row>
      <v-col sm="12" md="8" offset-lg="1" lg="7">

        <create-post v-if="showCreatePostForm" class="mb-10"></create-post>

        <div v-if="!isLoading && posts.length > 0 && !error">
          <post-card v-for="post in posts" :key="post.id" :post="post" class="mb-10"></post-card>
        </div>

        <v-alert v-if="!isLoading && error !== null" type="error">
          {{ error }}
        </v-alert>

        <v-alert v-if="!isLoading && !error && posts.length === 0" type="info">
          No posts found
        </v-alert>

      </v-col>
      <v-col sm="12" md="4" lg="3">
        <v-card>
          <v-card-text>
            Filters
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import PostsService from '../services/PostsService';
import CreatePost from '../components/posts/CreatePost.vue';
import PostCard from '../components/posts/PostCard.vue';

export default {
  components: {
    CreatePost,
    PostCard,
  },
  data() {
    return {
      userId: null,
    };
  },
  computed: {
    ...mapState({
      posts: state => state.posts.posts,
      currentPageNumber: state => state.posts.currentPageNumber,
      postsPerPage: state => state.posts.postsPerPage,
      morePostsToBeLoaded: state => state.posts.morePostsToBeLoaded,
      error: state => state.posts.error,
    }),
    ...mapGetters({
      isLoading: 'loader/isLoading',
    }),
    showCreatePostForm() {
      return this.user !== null && this.userId === null;
    },
  },
  methods: {
    ...mapMutations({
      setPosts: 'posts/setPosts',
      resetPosts: 'posts/resetPosts',
      setMorePostsToBeLoaded: 'posts/setMorePostsToBeLoaded',
      setPostPerPage: 'posts/setPostPerPage',
      setError: 'posts/setError',
      showLoader: 'loader/showLoader',
      hideLoader: 'loader/hideLoader',
    }),

    async loadPosts(pageNumber, perPage) {
      this.showLoader();
      try {
        const postsChunk = await PostsService.getPosts(pageNumber, perPage, this.userId);
        this.setPosts(postsChunk);
        // Check if there are more posts to be loaded
        if (postsChunk.length < perPage) {
          this.setMorePostsToBeLoaded(false);
        }
      } catch (error) {
        console.error(error);
        this.setError(error);
      }
      this.hideLoader();
    },
  },
  async mounted() {
    this.resetPosts();
    this.setError(null);

    // Save the user_id if we have it as a filter
    const userId = this.$route.query.user_id;
    if (userId) {
      this.userId = userId;
    }

    this.loadPosts(this.currentPageNumber, this.postsPerPage);
  },
  beforeDestroy() {
    if (this.isLoading) {
      this.hideLoader();
    }
  },
};
</script>
